import { createSlice } from "@reduxjs/toolkit";
import {Person, unknownUser} from '@/types/Person';

type ActiveUserState = {
  user: Person
}

type ActiveUserStateProp = {
  activeUser: ActiveUserState
}

const initialState: ActiveUserState = {
  user: unknownUser
};

//State slice
export const activeUserSlice = createSlice({
  name: "activeUser",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      return {
        ...state,
        user: action.payload
      };
    }
  }
});

export {
  ActiveUserStateProp
}

export const {
  setActiveUser
} = activeUserSlice.actions;

export default activeUserSlice.reducer;
