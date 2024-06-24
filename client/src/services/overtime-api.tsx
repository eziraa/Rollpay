import { AxiosError } from "axios";
import api from "../config/api";
import { AddOvertimeParams, EditOvertimeParams } from "../typo/overtime/params";
import { AddOvertimeResponse, Overtime } from "../typo/overtime/response";
export interface PaginatedBackEndResponse {
  count: number;
  results: Overtime[];
  next: string | null;
  previous: string | null;
  status: number;
}
const addOvertime = async (values: AddOvertimeParams) => {
  const response = await api
    .post("/employee/overtime/add", values)
    .then((res) => {
      return {
        success: "Overtime added successfully",
        code: res.status,
        overtime: res.data,
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
