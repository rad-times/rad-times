import {ActiveUserStateProp} from "@/state/activeUserSlice";
import _ from 'lodash';
import {Spot} from '@/types/Spot';
import {Person} from '@/types/Person';
import {commonGraphQlRequest} from '@/api/commonApiMethods';
import {useSelector} from "react-redux";

function getSpotByNameQuery(userId: number, inputName: String) {
  return `{
    spotByName(nameToMatch: "${inputName}", personId: ${userId}) {
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

function getSpotByFavoriteQuery() {
  return `{
    spotByFavoriteOnly() {
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

function toggleSpotFavoriteQuery(spotId: number, personId: number, isFavorite: boolean) {
  return `mutation {
    toggleSpotFavorite(spotId: ${spotId}, activeUserId: ${personId}, isFavorite: ${isFavorite}) {
      spot_id
      is_favorite
    }
  }`;
}

export async function fetchSpotsByName(name: string, personId: number): Promise<Spot[]> {
  try {
    const queryResp = await commonGraphQlRequest({
      queryBody:  getSpotByNameQuery(personId, name),
      errorMessage: "Error fetching spot data by name"
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

export async function fetchSpotsByFavoriteOnly(): Promise<Spot[]> {
  try {
    const queryResp = await commonGraphQlRequest({
      queryBody:  getSpotByFavoriteQuery(),
      errorMessage: "Error fetching favorite spot data"
    });
    const resp = _.get(queryResp, 'data.spotByName', []);
    return resp.map((spot:Spot) => {
      return {
        ...spot,
        spot_id: Number(spot.spot_id)
      }
    });
  } catch (err) {
    // @TODO Error handling
    return [];
  }
}

export async function toggleFavoriteSpot(spotId: number, personId: number, isFavorite: boolean): Promise<Spot> {
  try {
    const queryResp = await commonGraphQlRequest({
      queryBody:  toggleSpotFavoriteQuery(spotId, personId, isFavorite),
      errorMessage: "Error setting spot as favorite"
    });
    return _.get(queryResp, 'data.toggleSpotFavorite', {});

  } catch (err) {
    // @TODO Error handling
    return {
      spot_id: spotId
    }
  }
}
