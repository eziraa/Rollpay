import { BaseResponse } from "../utils/response";
import { EditAssetParams } from "./params";

export interface Asset extends EditAssetParams {}

export interface AddAssetResponse extends BaseResponse {
  asset: Asset;
}
export interface EditAssetResponse extends AddAssetResponse {}
export interface DeleteAssetResponse extends AddAssetResponse {}
export interface AssetResponse extends BaseResponse {
  results: Asset[];
}
