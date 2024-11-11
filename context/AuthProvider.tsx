import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {createContext, ReactNode, useEffect, useState, Dispatch, SetStateAction} from 'react';

interface IAuthProvider {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  userId: number;
  setUserId: Dispatch<SetStateAction<number>>;
}

const AuthContext = createContext({} as IAuthProvider);

const AuthProvider = ({children}:{children: ReactNode}): ReactNode => {
  const [token, setToken] = useState<string>('');
  const [userId, setUserId] = useState<number>(-1);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      console.log("token from storage", token);

      if (token) {
        const decodedToken = jwtDecode(token || '');
        // @ts-ignore
        const userId = decodedToken.userId;
        setUserId(userId);
      } else {
        setUserId(-1);
      }
    };

    fetchUser();
  }, []);
  console.log('AuthProvider changing from token set');
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userId,
        setUserId,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
