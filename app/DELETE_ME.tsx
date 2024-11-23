import {Colors} from "@/constants/Colors";
import {AuthContext} from "@/providers/AuthProvider";
import {setDisplayText} from "@/state/displayLanguageSlice";
import {Stack} from "expo-router";
import {ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {getActivePersonById, getUserLanguages} from "@/api/personApi";
import { SplashScreen } from "expo-router";
import {setActiveUser} from "@/state/activeUserSlice";
import {useDispatch} from "react-redux";
import {setCrewList} from "@/state/crewSearchSlice";
import {StyleSheet, View} from "react-native";

SplashScreen.preventAutoHideAsync()
  .catch(err => console.log('error', err));

export default function DELETE_ME(): ReactNode {

  const dispatch = useDispatch();
  const {userId} = useContext(AuthContext);

  // @TODO Rebuild this once auth is done.
  // We need to get some initial data before we even try to load the app and catch / handle errors if we can't.
  // E.G. if the server is down and we cant fetch messages, it should not crash and hang on the loading screen.
  useEffect(() => {
    async function fetchAppLoadData() {
      try {
        console.log('appRoot useEffect with userId: ', userId);
        if (userId === -1) {
          const displayText = await getUserLanguages("EN");
          dispatch(setDisplayText(displayText));
          setAppIsReady(true);
          return;
        }

        const personResp = await getActivePersonById(userId)
        dispatch(setActiveUser(personResp));
        dispatch(setCrewList(personResp?.crew || []))

        const displayText = await getUserLanguages(personResp.language_code);
        dispatch(setDisplayText(displayText));

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
  }, [userId]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
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
