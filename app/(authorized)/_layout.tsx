import {getActivePersonBySubject, getUserLanguages} from "@/api/personApi";
import {Colors} from "@/constants/Colors";
import {useAuthSession} from "@/providers/AuthProvider";
import {setActiveUser} from "@/state/activeUserSlice";
import {setCrewList} from "@/state/crewSearchSlice";
import {setDisplayText} from "@/state/displayLanguageSlice";
import {Redirect, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {jwtDecode, JwtPayload} from "jwt-decode";
import {StyleSheet, View} from 'react-native';
import {ReactNode, useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import _ from 'lodash';

export default function RootLayout(): ReactNode {
  const {isLoading, token} = useAuthSession();
  const [activeUserReady, setActiveUserReady] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onLayoutRootView = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  useEffect(() => {
    async function fetchActiveUser (sessionToken:string):Promise<void> {
      const decoded: JwtPayload = jwtDecode(sessionToken);
      if (decoded.sub) {
        const personResp = await getActivePersonBySubject(decoded.sub, sessionToken);
        dispatch(setActiveUser(personResp));
        dispatch(setCrewList(personResp?.crew || []))

        const displayText = await getUserLanguages(personResp.language_code);
        dispatch(setDisplayText(displayText));
        setActiveUserReady(true);
      }
    };

    if (!_.isString(token?.current)) {
      return;
    }
    fetchActiveUser(token?.current);
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  if (!activeUserReady) {
    return <Redirect href="/login" />;
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
