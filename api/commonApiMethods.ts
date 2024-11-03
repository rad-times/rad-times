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
    .then((response) => {
      if (response.status >= 400) {
        throw new Error(errorMessage);
      } else {
        return response.json();
      }
    });
}
