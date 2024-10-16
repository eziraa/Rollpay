export interface AddAssetParams {
  employee_id: string;
  formData: FormData;
}
export interface EditAssetParams extends AddAssetParams {
  id: string;
}
