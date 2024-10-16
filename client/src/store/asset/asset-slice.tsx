/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AssetState } from "../../typo/asset/states";
import {
  Asset,
  AssetResponse,
} from "../../typo/asset/response";
import {
  AddAssetParams,
  EditAssetParams,
} from "../../typo/asset/params";

const InitialAssetState: AssetState = {
  adding: false,
  deleting: false,
  editing: false,
  loading: false,
  assets: [],
  curr_asset: undefined,
  searching: false,
  task_error: undefined,
  task_finished: true,
};
const AssetSlice = createSlice({
  name: "asset",
  initialState: InitialAssetState,
  reducers: {
    getAssetRequested: (state, _: PayloadAction<string>) => {
      state.loading = true;
    },
    getAssetDone: (state, action: PayloadAction<Asset>) => {
      state.curr_asset = action.payload;
      state.loading = false;
    },
    addAssetRequested: (state, _: PayloadAction<AddAssetParams>) => {
      state.task_finished = false;
      state.adding = true;
      state.task_error = undefined;
    },
    addAssetDone: (state, action: PayloadAction<Asset>) => {
      state.task_finished = true;
      state.task_error = undefined;
      state.assets.push(action.payload);
      state.adding = false;
    },

    listAssetsRequested: (state, _: PayloadAction<string>) => {
      state.task_finished = false;
      state.loading = true;
    },
    taskUnfinished: (state, action: PayloadAction<string>) => {
      state.task_error = action.payload;
    },
    deleteAssetRequested: (state, _: PayloadAction<string>) => {
      state.deleting = true;
      state.task_error = undefined;
    },
    deleteAssetDone: (state, action: PayloadAction<string>) => {
      state.task_finished = true;
      state.deleting = true;
      state.assets = state.assets.filter(
        (asset) => asset.id !== action.payload
      );
    },
    listAssetDone: (state, payload: PayloadAction<AssetResponse>) => {
      state.assets = payload.payload.results;
      state.task_finished = true;
      state.loading = false;
    },
    setCurrentAsset: (state, payload: PayloadAction<Asset | undefined>) => {
      state.curr_asset = payload.payload;
      state.loading = false;
    },
    resetAssetState: (state, action: PayloadAction<AssetState>) => {
      state = { ...action.payload };
    },
  },
});
export const {
  listAssetsRequested,
  listAssetDone,
  deleteAssetRequested,
  deleteAssetDone,
  setCurrentAsset,
  addAssetRequested,
  addAssetDone,
  resetAssetState,
  getAssetRequested,
  getAssetDone,

  taskUnfinished,
} = AssetSlice.actions;

export default AssetSlice.reducer;
