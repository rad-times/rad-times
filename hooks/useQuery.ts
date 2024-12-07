import {useAuthSession} from "@/providers/AuthProvider";
import Constants from 'expo-constants';
import {MutableRefObject, useRef, useState} from "react";

interface IUseQuery {
  queryBody: string;
  queryDescriptor: string;
}

export default function useQuery({
  queryBody,
  queryDescriptor
}: IUseQuery): [boolean, any, string] {

  const API_URL:MutableRefObject<string> = useRef(Constants.expoConfig?.extra?.API_URL_ROOT || '');
  const {signOut, token} = useAuthSession();

  const [fetching, setFetching] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [response, setResponse] = useState<any>(null)

  async function doQuery(): Promise<void> {
    try {
      const resp = await fetch(`${API_URL}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ query: queryBody })
      });

      if (resp.status === 401) {
        console.log('API returned 401 on request. Logging user out');
        signOut();
        setFetching(false);
        return;
      }

      if (resp.status === 200) {
        const data = await response.json();
        setResponse(data);
        setFetching(false);
        return;
      }

      setError("Request for "+ queryDescriptor +" returned " + resp.status.toString());
      setResponse("");
      setFetching(false);

    } catch (err) {
      setError(error.toString());
    }
  }

  doQuery();
  return [fetching, response, error];
}
