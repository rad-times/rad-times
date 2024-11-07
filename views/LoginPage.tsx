import {Colors} from "@/constants/Colors";
import Constants from "expo-constants";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable
} from 'react-native';
import React, {useState, useContext, ReactNode} from 'react';
import {GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@/context/AuthProvider';

const API_URL = Constants.expoConfig?.extra?.API_URL_ROOT || '';

GoogleSignin.configure({
  webClientId: '270430905807-km29dfj7ncfkrh59h7km322d9c4c8hpa.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  accountName: '',
  iosClientId: '270430905807-6mt3kqb3705v493r7usosihpc945c77a.apps.googleusercontent.com',
});

export default function LoginScreen (): ReactNode {
  const {token, setToken} = useContext(AuthContext);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        return response;
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log('error 1', error);
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('error 2', error);
            break;
          default:
            console.log('error 3', error);
        }
      } else {
        console.log('error 4', error);
      }
    }
  };

  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const response = await signIn();
      if (!response) return;
      // @ts-ignore
      const {idToken} = response; // Check if idToken is directly available

      console.log('idToken:', idToken); // Log idToken to check if it's retrieved

      // If idToken is not directly available, get it from response.data.idToken
      const extractedIdToken = idToken || response?.data?.idToken;
      console.log('Extracted idToken from data:', extractedIdToken); // Log the extracted idToken

      if (extractedIdToken) {
        const backendResponse = await fetch(`${API_URL}/google-login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({idToken: extractedIdToken})
        });

        // @ts-ignore
        const data = backendResponse.data;
        // @ts-ignore
        console.log('Backend Response:', backendResponse.data);

        await AsyncStorage.setItem('authToken', data.token);

        setToken(data.token);

        // Update auth state (if using context or state)
        // setIsAuthenticated(true); // Navigate to the main screen
        // Handle JWT token and user data here
      }
    } catch (error) {
      console.log('Login Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={{}}>
        <Pressable
          onPress={handleGoogleLogin}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            justifyContent: 'center',
            borderColor: '#E0E0E0',
            margin: 12,
            borderWidth: 1,
            gap: 30,
            borderRadius: 25,
            position: 'relative',
            marginTop: 20,
          }}>
          <Text style={{textAlign: 'center', fontSize: 15, color: Colors.WHITE, fontWeight: '500'}}>
            Sign Up With Google
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
