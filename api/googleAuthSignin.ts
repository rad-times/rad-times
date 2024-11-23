import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  SignInResponse,
  statusCodes
} from '@react-native-google-signin/google-signin';
import Constants from "expo-constants";
import {useState} from "react";

GoogleSignin.configure({
  webClientId: Constants.expoConfig?.extra?.OAUTH_KEYS.GOOGLE_OAUTH_WEB_CLIENTID,
  scopes: ['profile', 'email'],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  accountName: '',
  iosClientId: Constants.expoConfig?.extra?.OAUTH_KEYS.GOOGLE_OAUTH_IOS_CLIENTID
});

const API_URL = Constants.expoConfig?.extra?.API_URL_ROOT || '';

const googleSignIn = async ():Promise<string> => {
  try {
    await GoogleSignin.hasPlayServices();
    const authResp: SignInResponse = await GoogleSignin.signIn();

    if (isSuccessResponse(authResp)) {
      const {idToken}:{idToken:string|null} = authResp.data;
      return await fetch(`${API_URL}/login`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${idToken}`
        }
      })
        .then(res => {
          return res.json()
        });
    }

  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          console.error('Google login error', error.message);
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.error('Google login error', error.message);
          break;
        default:
          console.error('Unknown Google login error', error.message);
      }
    }

    return String(error);
  }
  return "";
}

export default googleSignIn;
