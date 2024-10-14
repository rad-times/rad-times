import { store } from "@/state/store";
import {Provider} from "react-redux";
import { WebSocketProvider } from '@/context/WebSocketContext';
import AppRoot from '@/app/AppRoot';
import { StatusBar } from 'expo-status-bar';
import {ReactNode} from "react";

export default function Layout(): ReactNode {
  return (
    <Provider store={store}>
      <WebSocketProvider>
        <StatusBar style='light' />
        <AppRoot />
      </WebSocketProvider>
    </Provider>
  );
}
