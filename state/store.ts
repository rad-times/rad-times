import { configureStore } from "@reduxjs/toolkit";
import activeUser from "@/state/activeUserSlice";
import spotList from "@/state/spotSlice";
import crew from "@/state/crewSearchSlice";

export const store = configureStore({
  reducer: {
    activeUser,
    spotList,
    crew
  }
});
