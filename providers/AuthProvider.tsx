import {getActivePersonByEmail, getUserLanguages} from "@/api/personApi";
import {validateToken, refreshAccessToken} from '@/api/auth/acessTokens';
import {setActiveUser} from "@/state/activeUserSlice";
import {setCrewList} from "@/state/crewSearchSlice";
import {setDisplayText} from "@/state/displayLanguageSlice";
import useStorage from "@/hooks/useStorage";
import {DecodedTokenType, TokenPairType} from '@/types/AuthToken';
import {Href, router} from "expo-router";
import {jwtDecode} from "jwt-decode";
import {createContext, MutableRefObject, ReactNode, useCallback, useContext, useEffect, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import _ from 'lodash';

const AuthContext = createContext<{
  signIn: (arg0: TokenPairType) => void;
  signOut: () => void;
  token: MutableRefObject<string> | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  token: null,
  isLoading: true
});

const ROOT_PATH = "/" as Href;
const LOGIN_PATH = "/login" as Href;

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
      try {
        const {
          accessToken,
          refreshToken
        }: TokenPairType = await getStorageItemItem('@token');

        if (accessToken) {
          const isValidToken = await validateToken(accessToken);
          if (isValidToken) {
            tokenRef.current = accessToken;
            await fetchActiveUser(accessToken);

          } else if (refreshToken) {
            const updatedAccessTokens:TokenPairType = await refreshAccessToken(refreshToken);
            if (!_.isEmpty(updatedAccessTokens)) {
              await setStorageItemItem('@token', {
                accessToken: updatedAccessTokens.accessToken,
                refreshToken: updatedAccessTokens.refreshToken
              });
              tokenRef.current = updatedAccessTokens.accessToken;
              await fetchActiveUser(updatedAccessTokens.accessToken);

            } else {
              signOut();
            }

          } else {
            signOut();
          }

        } else {
          router.replace(LOGIN_PATH);
        }
        setIsLoading(false);

      } catch (err) {
        signOut();
        setIsLoading(false);
      }

    })()
  }, []);

  /**
   * User signs in
   */
  const signIn = useCallback(async (tokens: TokenPairType):Promise<void> => {
    await setStorageItemItem('@token', tokens);
    tokenRef.current = tokens.accessToken;
    await fetchActiveUser(tokens.accessToken);
    router.replace(ROOT_PATH)
  }, []);

  /**
   * User signs out
   */
  const signOut = useCallback(async ():Promise<void> => {
    try {
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

export {
  TokenPairType
};

// This hook can be used to access the user info.
export function useAuthSession() {
  return useContext(AuthContext);
}
