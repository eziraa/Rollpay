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
