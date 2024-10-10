import {Person, unknownUser} from "@/types/Person";
import {commonGraphQlRequest} from "@/api/commonApiMethods";
import id from "ajv/lib/vocabularies/core/id";
import _ from "lodash";

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
        location_id
        city_name
        state_name
        country_name
      }
    }
  }`;
}

function getActivePersonByIdQuery(id: number) {
  return `{
    activePersonById(id: ${id}) {
      id
      first_name
      last_name
      email_address
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
          location_id
          city_name
          state_name
          country_name
        }
      }
      location {
        location_id
        city_name
        state_name
        country_name
      }
    }
  }`;
}

export async function getPersonById(id: number): Promise<Person> {
  try {
    const queryResp = await commonGraphQlRequest({
      queryBody:  getPersonByIdQuery(id),
      errorMessage: "Error fetching person by id"
    });

    return _.get(queryResp, 'data.personById', unknownUser);

  } catch (err) {
    console.error(err);
    // @TODO Error handling
    return unknownUser;
  }
}

export async function getActivePersonById(id: number): Promise<Person> {
  try {
    const queryResp = await commonGraphQlRequest({
      queryBody:  getActivePersonByIdQuery(id),
      errorMessage: "Error fetching person by id"
    });

    return _.get(queryResp, 'data.activePersonById', unknownUser);

  } catch (err) {
    console.error(err);
    // @TODO Error handling
    return unknownUser;
  }
}

export async function getUserLanguages(languageCode:string = 'en'): Promise<Object> {
  try {
    return await fetch(`http://localhost:8080/static/languages_${languageCode.toLowerCase()}.json`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      method: 'GET'
    })
      .then(resp => resp.json());
  } catch (err) {
    console.error(err);
    // @TODO Error handling
    return {};
  }
}
