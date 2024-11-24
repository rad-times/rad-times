import Constants from "expo-constants";
import {useEffect, useState} from "react";

/**
 * Devtools needs about a second to start up when you refresh. Any breakpoints or debuggers in the code
 * as part of application load will be past execution by the time devtooks is connected and ready.
 * This hook just kills time when working in dev so devtools can get it's shit together
 */
const useDevLoadWait = () => {
  const env:string = Constants.expoConfig?.extra?.ENV || 'prod';
  const [devLoadWait, setDevLoadWait] = useState(true);

  if (env !== 'dev') {
    return false;
  }

  setTimeout(() => {
    setDevLoadWait(false);
  }, 1200);

  return devLoadWait;
}

export default useDevLoadWait;
