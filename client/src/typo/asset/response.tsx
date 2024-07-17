import { BaseResponse } from "../utils/response";

export interface Asset {
  asset_name: string;
  asset_value: string;
  employee_id: string;
  id: string;
}

export interface AddAssetResponse extends BaseResponse {
  asset: Asset;
}
export interface EditAssetResponse extends AddAssetResponse {}
export interface DeleteAssetResponse extends AddAssetResponse {}
export interface AssetResponse extends BaseResponse {
  results: Asset[];
}
