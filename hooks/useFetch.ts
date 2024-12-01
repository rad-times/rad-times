import {useAuthSession} from "@/providers/AuthProvider";
import {ApiTokenStateProp} from "@/state/apiTokenSlice";
import Constants from "expo-constants";
import _ from "lodash";
import {useRef, useState} from "react";
import {useSelector} from "react-redux";

interface IUseFetch {
  method: "GET"|"POST"|"PUT"|"DELETE",
  endpoint: string
  requestBody?: JSON
}

export default function useFetch({
  method,
  endpoint,
  requestBody
}:IUseFetch) {

  const API_URL = useRef(Constants.expoConfig?.extra?.API_URL_ROOT || '');
  const {signOut} = useAuthSession();
  const apiToken = useSelector((state: ApiTokenStateProp) => state.apiToken.token);

  const [fetching, setFetching] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [response, setResponse] = useState<any>(null)

  async function doFetch():Promise<void> {
    try {
      const resp = await fetch(`${API_URL.current}${endpoint}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          'Authorization': `Bearer ${apiToken}`,
        },
        body: JSON.stringify(requestBody)
      });

      switch (response.status) {
        case 401:
          console.log('API returned 401 on request. Logging user out');
          signOut();
          setFetching(false);
          break;
        case 200:
          const data = await response.json();
          if (data.status >= 400) {
            debugger;
            setError(data.message);
          } else {
            if (_.get(data, 'errors', []).length) {
              setError(`${_.get(data, 'errors')[0].message}`);
            }
            setResponse(data);
            setFetching(false);
          }
          break;
        default:
          setError("Request for "+ endpoint +" returned " + response.status.toString());
          setResponse("");
          setFetching(false);
      }
    } catch (err) {
      setError(error.toString());
    }
  }

  doFetch();
  return [fetching, response, error];
}
