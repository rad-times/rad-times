import { createSlice } from "@reduxjs/toolkit";
import {Spot} from '@/types/Spot';

type SpotListing = {
  spotListing: Spot[],
  spotLocationMapShown: boolean,
  currentSpotMapDetails: Spot | null
  createNewSpotModalShown: boolean
  spotDetailsPageContent: Spot | null
}
const initialState: SpotListing = {
  spotListing: [],
  spotLocationMapShown: false,
  currentSpotMapDetails: null,
  createNewSpotModalShown: false,
  spotDetailsPageContent: null
};

type SpotState = {
  spotList: SpotListing
}

//State slice
export const spotSlice = createSlice({
  name: "spotSearch",
  initialState,
  reducers: {
    updateSpotFavorite: (state, action) => {
      const updatedSpots = state.spotListing.map(spot => {
        return {
          ...spot,
          is_favorite: spot.spot_id === action.payload.spotId ? action.payload.isFavorite : spot.is_favorite
        };
      });

      return {
        ...state,
        spotListing: updatedSpots
      }
    },
    setSearchResults: (state, action) => {
      return {
        ...state,
        spotListing: action.payload
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
    },
    setCreateNewSpotModalShown: (state, action) => {
      return {
        ...state,
        createNewSpotModalShown: action.payload
      };
    },
    setSpotDetailsPageContent: (state, action) => {
      return {
        ...state,
        spotDetailsPageContent: action.payload
      }
    }
  }
});

export {
  SpotState
}

export const {
  setSearchResults,
  setCurrentSpotMapDetails,
  setSpotLocationMapShown,
  updateSpotFavorite,
  setCreateNewSpotModalShown,
  setSpotDetailsPageContent
} = spotSlice.actions;

export default spotSlice.reducer;
