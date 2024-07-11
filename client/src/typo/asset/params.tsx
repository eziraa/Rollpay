export interface AddAssetParams {
  asset_name: string;
  asset_value: File;
  employee_id: string;
}
export interface EditAssetParams extends AddAssetParams {
  id: string;
}
