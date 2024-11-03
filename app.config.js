import 'dotenv/config';

module.exports = ({ config }) => {
  config.ios.config.googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
  config.android.config.googleMaps.apiKey = process.env.GOOGLE_MAPS_API_KEY;
  config.extra.eas.projectId = process.env.EAS_PROJECT_ID;

  return config;
};
