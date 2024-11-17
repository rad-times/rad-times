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

const useGoogleSignIn = async ():Promise<[string|null, string]> => {
  const [error, setError] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);

  try {
    await GoogleSignin.hasPlayServices();
    const authResp: SignInResponse = await GoogleSignin.signIn();

    if (isSuccessResponse(authResp)) {
      const {idToken}:{idToken:string|null} = authResp.data;
      const sessionToken: string = await fetch(`${API_URL}/login`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${idToken}`
        }
      })
        .then(res => {
          return res.json()
        });

      setToken(sessionToken);
    }

  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          setError(error.message);
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          setError(error.message);
          break;
        default:
          setError(error.message);
      }
    } else {
      setError(String(error));
    }
  }
    return [token, error];
}

export default useGoogleSignIn;
