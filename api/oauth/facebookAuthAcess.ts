import Constants from "expo-constants";
import {
  LoginButton,
  LoginManager,
  Settings,
  ShareDialog,
  ShareLinkContent,
} from 'react-native-fbsdk-next';

const API_URL = Constants.expoConfig?.extra?.API_URL_ROOT || '';

const facebookSignIn = async ():Promise<string> => {
  try {
    const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
    if (result.isCancelled) {
      console.log("Login cancelled");
    } else {
      console.log("Login success with permissions: " + result?.grantedPermissions?.toString());
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
