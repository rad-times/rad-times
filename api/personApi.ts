import {Person, unknownUser} from "@/types/Person";
import {commonGraphQlRequest} from "@/api/commonApiMethods";
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
      language_locale
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
