import { store } from "@/state/store";
import {Navigator, SplashScreen} from "expo-router";
import {Provider as ReduxProvider} from "react-redux";
import { WebSocketProvider } from '@/providers/WebSocketProvider';
import AuthProvider from "@/providers/AuthProvider";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {ReactNode} from "react";
import Slot = Navigator.Slot;

SplashScreen.preventAutoHideAsync()
  .catch(err => console.log('error', err));

export default function Layout(): ReactNode {
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
