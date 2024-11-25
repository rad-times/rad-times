import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  SignInResponse,
  statusCodes
} from '@react-native-google-signin/google-signin';
import Constants from "expo-constants";

GoogleSignin.configure({
  webClientId: Constants.expoConfig?.extra?.OAUTH_KEYS.GOOGLE_OAUTH_WEB_CLIENTID,
  scopes: ['profile', 'email'],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  accountName: '',
  iosClientId: Constants.expoConfig?.extra?.OAUTH_KEYS.GOOGLE_OAUTH_IOS_CLIENTID
});

const API_URL = Constants.expoConfig?.extra?.API_URL_ROOT || '';

/**
 * Sign the user in via google oAuth
 */
const googleSignIn = async ():Promise<string> => {
  try {
    await GoogleSignin.hasPlayServices();
    const authResp: SignInResponse = await GoogleSignin.signIn();

    if (isSuccessResponse(authResp)) {
      const {idToken}:{idToken:string|null} = authResp.data;
      if (idToken !== null) {
        await fetch(`${API_URL}/login?authType=google`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${idToken}`
          }
        })
          .catch(err => {
            throw new Error(err);
          });

        return idToken;
      }
    }
    console.error('Google sign-in did not return a valid token.');
    return "";

  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          console.error('Google login error', error.message);
          throw new Error(error.message);
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.error('Google login error', error.message);
          throw new Error(error.message);
        default:
          console.error('Unknown Google login error', error.message);
          throw new Error(error.message);
      }
    }

    throw new Error("Unhandled error when using google sign in");
  }
}

/**
 * Log user out and revoke their access rights for the app
 */
const googleSignOut = async (): Promise<void> => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (err) {
    throw new Error("Error signing user out via Google auth");
  }
}

export {
  googleSignIn,
  googleSignOut
};
