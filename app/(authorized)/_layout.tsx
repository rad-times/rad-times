import {Colors} from "@/constants/Colors";
import {useAuthSession} from "@/providers/AuthProvider";
import RadTimesHeader from "@/views/RadTimesHeader";
import {Redirect, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {Button, StyleSheet} from 'react-native';
import {ReactNode, useCallback} from "react";
import {SafeAreaView} from "react-native-safe-area-context";

export default function RootLayout(): ReactNode {
  const {isLoading, token} = useAuthSession();

  const onLayoutRootView = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  if (token?.current === "" || token?.current === null || token?.current === undefined) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaView
      style={styles.rootWrapper}
      onLayout={onLayoutRootView}
    >
      <RadTimesHeader />
      <Stack
        screenOptions={{
          headerShown: false,
          headerTintColor: Colors.WHITE,
          title: ''
        }}
      >
         <Stack.Screen
          name="(tabs)"
        />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootWrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.DARK_RED
  }
});
