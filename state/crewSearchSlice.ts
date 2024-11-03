import { createSlice } from "@reduxjs/toolkit";

type CrewSearchResults = {
  searchTerm: string
}

type CrewSearchResultsState = {
  crewSearch: CrewSearchResults
}

const initialState: CrewSearchResults = {
  searchTerm: ''
};

export const crewSearchSlice = createSlice({
  name: "crewSearch",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      return {
        ...state,
        searchTerm: action.payload
      };
    }
  }
});

export {
  CrewSearchResultsState
}

export const { setSearchTerm } = crewSearchSlice.actions;

export default crewSearchSlice.reducer;
