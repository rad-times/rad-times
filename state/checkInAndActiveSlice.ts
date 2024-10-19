import {createSlice} from "@reduxjs/toolkit";

type ActiveFriendsState = {
  numFriendsActive: number,
  activeUserIsCheckedIn: boolean,
  checkInModalOpen: boolean
}

interface IActiveFriendsState {
  activeFriends: ActiveFriendsState
}

const initialState: ActiveFriendsState = {
  numFriendsActive: 0,
  activeUserIsCheckedIn: false,
  checkInModalOpen: false
};

export const checkInAndActiveSlice = createSlice({
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
    },
    setCheckInModalOpen: (state, action) => {
      return {
        ...state,
        checkInModalOpen: action.payload
      }
    }
  }
});

export {
  IActiveFriendsState
};

export const {
  setNumActiveFriends,
  setActiveUserIsCheckedIn,
  setCheckInModalOpen
} = checkInAndActiveSlice.actions;

export default checkInAndActiveSlice.reducer;
