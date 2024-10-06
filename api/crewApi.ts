import {Person} from "@/types/Person";
import {commonGraphQlRequest} from "@/api/commonApiMethods";
import _ from "lodash";

function crewByPersonIdQuery(id: number) {
  return `{
    crewByPersonId(id: ${id}) {
      id
      first_name
      last_name
      bio
      profile_image
      location {
        location_id
        city_name
        state_name
        country_name
      }
    }
  }`
}

function togglePersonFavoriteQuery(personId: number, activeUserId: number, isFavorite: boolean) {
  return `mutation {
    togglePersonFavorite(personId: ${personId}, activeUserId: ${activeUserId}, isFavorite: ${isFavorite}) {
      id
      is_favorite
    }
  }`;
}


export async function getCrewByPersonId(id: number): Promise<Person[]> {
  try {
    const queryResp = await commonGraphQlRequest({
      queryBody:  crewByPersonIdQuery(id),
      errorMessage: "Error fetching crew by person id"
    });

    return _.get(queryResp, 'data.crewByPersonId', []);

  } catch (err) {
    console.error(err);
    // @TODO Error handling
    return [];
  }
}

export async function togglePersonFavorite(personId: number, activeUserId: number, isFavorite: boolean): Promise<Person> {
  try {
    const queryResp = await commonGraphQlRequest({
      queryBody:  togglePersonFavoriteQuery(personId, activeUserId, isFavorite),
      errorMessage: "Error setting friend as favorite"
    });
    return _.get(queryResp, 'data.togglePersonFavorite', {});

  } catch (err) {
    // @TODO Error handling
    return {
      id: personId
    }
  }
}
