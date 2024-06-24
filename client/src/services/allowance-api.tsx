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
    .post("/employee/allowance/add", values)
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
