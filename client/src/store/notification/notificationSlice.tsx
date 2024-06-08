import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FlashMessageState {
  color: string;
  status: boolean;
  title: string;
  desc: string;
  duration: number;
}

const initialState: FlashMessageState = {
  color: "",
  status: false,
  title: "",
  desc: "",
  duration: 0,
};

const FlashMessageSlice = createSlice({
  name: "flashMessage",
  initialState,
  reducers: {
    setFlashMessage: (state, action: PayloadAction<FlashMessageState>) => {
      state.color = action.payload.color;
      state.status = action.payload.status;
      state.title = action.payload.title;
      state.desc = action.payload.desc;
      state.duration = action.payload.duration;
    },
    hideFlashMessage: (state) => {
      state.status = false;
      state.color = "";
      state.title = "";
      state.desc = "";
      state.duration = 0;
    },
  },
});

export const { setFlashMessage, hideFlashMessage } = FlashMessageSlice.actions;
export default FlashMessageSlice.reducer;
