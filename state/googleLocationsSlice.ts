import { createSlice } from "@reduxjs/toolkit";
import {GoogleSearchResult} from '@/types/Geolocation';

type GoogleLocationState = {
  locationSearchTerm: string
  locationSearchResults: GoogleSearchResult[]
}

type GoogleLocationStateProps = {
  googleLocationSearch: GoogleLocationState
}

const initialState: GoogleLocationState = {
  locationSearchTerm: '',
  locationSearchResults: []
};

export const googleLocationSearchSlice = createSlice({
  name: "googleLocations",
  initialState,
  reducers: {
    setSearchInput: (state, action) => {
      return {
        ...state,
        locationSearchTerm: action.payload
      };
    },
    setSearchResults: (state, action) => {
      return {
        ...state,
        locationSearchResults: action.payload
      };
    }
  }
});

export {
  GoogleLocationStateProps
}

export const {
  setSearchInput,
  setSearchResults
} = googleLocationSearchSlice.actions;

export default googleLocationSearchSlice.reducer;
