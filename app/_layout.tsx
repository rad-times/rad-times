import { store } from "@/state/store";
import {Provider as ReduxProvider} from "react-redux";
import { WebSocketProvider } from '@/context/WebSocketContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppRoot from '@/app/AppRoot';
import { StatusBar } from 'react-native';
import {ReactNode} from "react";

export default function Layout(): ReactNode {
  return (
    <ReduxProvider store={store}>
      <WebSocketProvider>
        <SafeAreaProvider>
          <StatusBar
            barStyle={'light-content'}
          />
          <AppRoot />
        </SafeAreaProvider>
      </WebSocketProvider>
    </ReduxProvider>
  );
}
