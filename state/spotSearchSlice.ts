import { createSlice } from "@reduxjs/toolkit";
import {Spot} from '@/types/Spot';

type SpotSearchResults = {
  searchResults: Spot[],
  spotLocationMapShown: boolean,
  currentSpotMapDetails: Spot | null
}
const initialState: SpotSearchResults = {
  searchResults: [],
  spotLocationMapShown: false,
  currentSpotMapDetails: null
};

type SpotState = {
  spotSearch: SpotSearchResults
}

//State slice
export const spotSearchSlice = createSlice({
  name: "spotSearch",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      return {
        ...state,
        searchResults: action.payload
      };
    },
    setCurrentSpotMapDetails: (state, action) => {
      return {
        ...state,
        currentSpotMapDetails: action.payload
      };
    },
    setSpotLocationMapShown: (state, action) => {
      return {
        ...state,
        spotLocationMapShown: action.payload
      };
    }
  }
});

export {
  SpotState
}

export const {
  setSearchResults,
  setCurrentSpotMapDetails,
  setSpotLocationMapShown
} = spotSearchSlice.actions;

export default spotSearchSlice.reducer;
