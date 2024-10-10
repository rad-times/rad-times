import {createSlice} from "@reduxjs/toolkit";

type DisplayTextState = {
  displayTextJson: {[key: string]: any}
}

type DisplayTextStateProp = {
  displayText: DisplayTextState
}

const initialState: DisplayTextState = {
  displayTextJson: {}
};

export const displayLanguageSlice = createSlice({
  name: "displayText",
  initialState,
  reducers: {
    setDisplayText: (state, action) => {
      return {
        ...state,
        displayTextJson: action.payload
      };
    }
  }
});

export {
  DisplayTextStateProp
};

export const {
  setDisplayText
} = displayLanguageSlice.actions;

export default displayLanguageSlice.reducer;
