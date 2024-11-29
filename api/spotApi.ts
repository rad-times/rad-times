import _ from 'lodash';
import {Spot} from '@/types/Spot';
import {commonGraphQlRequest} from '@/api/commonApiMethods';

function getSpotByNameQuery(inputName: string): string {
  return `{
    spotByName(nameToMatch: "${inputName}") {
      spot_id
      spot_name
      spot_image
      spot_description
      last_check_in
      is_public
      is_private
      is_favorite
      location {
        lat
        lng
      }
      keywords {
        keyword_id
        keyword_name
        description
      }
     }
  }`;
}

function getFetchSpotsByLatLngQuery(lat: number, lng: number, distance: number):string {
  return `{
    spotByLatLng(lat: ${lat}, lng: ${lng}, distance: ${distance}}) {
      spot_id
      spot_name
      spot_image
      spot_description
      last_check_in
      is_public
      is_private
      is_favorite
      location {
        lat
        lng
      }
      keywords {
        keyword_id
        keyword_name
        description
      }
     }
  }`
}

function toggleSpotFavoriteQuery(spotId: number, isFavorite: boolean) {
  return `mutation {
    toggleSpotFavorite(spotId: ${spotId}, isFavorite: ${isFavorite}) {
      spot_id
      is_favorite
    }
  }`;
}

export async function fetchSpotsByName(name: string, sessionToken: string): Promise<Spot[]> {
  try {
    const queryResp = await commonGraphQlRequest({
      queryBody:  getSpotByNameQuery(name),
      errorMessage: "Error fetching spot data by name",
      sessionToken
    });

    const resp = _.get(queryResp, 'data.spotByName', []);
    return resp.map((spot:Spot) => {
      return {
        ...spot,
        spot_id: Number(spot.spot_id)
      }
    });

  } catch (err) {
    console.error(err);
    // @TODO Error handling
    return [];
  }
}

export async function fetchSpotsByLatLng(lat: number, lng: number, distance: number, sessionToken: string): Promise<Spot[]> {
  try {
    const queryResp = await commonGraphQlRequest({
      queryBody:  getFetchSpotsByLatLngQuery(lat, lng, distance),
      errorMessage: "Error fetching spot data by lat/lng",
      sessionToken
    });

    const resp = _.get(queryResp, 'data.spotByLatLng', []);
    return resp.map((spot:Spot) => {
      return {
        ...spot,
        spot_id: Number(spot.spot_id)
      }
    });

  } catch (err) {
    console.error(err);
    // @TODO Error handling
    return [];
  }
}

export async function toggleFavoriteSpot(spotId: number, isFavorite: boolean, sessionToken: string): Promise<Spot> {
  try {
    const queryResp = await commonGraphQlRequest({
      queryBody:  toggleSpotFavoriteQuery(spotId, isFavorite),
      errorMessage: "Error setting spot as favorite",
      sessionToken
    });
    return _.get(queryResp, 'data.toggleSpotFavorite', {});

  } catch (err) {
    // @TODO Error handling
    return {
      spot_id: spotId
    }
  }
}
