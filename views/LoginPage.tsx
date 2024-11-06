import Constants from "expo-constants";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
} from 'react-native';
import React, {useState, useContext, ReactNode} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@/context/AuthProvider';

const API_URL = Constants.expoConfig?.extra?.API_URL_ROOT || '';

GoogleSignin.configure({
  webClientId:
    'yourID',
  iosClientId:
    'yourID',
  scopes: ['profile', 'email'],
});

export default function LoginScreen (): ReactNode {
  const {token, setToken} = useContext(AuthContext);

  const GoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('u', userInfo);
    return userInfo;
  };

  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const response = await GoogleLogin();
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
      <View style={{marginTop: 30, alignItems: 'center'}}>
        <Image
          style={{width: 240, height: 80, resizeMode: 'contain'}}
          source={{uri: 'https://wanderlog.com/assets/logoWithText.png'}}
        />
      </View>

      <View style={{marginTop: 70}}>
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
          <Text style={{textAlign: 'center', fontSize: 15, fontWeight: '500'}}>
            Sign Up With Google
          </Text>
        </Pressable>

        <Pressable style={{marginTop: 12}}>
          <Text style={{textAlign: 'center', fontSize: 15, color: 'gray'}}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
