import {facebookSignOut} from "@/api/oauth/facebookAuthAcess";
import {getActivePersonByEmail, getUserLanguages} from "@/api/personApi";
import {setActiveUser} from "@/state/activeUserSlice";
import {setCrewList} from "@/state/crewSearchSlice";
import {setDisplayText} from "@/state/displayLanguageSlice";
import {
  googleSignOut
} from '@/api/oauth/googleAuthAccess';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Href, router} from "expo-router";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {createContext, MutableRefObject, ReactNode, useCallback, useContext, useEffect, useRef, useState} from 'react';
import {useDispatch} from "react-redux";

const AuthContext = createContext<{
  signIn: (arg0: string) => void;
  signOut: () => void
  token: MutableRefObject<string | null> | null;
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
  const tokenRef = useRef<string|null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchActiveUser = useCallback(async (token:string):Promise<void> => {
    const decoded: { email: string } = jwtDecode(token);
    if (decoded.email) {
      const personResp = await getActivePersonByEmail(decoded.email, token);
      dispatch(setActiveUser(personResp));
      dispatch(setCrewList(personResp?.crew || []))

      const displayText = await getUserLanguages(personResp.language_code);
      dispatch(setDisplayText(displayText));
    }
  }, [tokenRef]);

  useEffect(() => {
    (async ():Promise<void> => {
      await AsyncStorage.removeItem('@token');

      const token = await AsyncStorage.getItem('@token');
      if (token) {
        tokenRef.current = token;
        await fetchActiveUser(token);
      }
      setIsLoading(false);
    })()
  }, []);

  const signIn = useCallback(async (token: string):Promise<void> => {
    await AsyncStorage.setItem('@token', String(token));
    tokenRef.current = token;
    await fetchActiveUser(token);
    router.replace(ROOT_PATH)
  }, []);

  const signOut = useCallback(async ():Promise<void> => {
    try {
      // Only one, clearly
      await googleSignOut();
      await facebookSignOut();
      await AsyncStorage.removeItem('@token');
      tokenRef.current = null;

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
