import {Spot} from "@/types/Spot";
import { createSlice } from "@reduxjs/toolkit";

type CreateNewSpotState = {
  newSpot: Spot
}

type CreateNewSpotStateProp = {
  createNewSpot: CreateNewSpotState
}

const initialState: CreateNewSpotState = {
  newSpot: {
    spot_id: -1,
    spot_name: '',
    spot_description: '',
    is_private: false,
    keywords: []
  }
};

export const newSpotSlice = createSlice({
  name: "createNewSpot",
  initialState,
  reducers: {
    setNewSpotModelData: (state, action) => {
      return {
        ...state,
        newSpot: {
          ...state.newSpot,
          [action.payload.property]: action.payload.value
        }
      };
    }
  }
});

export {
  CreateNewSpotStateProp
}

export const {
  setNewSpotModelData
} = newSpotSlice.actions;

export default newSpotSlice.reducer;
