import _ from "lodash";

interface CommonGraphQlRequestProps {
  queryBody: string
  errorMessage: string
}

export async function commonGraphQlRequest({
                                             queryBody,
                                             errorMessage
                                           }: CommonGraphQlRequestProps): Promise<any> {
  return await fetch('http://localhost:8080/graphql', {
    method: "POST",
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify({ query: queryBody })
  })
    .then(async (response) => {
      if (response.status >= 400) {
        throw new Error(errorMessage);
      } else {
        const resp = await response.json();

        if (_.get(resp, 'errors', []).length) {
          throw new Error(`${errorMessage}: ${_.get(resp, 'errors')[0].message}`);
        }

        return resp;
      }
    });
}
