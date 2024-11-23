import {Colors} from "@/constants/Colors";
import {useAuthSession} from "@/providers/AuthProvider";
import {Redirect, SplashScreen, Stack} from 'expo-router';
import {StyleSheet, View} from 'react-native';
import {ReactNode, useCallback} from "react";

export default function RootLayout(): ReactNode {
  const {isLoading, token} = useAuthSession();

  if (isLoading) {
    return null;
  }

  if (token?.current === '') {
    return <Redirect href="/login" />;
  }

  const onLayoutRootView = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

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
