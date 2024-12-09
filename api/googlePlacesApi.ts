import _ from 'lodash';
import Constants from "expo-constants";

const GOOGLE_MAPS_API_KEY:string = Constants.expoConfig?.extra?.GOOGLE_MAPS_KEY;
/**
 * Takes lat / lng coordinates and returns the city location
 */
const getLocationByLatLng = async (lat: number, lng: number): Promise<google.maps.GeocoderResult> => {
  const resp = await fetch(`https://maps.googleapis.com/maps/api/geocode/json` +
    `?latlng=${lat},${lng}` +
    `&result_type=neighborhood|park` +
    `&key=${GOOGLE_MAPS_API_KEY}`
  , {
    method: 'GET'
  })
    .then(resp => resp.json())
    .catch(err => console.log(err));

  return resp.results[0];
}
/**
 * Get full details for a location
 */
const getLocationData = async (placeId: string) => {
  return await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
      'X-Goog-FieldMask': 'id,addressComponents,location'
    }
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

/**
 * Autocomplete when searching for a location
 */
const searchGooglePlaces = async (searchValue:string) => {
  return await fetch('https://places.googleapis.com/v1/places:autocomplete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY
    },
    body: JSON.stringify({
      "input": searchValue,
      "includedPrimaryTypes": ['neighborhood', 'locality', 'postal_code']
    })
  })
    .then(response => response.json())
    .then(data => {
      if (!_.isArray(data?.suggestions)) {
        return [];
      }

      return data?.suggestions?.map((location: any) => {
        const {
          placePrediction: {
            placeId,
            text: {
              text: displayName
            }
          }
        } = location

        return {
          place_id: placeId,
          location_name: displayName
        };
      });
    })
    .catch(err => console.error(err));
}

export {
  searchGooglePlaces,
  getLocationByLatLng,
  getLocationData
};
