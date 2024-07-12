import * as Yup from "yup";

export const AddAssetSchema = Yup.object({
  asset_name: Yup.string()
    .min(3, "File name should be atleast 3 characters")
    .required("Please Enter allowance name"),
  asset_value: Yup.mixed().required("Please select file"),
});
