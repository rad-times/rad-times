import {TokenPairType} from "@/providers/AuthProvider";
import Constants from "expo-constants";
import {Platform} from "react-native";
import {AccessToken, AuthenticationToken, LoginManager, Settings,} from 'react-native-fbsdk-next';
import FBAuthenticationToken from "react-native-fbsdk-next/lib/typescript/src/FBAuthenticationToken";
import FBAccessToken from "react-native-fbsdk-next/src/FBAccessToken";

const API_URL = Constants.expoConfig?.extra?.API_URL_ROOT || '';
const SECRET_KEY = Constants.expoConfig?.extra?.OAUTH_KEYS?.FACEBOOK_NONCE_KEY || '';

/**
 * Log user in
 */
const facebookSignIn = async ():Promise<TokenPairType> => {
  try {
    Settings.initializeSDK();

    const result = await LoginManager.logInWithPermissions(
      ["public_profile", "email"],
      "limited",
      SECRET_KEY
    );

    if (!result.isCancelled) {
      if (Platform.OS === "ios") {
        const authenticationResp:FBAuthenticationToken | null = await AuthenticationToken.getAuthenticationTokenIOS();
        if (authenticationResp !== null) {
          const {authenticationToken}:{authenticationToken: string} = authenticationResp;

          return await fetch(`${API_URL}/login?authType=facebook`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${authenticationToken}`
            }
          })
            .then(resp => resp.json())
            .catch(err => {
              throw new Error(err);
            });
        }

      } else {
        // This token can be used to access the Graph API? Android will need to be tested separately
        const idToken:FBAccessToken | null = await AccessToken.getCurrentAccessToken();
        // @todo
      }
    }

    return {} as TokenPairType;

  } catch (err) {
    console.error("Error authorizing with Facebook");
    return {} as TokenPairType;
  }
}

/**
 * Log user out
 */
const facebookSignOut = async ():Promise<void> => {
  LoginManager.logOut();
}

export {
  facebookSignOut,
  facebookSignIn
};
