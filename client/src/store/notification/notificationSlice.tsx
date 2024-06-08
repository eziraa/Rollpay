import { createSlice } from "@reduxjs/toolkit";

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
  reducers: {},
});

export default FlashMessageSlice.reducer;
