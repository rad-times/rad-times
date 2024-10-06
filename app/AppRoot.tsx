import {Colors} from "@/constants/Colors";
import {Stack} from "expo-router";
import {useCallback, useEffect, useState} from "react";
import {getActivePersonById} from "@/api/personApi";
import { SplashScreen } from "expo-router";
import {setActiveUser} from "@/state/activeUserSlice";
import {useDispatch} from "react-redux";
import {setCrewList} from "@/state/crewSearchSlice";
import {StyleSheet, View} from "react-native";

SplashScreen.preventAutoHideAsync()
  .catch(err => console.log('error', err));

export default function Layout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAppLoadData() {
      try {
        await getActivePersonById(1)
          .then(personResp => {
            dispatch(setActiveUser(personResp));
            dispatch(setCrewList(personResp?.crew || []))
          });

      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    fetchAppLoadData()
      .catch((err:string)  => {
        // @TODO handle error
        console.error(err);
      });
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
    return null;
  }

  return (
    <View
      style={styles.rootWrapper}
      onLayout={onLayoutRootView}
    >
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.DARK_RED
          },
          headerTintColor: Colors.WHITE,
          title: ''
      }}
      >
        <Stack.Screen
          name="(tabs)"
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  rootWrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.BLACK
  }
});
