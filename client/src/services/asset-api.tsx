import { AxiosError } from "axios";
import api from "../config/api";

const addEmpAsset = async (employee_id: string, formData: FormData) => {
  const response = await api
    .post("/asset/" + employee_id + "/add", formData)
    .then((res) => {
      return {
        success: "Asset added successfully",
        code: res.status,
        asset: res.data,
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });
  return response;
};

const listAssets = async (employee_id: string) => {
  const endpoint = "/asset/" + employee_id;

  const assets = await api
    .get(endpoint)
    .then((res) => {
      return {
        results: res.data,
        code: res.status,
        success: "Successfully returned assets",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return assets;
};

const getAsset = async (asset_id: string) => {
  const endpoint = "/asset/" + asset_id;

  const asset = await api
    .get(endpoint)
    .then((res) => {
      return {
        asset: res.data,
        code: res.status,
        success: "Successfully returned assets",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return asset;
};

const deleteAsset = async (asset_id: string) => {
  const response = await api
    .delete("/asset/delete/" + asset_id)
    .then((res) => {
      return {
        success: "Asset deleted successfully",
        code: res.status,
        data: res.data,
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });
  return response;
};

const AssetAPI = {
  listAssets,
  deleteAsset,
  addEmpAsset,
  getAsset,
};

export default AssetAPI;
