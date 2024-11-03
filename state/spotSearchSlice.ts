import { createSlice } from "@reduxjs/toolkit";
import {Spot} from '@/types/Spot';

type SpotSearchResults = {
  searchResults: Spot[]
}
const initialState: SpotSearchResults = {
  searchResults: []
};

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
    }
  }
});

export {
  SpotSearchResults
}

export const { setSearchResults } = spotSearchSlice.actions;

export default spotSearchSlice.reducer;
