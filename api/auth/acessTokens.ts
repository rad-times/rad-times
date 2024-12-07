import Constants from "expo-constants";
import {TokenPairType} from '@/providers/AuthProvider';

const API_URL = Constants.expoConfig?.extra?.API_URL_ROOT || '';

/**
 * Ensure the stored token is valid before using it in the app
 */
const validateToken = async (tokenFromStorage: string): Promise<boolean> => {
  try {
    const validateResponse = await fetch(`${API_URL}/validateToken`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': `Bearer ${tokenFromStorage}`
      },
      method: 'GET'
    });

    return validateResponse.status === 200;

  } catch (err) {
    return false;
  }
}
/**
 * Refresh access token
 */
const refreshAccessToken = async (refreshToken: string): Promise<TokenPairType> => {
  try {
    const tokenRefreshResp = await fetch(`${API_URL}/refreshAccessToken`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': `Bearer ${refreshToken}`
      },
      method: 'GET'
    });

    return await tokenRefreshResp.json();

  } catch (err) {
    console.error("Error refresh access tokens");
    return {} as TokenPairType;
  }
}

export {
  validateToken,
  refreshAccessToken
};
