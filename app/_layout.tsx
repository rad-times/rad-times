import {Colors} from "@/constants/Colors";
import { store } from "@/state/store";
import {Stack} from "expo-router";
import {Provider as ReduxProvider} from "react-redux";
import { WebSocketProvider } from '@/providers/WebSocketProvider';
import AuthProvider from "@/providers/AuthProvider";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import {ReactNode, useEffect, useState} from "react";

export default function Layout(): ReactNode {

  // Devtools needs about a second to start up when you refresh. Any app load debuggers will be past execution
  // before devtools is ready. Makes it too easy to get stuck on some dumb shit when the app is loading
  // This just kills time before loading the app so devtools can get it's shit together
  const [wait, setWait] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setWait(false);
    }, 1200);
  }, []);

  if (wait) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <WebSocketProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <StatusBar
              barStyle={'light-content'}
            />
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
          </SafeAreaProvider>
        </AuthProvider>
      </WebSocketProvider>
    </ReduxProvider>
  );
}
