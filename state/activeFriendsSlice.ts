import {createSlice} from "@reduxjs/toolkit";

type ActiveFriendsState = {
  numFriendsActive: number,
  activeUserIsCheckedIn: boolean
}

interface IActiveFriendsState {
  activeFriends: ActiveFriendsState
}

const initialState: ActiveFriendsState = {
  numFriendsActive: 0,
  activeUserIsCheckedIn: false
};

export const activeFriendsSlice = createSlice({
  name: "activeFriends",
  initialState,
  reducers: {
    setNumActiveFriends: (state, action) => {
      return {
        ...state,
        numFriendsActive: action.payload
      };
    },
    setActiveUserIsCheckedIn: (state, action) => {
      return {
        ...state,
        activeUserIsCheckedIn: action.payload
      }
    }
  }
});

export {
  IActiveFriendsState
};

export const {
  setNumActiveFriends,
  setActiveUserIsCheckedIn
} = activeFriendsSlice.actions;

export default activeFriendsSlice.reducer;
