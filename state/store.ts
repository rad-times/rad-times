import { configureStore } from "@reduxjs/toolkit";
import activeUser from "@/state/activeUserSlice";
import spotList from "@/state/spotSlice";
import crew from "@/state/crewSearchSlice";
import googleLocationSearch from '@/state/googleLocationsSlice';
import displayText from '@/state/displayLanguageSlice';
import activeFriends from '@/state/checkInAndActiveSlice';

export const store = configureStore({
  reducer: {
    activeUser,
    spotList,
    crew,
    googleLocationSearch,
    displayText,
    activeFriends
  }
});
