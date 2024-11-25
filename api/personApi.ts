import {Person, unknownUser} from "@/types/Person";
import {commonGraphQlRequest} from "@/api/commonApiMethods";
import Constants from "expo-constants";
import _ from "lodash";

const API_URL = Constants.expoConfig?.extra?.API_URL_ROOT || '';

function getPersonByIdQuery(id: number) {
  return `{
    personById(id: ${id}) {
      id
      first_name
      last_name
      bio
      profile_image
      socials {
        id
        url_link
        social_type
      }
      location {
        id
        city_name
        state_name
        country_name
      }
    }
  }`;
}

function getActivePersonByEmailQuery(email: string) {
  return `{
    activePersonByEmail(email: "${email}") {
      id
      first_name
      last_name
      bio
      language_code
      socials {
        id
        url_link
        social_type
      }
      profile_image
      crew {
        id
        first_name
        last_name
        bio
        is_favorite
        profile_image
        location {
          id
          city_name
          state_name
          country_name
        }
      }
      location {
        id
        city_name
        state_name
        country_name
      }
    }
  }`;
}

export async function getPersonById(id: number, sessionToken:string): Promise<Person> {
  try {
    const queryResp = await commonGraphQlRequest({
      queryBody:  getPersonByIdQuery(id),
      errorMessage: "Error fetching person by id",
      sessionToken
    });

    return _.get(queryResp, 'data.personById', unknownUser);

  } catch (err) {
    console.error(err);
    // @TODO Error handling
    return unknownUser;
  }
}

export async function getActivePersonByEmail(email: string, sessionToken:string): Promise<Person> {
  try {
    const queryResp = await commonGraphQlRequest({
      queryBody:  getActivePersonByEmailQuery(email),
      errorMessage: "Error fetching person by id",
      sessionToken
    });

    return _.get(queryResp, 'data.activePersonByEmail', unknownUser);

  } catch (err) {
    console.error(err);
    // @TODO Error handling
    return unknownUser;
  }
}

export async function getUserLanguages(languageCode:string = 'en'): Promise<object> {
  try {
    return await fetch(`${API_URL}/static/languages_${languageCode.toLowerCase()}.json`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      method: 'GET'
    })
      .then(resp => {
        return resp.json();
      });
  } catch (err) {
    console.error(err);
    // @TODO Error handling
    return {};
  }
}
