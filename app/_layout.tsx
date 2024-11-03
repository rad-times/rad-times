import { store } from "@/state/store";
import {Provider as ReduxProvider} from "react-redux";
import { WebSocketProvider } from '@/context/WebSocketContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AppRoot from '@/app/AppRoot';
import { StatusBar } from 'expo-status-bar';
import {ReactNode} from "react";

export default function Layout(): ReactNode {
  return (
    <ReduxProvider store={store}>
      <WebSocketProvider>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <StatusBar style='light' />
            <AppRoot />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </WebSocketProvider>
    </ReduxProvider>
  );
}
