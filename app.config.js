import 'dotenv/config';

module.exports = ({ config }) => {

  /**
   * Google maps API key
   */
  config.ios.config.googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
  config.android.config.googleMaps.apiKey = process.env.GOOGLE_MAPS_API_KEY;

  /**
   * EAS project ID
   */
  config.extra.eas.projectId = process.env.EAS_PROJECT_ID;

  /**
   * Plug required oAuth data into the browser specific config files
   */
  const googleAuthPluginIndex = config.plugins.findIndex(plugIn => typeof plugIn !== 'string' && plugIn[0] === '@react-native-google-signin/google-signin');
  config.plugins[googleAuthPluginIndex][1] = {
    "iosUrlScheme": process.env.GOOGLE_AUTH_IOS_REVERSED_ID
  }

  const facebookAuthPluginIndex = config.plugins.findIndex(plugIn => typeof plugIn !== 'string' && plugIn[0] === 'react-native-fbsdk-next');
  config.plugins[facebookAuthPluginIndex][1] = {
    "appID": process.env.FACEBOOK_AUTH_APP_ID,
    "clientToken": process.env.FACEBOOK_AUTH_CLIENT_TOKEN,
    "displayName": "Rad Times",
    "scheme": process.env.FACEBOOK_AUTH_SCHEME,
    "advertiserIDCollectionEnabled": false,
    "autoLogAppEventsEnabled": false,
    "isAutoInitEnabled": false,
    "iosUserTrackingPermission": false
  }

  /**
   * oAuth keys for application use
   */
  config.extra.oauthKeys.GOOGLE_OAUTH_IOS_CLIENTID=process.env.GOOGLE_OAUTH_CLIENT_ID_IOS;
  config.extra.oauthKeys.GOOGLE_OAUTH_WEB_CLIENTID=process.env.GOOGLE_OAUTH_CLIENT_ID_WEB;
  config.extra.oauthKeys.GOOGLE_OAUTH_ANDROID_CLIENTID=process.env.GOOGLE_OAUTH_CLIENT_ID_ANDROID;
  config.extra.oauthKeys.FACEBOOK_APP_ID=process.env.FACEBOOK_AUTH_APP_ID;
  config.extra.oauthKeys.FACEBOOK_CLIENT=process.env.FACEBOOK_AUTH_CLIENT_TOKEN;
  config.extra.oauthKeys.FACEBOOK_SCHEME=process.env.FACEBOOK_AUTH_SCHEME;

  /**
   * API Root
   */
  if (process.env.ENVIRONMENT === 'dev') {
    config.extra.API_URL_ROOT = "http://localhost:8080";
    config.extra.WS_ROOT = "ws://localhost:8080";
  } else {
    config.extra.API_URL_ROOT = "https://theradtimes.com";
    config.extra.WS_ROOT = "wss://theradtimes.com";
  }

  return config;
};
