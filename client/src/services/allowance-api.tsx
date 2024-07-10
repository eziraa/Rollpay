import { AxiosError } from "axios";
import api from "../config/api";
import {
  AddAllowanceParams,
  EditAllowanceParams,
} from "../typo/allowance/params";
import { AddAllowanceResponse, Allowance } from "../typo/allowance/response";
export interface PaginatedBackEndResponse {
  count: number;
  results: Allowance[];
  next: string | null;
  previous: string | null;
  status: number;
}
const addAllowance = async (values: AddAllowanceParams) => {
  const response = await api
    .post("/allowance/add", values)
    .then((res) => {
      return {
        success: "Allowance added successfully",
        code: res.status,
        allowance: res.data,
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

const listAllowances = async (pageUrl?: string) => {
  const endpoint = pageUrl || "/allowance/list";

  const allowances = await api
    .get<PaginatedBackEndResponse>(endpoint)
    .then((res) => {
      return {
        results: res.data.results,
        pagination: {
          next: res.data.next,
          previous: res.data.previous,
          count: res.data.count,
        },
        code: res.status,
        success: "Success returned allowances",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return allowances;
};

const getAllowance = async (allowance_id: string) => {
  const endpoint = "/allowance/get/" + allowance_id;

  const allowance = await api
    .get(endpoint)
    .then((res) => {
      return {
        allowance: res.data,
        code: res.status,
        success: "Success returned allowances",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return allowance;
};

const editAllowance = async (
  allowance_id: string,
  values: EditAllowanceParams
) => {
  const response = await api
    .put<AddAllowanceResponse[]>("/allowance/edit/" + allowance_id, values)
    .then((res) => {
      return {
        success: "Allowance updated successfully",
        code: res.status,
        allowance: res.data,
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

const closeAllowance = async (allowance_id: string) => {
  const response = await api
    .put("/allowance/close/" + allowance_id)
    .then((res) => {
      return {
        success: "Allowance close successfully",
        code: res.status,
        allowance: res.data,
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

const deleteAllowance = async (empployee_id: string) => {
  const response = await api
    .delete("/allowance/delete/" + empployee_id)
    .then((res) => {
      return {
        success: "Allowance deleted successfully",
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

const AllowanceAPI = {
  listAllowances,
  editAllowance,
  deleteAllowance,
  addAllowance,
  getAllowance,

  closeAllowance,
};

export default AllowanceAPI;
