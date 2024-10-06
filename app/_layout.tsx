import { store } from "@/state/store";
import {Provider, useDispatch} from "react-redux";
import AppRoot from '@/app/AppRoot';
import { StatusBar } from 'expo-status-bar';
import {ReactNode} from "react";

export default function Layout(): ReactNode {
  return (
    <Provider store={store}>
       <StatusBar style='light' />
       <AppRoot />
    </Provider>
  );
}
