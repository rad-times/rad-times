import useDevLoadWait from "@/hooks/useDevLoadWait";
import { store } from "@/state/store";
import {Slot} from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import {Provider as ReduxProvider} from "react-redux";
import { WebSocketProvider } from '@/providers/WebSocketProvider';
import AuthProvider from "@/providers/AuthProvider";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {ReactNode} from "react";

SplashScreen.preventAutoHideAsync()
  .catch(console.warn);

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function Layout(): ReactNode {
  const waiting = useDevLoadWait();
  if (waiting) return null;

  return (
    <ReduxProvider store={store}>
      <WebSocketProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <StatusBar
              barStyle={'light-content'}
            />
            <Slot />
          </SafeAreaProvider>
        </AuthProvider>
      </WebSocketProvider>
    </ReduxProvider>
  );
}
