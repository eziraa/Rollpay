import { AxiosError } from "axios";
import api from "../config/api";
import {
  AddDeductionParams,
  EditDeductionParams,
} from "../typo/deduction/params";
import { AddDeductionResponse, Deduction } from "../typo/deduction/response";
export interface PaginatedBackEndResponse {
  count: number;
  results: Deduction[];
  next: string | null;
  previous: string | null;
  status: number;
}
const addDeduction = async (values: AddDeductionParams) => {
  const response = await api
    .post("/deduction/add", values)
    .then((res) => {
      return {
        success: "Deduction added successfully",
        code: res.status,
        deduction: res.data,
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

const listDeductions = async (pageUrl?: string) => {
  const endpoint = pageUrl || "/deduction/list";

  const deds = await api
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
        success: "Successfully returned deductions",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return deds;
};

const getDeduction = async (deduction_id: string) => {
  const endpoint = "/deduction/get/" + deduction_id;

  const deduction = await api
    .get(endpoint)
    .then((res) => {
      return {
        deduction: res.data,
        code: res.status,
        success: "Successfully returned deductions",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return deduction;
};

const editDeduction = async (
  deduction_id: string,
  values: EditDeductionParams
) => {
  const response = await api
    .put<AddDeductionResponse[]>("/deduction/edit/" + deduction_id, values)
    .then((res) => {
      return {
        success: "Deduction updated successfully",
        code: res.status,
        deduction: res.data,
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

const openDeduction = async (deduction_id: string) => {
  const response = await api
    .patch("/deduction/open/" + deduction_id)
    .then((res) => {
      return {
        success: "Deduction opened successfully",
        code: res.status,
        deduction: res.data,
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

const deleteDeduction = async (empployee_id: string) => {
  const response = await api
    .delete("/deduction/delete/" + empployee_id)
    .then((res) => {
      return {
        success: "Deduction deleted successfully",
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

const DeductionAPI = {
  listDeductions,
  editDeduction,
  deleteDeduction,
  addDeduction,
  getDeduction,
  openDeduction
};

export default DeductionAPI;
