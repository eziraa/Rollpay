/* eslint-disable react-refresh/only-export-components */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FlashMessageState {
  type: string;
  status: boolean;
  title: string;
  desc: string;
  duration: number;
}

const initialState: FlashMessageState = {
  type: "",
  status: false,
  title: "",
  desc: "",
  duration: 0,
};

export const FlashMessageSlice = createSlice({
  name: "flashMessage",
  initialState,
  reducers: {
    setFlashMessage: (state, action: PayloadAction<FlashMessageState>) => {
      state.type = action.payload.type;
      state.status = action.payload.status;
      state.title = action.payload.title;
      state.desc = action.payload.desc;
      state.duration = action.payload.duration;
    },
    hideFlashMessage: (state) => {
      state.status = false;
      state.type = "";
      state.title = "";
      state.desc = "";
      state.duration = 0;
    },
  },
});

export const { setFlashMessage, hideFlashMessage } = FlashMessageSlice.actions;
export default FlashMessageSlice.reducer;
