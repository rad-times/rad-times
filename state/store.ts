import { configureStore } from "@reduxjs/toolkit";
import activeUser from "@/state/activeUserSlice";
import spotSearch from "@/state/spotSlice";
import crewSearch from "@/state/crewSearchSlice";

export const store = configureStore({
  reducer: {
    activeUser,
    spotSearch,
    crewSearch
  }
});
