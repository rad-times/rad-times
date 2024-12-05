import {getActivePersonByEmail, getUserLanguages} from "@/api/personApi";
import {setActiveUser} from "@/state/activeUserSlice";
import {setCrewList} from "@/state/crewSearchSlice";
import {setDisplayText} from "@/state/displayLanguageSlice";
import {
  googleSignOut
} from '@/api/oauth/googleAuthAccess';
import {facebookSignOut} from "@/api/oauth/facebookAuthAcess";
import useStorage from "@/hooks/useStorage";
import Constants from "expo-constants";
import {Href, router} from "expo-router";
import {jwtDecode} from "jwt-decode";
import {createContext, MutableRefObject, ReactNode, useCallback, useContext, useEffect, useRef, useState} from 'react';
import {useDispatch} from "react-redux";

type DecodedTokenType = {
  sub: string,
  languageCode: string,
  exp: number
};

const AuthContext = createContext<{
  signIn: (arg0: string) => void;
  signOut: () => void
  token: MutableRefObject<string> | null;
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  token: null,
  isLoading: true
});

const ROOT_PATH = "/" as Href;
const LOGIN_PATH = "/login" as Href;

// This hook can be used to access the user info.
export function useAuthSession() {
  return useContext(AuthContext);
}

export default function AuthProvider ({children}:{children: ReactNode}): ReactNode {
  const {
    setStorageItemItem,
    getStorageItemItem,
    removeStorageItem
  } = useStorage();
  const tokenRef = useRef<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  /**
   * Ensure the stored token is valid before using it in the app
   */
  const validateToken = async (tokenFromStorage: string): Promise<boolean> => {
    try {
      const API_URL = Constants.expoConfig?.extra?.API_URL_ROOT || '';
      const validateResponse = await fetch(`${API_URL}/validateToken`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          'Authorization': `Bearer ${tokenFromStorage}`
        },
        method: 'GET'
      });

      return validateResponse.status === 200;

    } catch (err) {
      return false;
    }
  }

  /**
   * Fetch the active user data when app loads
   */
  const fetchActiveUser = useCallback(async (token:string):Promise<void> => {
    const decoded: DecodedTokenType = jwtDecode(token);
    const personResp = await getActivePersonByEmail(decoded.sub, token);
    dispatch(setActiveUser(personResp));
    dispatch(setCrewList(personResp?.crew || []))

    const displayText = await getUserLanguages(decoded.languageCode);
    dispatch(setDisplayText(displayText));
  }, [tokenRef]);

  /**
   * Initial load
   */
  useEffect(() => {
    (async ():Promise<void> => {
      const {
        token
      }: {token: string} = await getStorageItemItem('@token');
      if (token) {
        const isValidToken = await validateToken(token);
        if (isValidToken) {
          tokenRef.current = token;
          await fetchActiveUser(token);

        } else {
          signOut();
        }

      } else {
        router.replace(LOGIN_PATH);
      }
      setIsLoading(false);
    })()
  }, []);

  /**
   * User signs in
   */
  const signIn = useCallback(async (token: string):Promise<void> => {
    await setStorageItemItem('@token', {
      token
    });
    tokenRef.current = token;
    await fetchActiveUser(token);
    router.replace(ROOT_PATH)
  }, []);

  /**
   * User signs out
   */
  const signOut = useCallback(async ():Promise<void> => {
    try {
      // await googleSignOut();
      // await facebookSignOut();
      await removeStorageItem('@token');
      tokenRef.current = "";

      // Reset user data in store
      dispatch(setActiveUser({}));
      dispatch(setCrewList([]))
      dispatch(setDisplayText({}));
      router.replace(LOGIN_PATH);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        token: tokenRef,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
