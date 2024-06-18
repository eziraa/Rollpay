/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FlashMessageItem {
  type: string;
  status: boolean;
  title: string;
  desc: string;
  duration: number;
}

export interface FlashMessageState {
  flashMessages: FlashMessageItem[];
}

const initialState: FlashMessageState = {
  flashMessages: [],
};

export const FlashMessageSlice = createSlice({
  name: "flashMessage",
  initialState,
  reducers: {
    setFlashMessage: (state, action: PayloadAction<FlashMessageItem>) => {
      state.flashMessages.unshift(action.payload);
    },
    hideFlashMessage: (state, action: PayloadAction<FlashMessageItem>) => {
      state.flashMessages.splice(
        state.flashMessages.indexOf(action.payload),
        1
      );
    },
  },
});

export const { setFlashMessage, hideFlashMessage } = FlashMessageSlice.actions;
export default FlashMessageSlice.reducer;
