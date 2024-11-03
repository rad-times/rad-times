import { createSlice } from "@reduxjs/toolkit";
import {Spot} from '@/types/Spot';
import _ from 'lodash';

type SpotListing = {
  spotListing: Spot[],
  spotLocationMapShown: boolean,
  currentSpotMapDetails: Spot | null
  createNewSpotModalShown: boolean
  spotDetailsPageContent: Spot | null
  newSpot: Spot
}
const initialState: SpotListing = {
  spotListing: [],
  spotLocationMapShown: false,
  currentSpotMapDetails: null,
  createNewSpotModalShown: false,
  spotDetailsPageContent: null,
  newSpot: {} as Spot
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
    },
    setNewSpotModelData: (state, action) => {

      if (_.isUndefined(action.payload.propertyKey)) {
        return {
          ...state,
          newSpot: action.payload
        };
      }

      const newSpot = {
        ...state.newSpot,
        [action.payload.propertyKey]: action.payload.value
      };

      return {
        ...state,
        newSpot: newSpot
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
  setSpotLocationMapShown,
  updateSpotFavorite,
  setCreateNewSpotModalShown,
  setSpotDetailsPageContent,
  setNewSpotModelData
} = spotSlice.actions;

export default spotSlice.reducer;
