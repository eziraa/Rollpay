import { AxiosError } from "axios";
import api from "../config/api";
import { AddAssetParams, EditAssetParams } from "../typo/asset/params";
import { AddAssetResponse, AssetResponse } from "../typo/asset/response";

const addEmpAsset = async (values: AddAssetParams) => {
  const response = await api
    .post("/asset/" + values.employee_id + "/add", values)
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

const listAssets = async () => {
  const endpoint = "/asset/list";

  const assets = await api
    .get<AssetResponse>(endpoint)
    .then((res) => {
      return {
        results: res.data.results,
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

const editAsset = async (asset_id: string, values: EditAssetParams) => {
  const response = await api
    .put<AddAssetResponse[]>("/asset/" + asset_id, values)
    .then((res) => {
      return {
        success: "Asset updated successfully",
        code: res.status,
        asset: res.data,
      };
    })
    .catch((err: AxiosError) => {
      for (const value of Object.values(
        (err.response?.data as { [key: string]: unknown }) || {}
      ))
        return {
          error: value,
          code: err.response?.status,
        } as { error: string; code: number };
    });
  return response;
};

const deleteAsset = async (asset_id: string) => {
  const response = await api
    .delete("/asset/" + asset_id)
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
  editAsset,
  deleteAsset,
  addEmpAsset,
  getAsset,
};

export default AssetAPI;
