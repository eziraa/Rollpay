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
    .post("/employee/deduction/add", values)
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
  const endpoint = pageUrl || "/employee/deduction/list";

  const deductions = await api
    .get<PaginatedBackEndResponse>(endpoint)
    .then((res) => {
      console.log(res);
      return {
        results: res.data,
        pagination: {
          next: res.data.next,
          previous: res.data.previous,
          count: res.data.count,
        },
        code: res.status,
        success: "Success returned deductions",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return deductions;
};

const editDeduction = async (
  deduction_id: string,
  values: EditDeductionParams
) => {
  const response = await api
    .put<AddDeductionResponse[]>("/employee/edit/" + deduction_id, values)
    .then((res) => {
      return {
        success: "Deduction updated successfully",
        code: res.status,
        employee: res.data,
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
