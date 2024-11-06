import { store } from "@/state/store";
import {Provider as ReduxProvider} from "react-redux";
import { WebSocketProvider } from '@/context/WebSocketProvider';
import { AuthProvider} from "@/context/AuthProvider";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppRoot from '@/app/AppRoot';
import { StatusBar } from 'react-native';
import {ReactNode} from "react";

export default function Layout(): ReactNode {
  return (
    <ReduxProvider store={store}>
      <WebSocketProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <StatusBar
              barStyle={'light-content'}
            />
            <AppRoot />
          </SafeAreaProvider>
        </AuthProvider>
      </WebSocketProvider>
    </ReduxProvider>
  );
}
