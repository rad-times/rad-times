import {Colors} from "@/constants/Colors";
import {Stack} from "expo-router";
import {useCallback, useEffect, useState} from "react";
import {getPersonById} from "@/api/personApi";
import * as SplashScreen from "expo-splash-screen";
import {setActiveUser} from "@/state/activeUserSlice";
import {useDispatch} from "react-redux";

export default function Layout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function prepare() {
      try {
        await getPersonById(1)
          .then(personResp => {
            dispatch(setActiveUser(personResp));
          })

      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.DARK_RED
        },
        title: ''
    }}
    >
      <Stack.Screen
        name="(tabs)"
      />
    </Stack>
  );
}
