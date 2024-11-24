import Constants from "expo-constants";
import {Platform} from "react-native";
import {
  AccessToken,
  AuthenticationToken,
  LoginButton,
  LoginManager,
  Settings,
} from 'react-native-fbsdk-next';
import FBAuthenticationToken from "react-native-fbsdk-next/lib/typescript/src/FBAuthenticationToken";
import FBAccessToken from "react-native-fbsdk-next/src/FBAccessToken";

const API_URL = Constants.expoConfig?.extra?.API_URL_ROOT || '';

const facebookSignIn = async ():Promise<FBAuthenticationToken|string> => {
  try {
    const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
    console.log('result', result);
    if (!result.isCancelled) {
      if (Platform.OS === "ios") {
        const idToken:FBAuthenticationToken | null = await AuthenticationToken.getAuthenticationTokenIOS();
        if (idToken !== null) {
          await fetch(`${API_URL}/login?authType=facebook`, {
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

      } else {
        // This token can be used to access the Graph API? Android will need to be tested separately
        const idToken:FBAccessToken | null = await AccessToken.getCurrentAccessToken();
        // @todo
      }
    }
    return "";

  } catch (err) {
    console.error("Error authorizing with Facebook");
    return "";
  }
}

// const currentProfile = Profile.getCurrentProfile().then(
//   function(currentProfile) {
//     if (currentProfile) {
//       console.log(
//         "The current logged user is: " +
//         currentProfile.name +
//         ". Their profile id is: " +
//         currentProfile.userID
//       );
//     }
//   }
// );

const facebookSignOut = async ():Promise<void> => {

}

export {
  facebookSignOut,
  facebookSignIn
};
