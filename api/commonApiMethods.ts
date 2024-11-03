import Constants from 'expo-constants';
import _ from "lodash";

const API_URL = Constants.expoConfig?.extra?.API_URL_ROOT || '';

interface CommonGraphQlRequestProps {
  queryBody: string
  errorMessage: string
}

interface CommonGraphQlMutationProps {
  mutationBody: string
  errorMessage: string
}

export async function commonGraphQlRequest({
  queryBody,
  errorMessage
}: CommonGraphQlRequestProps): Promise<any> {
  return await fetch(`${API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ query: queryBody })
  })
    .then(response => response.json())
    .then(data => {
      if (data.status >= 400) {
        throw new Error(errorMessage);
      } else {
        if (_.get(data, 'errors', []).length) {
          throw new Error(`${errorMessage}: ${_.get(data, 'errors')[0].message}`);
        }

        return data;
      }
    });
}

export async function commonGraphQlMutation({
  mutationBody,
  errorMessage
}: CommonGraphQlMutationProps): Promise<any> {

  return await fetch(`${API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ query: `mutation ${mutationBody}` })
  })
    .then(response => response.json())
    .then(data => {
      if (data.status >= 400) {
        throw new Error(errorMessage + " " + data.error);
      } else {
        if (_.get(data, 'errors', []).length) {
          throw new Error(`${errorMessage}: ${_.get(data, 'errors')[0].message}`);
        }

        return data;
      }
    })
    .catch(err => {
      console.error(err);
    });
}
