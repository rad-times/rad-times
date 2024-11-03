import _ from 'lodash';
import {Spot} from '@/types/Spot';
import {commonGraphQlRequest} from '@/api/commonApiMethods';

function getSpotByNameQuery(inputName: String) {
  return `{
    spotByName(nameToMatch: "${inputName}") {
      spot_id
      spot_name
      spot_image
      spot_description
      last_check_in
      is_public
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
      keywords {
        keyword_id
        keyword_name
        description
      }
     }
  }`;
}

export async function fetchSpotsByName(name: String): Promise<Spot[]> {
  try {
    const queryResp = await commonGraphQlRequest({
      queryBody:  getSpotByNameQuery(name),
      errorMessage: "Error fetching spot data by name"
    });
    return _.get(queryResp, 'data.spotByName', []);

  } catch (err) {
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
    return _.get(queryResp, 'data.spotByName', []);

  } catch (err) {
    // @TODO Error handling
    return [];
  }
}
