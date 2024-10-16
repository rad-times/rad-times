import _ from 'lodash';

/**
 * Get full details for a location
 */
const getLocationData = async (placeId: string) => {
  return await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': 'AIzaSyDWsX3AIFC8x2_uSTWDLoLG52MZpqr_-II',
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
      'X-Goog-Api-Key': 'AIzaSyDWsX3AIFC8x2_uSTWDLoLG52MZpqr_-II'
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
  getLocationData
};
