import 'dotenv/config';

module.exports = ({ config }) => {

  config.ios.config.googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
  config.android.config.googleMaps.apiKey = process.env.GOOGLE_MAPS_API_KEY;
  config.extra.eas.projectId = process.env.EAS_PROJECT_ID;

  if (process.env.ENVIRONMENT === 'dev') {
    config.extra.API_URL_ROOT = "http://localhost:8080";
    config.extra.WS_ROOT = "ws://localhost:8080";
  } else {
    config.extra.API_URL_ROOT = "https://theradtimes.com";
    config.extra.WS_ROOT = "wss://theradtimes.com";
  }

  return config;
};
