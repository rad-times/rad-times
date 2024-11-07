import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {createContext, ReactNode, useEffect, useState, Dispatch, SetStateAction} from 'react';

interface IAuthProvider {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext({} as IAuthProvider);

const AuthProvider = ({children}:{children: ReactNode}): ReactNode => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');

      if (token) {
        const decodedToken = jwtDecode(token || '');
        // @ts-ignore
        const userId = decodedToken.userId;
        setUserId(userId);
      } else {
        setUserId('');
      }
    };

    fetchUser();
  }, []);

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
