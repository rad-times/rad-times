import {Colors} from "@/constants/Colors";
import Icon from "@/views/components/Icon";
import PageWrapper from "@/views/components/PageWrapper";
import Constants from "expo-constants";
import Ionicons from '@expo/vector-icons/Ionicons';
import {StyleSheet, Text, View, Pressable, ActivityIndicator, GestureResponderEvent} from 'react-native';
import React, {useState, useContext, ReactNode} from 'react';
import {GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes, User} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@/providers/AuthProvider';

const API_URL = Constants.expoConfig?.extra?.API_URL_ROOT || '';

GoogleSignin.configure({
  webClientId: '270430905807-km29dfj7ncfkrh59h7km322d9c4c8hpa.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  accountName: '',
  iosClientId: '270430905807-6mt3kqb3705v493r7usosihpc945c77a.apps.googleusercontent.com',
});

interface ISocialLoginBtn {
  onBtnPress: (e: GestureResponderEvent) => void;
  logoName: keyof typeof Ionicons.glyphMap;
  btnText: string;
}
/*
 * individual button
 */
const SocialLoginBtn = ({
  onBtnPress,
  logoName,
  btnText
}: ISocialLoginBtn):ReactNode => {
  return (
    <Pressable
      onPress={onBtnPress}
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
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Icon size={24} name={logoName} color={Colors.WHITE} />
        <Text style={{textAlign: 'center', fontSize: 15, paddingLeft: 10, color: Colors.WHITE, fontWeight: '500'}}>
          {btnText}
        </Text>
      </View>
    </Pressable>
  );
}

export default function LoginScreen (): ReactNode {
  const {setToken} = useContext(AuthContext);
  const {setUserId} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        return response.data;
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

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const authData: User|undefined = await signIn();
      if (!authData) return;

      const {idToken} = authData;

      if (idToken) {
        const response = await fetch(`${API_URL}/login`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${idToken}`
          }
        })
          .then(res => {
            return res.json()
          });

        const {
          activeUser,
          token
        } = response;

        await AsyncStorage.setItem('authToken', token);
        setToken(token);
        setUserId(activeUser.id);
      }
    } catch (error) {
      console.log('Login Error:', error);
    } finally {
      console.log('removing login page loader');
      setLoading(false);
    }
  };

  const handleFacebookLogin = async() => {
    console.log('TODO');
  }

  return (
    <PageWrapper>
      {loading &&
        <View style={{flex: 1}}>
          <ActivityIndicator />
        </View>
      }

      {!loading &&
        <View style={{}}>
          <SocialLoginBtn
            onBtnPress={handleGoogleLogin}
            logoName={'logo-google'}
            btnText={'Sign in with Google'}
          />
          <SocialLoginBtn
            onBtnPress={handleFacebookLogin}
            logoName={'logo-facebook'}
            btnText={'Sign in with Facebook'}
          />
        </View>
      }
    </PageWrapper>
  );
};

const styles = StyleSheet.create({});
