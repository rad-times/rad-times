import { createSlice } from "@reduxjs/toolkit";
import {Person} from '@/types/Person';

type CrewList = {
  searchTerm: string
  crewList: Person[],
  allCrew: Person[]
}

type CrewListState = {
  crew: CrewList
}

const initialState: CrewList = {
  searchTerm: '',
  crewList: [],
  allCrew: []
};

export const crewSearchSlice = createSlice({
  name: "crew",
  initialState,
  reducers: {
    updateFriendFavorite: (state, action) => {
      const updatedCrew = state.crewList.map(person => {
        return {
          ...person,
          is_favorite: person.id === action.payload.id ? action.payload.is_favorite : person.is_favorite
        };
      });

      return {
        ...state,
        crewList: updatedCrew
      }
    },
    setSearchTerm: (state, action) => {
      return {
        ...state,
        searchTerm: action.payload
      };
    },
    setCrewList: (state, action) => {
      return {
        ...state,
        crewList: action.payload
      }
    }
  }
});

export {
  CrewListState
}

export const {
  setSearchTerm,
  setCrewList,
  updateFriendFavorite
} = crewSearchSlice.actions;

export default crewSearchSlice.reducer;
