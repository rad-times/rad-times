import AsyncStorage from '@react-native-async-storage/async-storage';
import {router, useSegments} from "expo-router";
import jwtDecode from 'jwt-decode';
import {createContext, ReactNode, useEffect, useState, Dispatch, SetStateAction} from 'react';
import {Href} from 'expo-router'

interface IAuthProvider {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  userId: number;
  setUserId: Dispatch<SetStateAction<number>>;
  userLoggedIn: boolean;
  setUserLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const ROOT_PATH = "/" as Href;
const LOGIN_PATH = "/login" as Href;

const AuthContext = createContext({} as IAuthProvider);

const AuthProvider = ({children}:{children: ReactNode}): ReactNode => {
  const [token, setToken] = useState<string>('');
  const [userId, setUserId] = useState<number>(-1);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const rootSegment = useSegments();

  useEffect(() => {
    (() => async ():Promise<void> => {
      const userIdPromise = AsyncStorage.getItem('@user');
      const tokenPromise = AsyncStorage.getItem('@token');
      const [
        userId,
        token
      ] = await Promise.all([userIdPromise, tokenPromise]);

      // const decodedToken = jwtDecode(token || '');
      // // @ts-ignore
      // const userId = decodedToken.userId;
      setUserId(Number(userId) || -1);
      setToken(token || '');

      if (userId && token) {
        setUserLoggedIn(true);
      }
    })()
  }, []);

  useEffect(() => {
    if (rootSegment[0] === 'login' && userLoggedIn) {
      router.replace(ROOT_PATH);
    }

    if (rootSegment[0] !== 'login' && !userLoggedIn) {
      router.replace(LOGIN_PATH);
    }
  }, [rootSegment]);

  useEffect(() => {
    if (userLoggedIn) {
      router.replace(ROOT_PATH);
    } else {
      router.replace(LOGIN_PATH);
    }
  }, [userLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userId,
        setUserId,
        userLoggedIn,
        setUserLoggedIn
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
