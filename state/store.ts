import { configureStore } from "@reduxjs/toolkit";
import activeUser from "@/state/activeUserSlice";
import spotSearch from "@/state/spotSearchSlice";
import crewSearch from "@/state/crewSearchSlice";

export const store = configureStore({
  reducer: {
    activeUser,
    spotSearch,
    crewSearch
  }
});
