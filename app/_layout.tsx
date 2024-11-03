import { store } from "@/state/store";
import {Provider, useDispatch} from "react-redux";
import * as SplashScreen from 'expo-splash-screen';
import AppRoot from '@/app/AppRoot';

SplashScreen.preventAutoHideAsync();

export default function Layout() {

  return (
    <Provider store={store}>
       <AppRoot />
    </Provider>
  );
}
