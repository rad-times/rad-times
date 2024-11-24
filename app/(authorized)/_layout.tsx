import {Colors} from "@/constants/Colors";
import {useAuthSession} from "@/providers/AuthProvider";
import {Redirect, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StyleSheet, View} from 'react-native';
import {ReactNode, useCallback} from "react";

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
