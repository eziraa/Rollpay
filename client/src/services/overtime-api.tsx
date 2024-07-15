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
    .post("/overtime/add", values)
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

const listOvertimes = async (pageUrl?: string) => {
  const endpoint = pageUrl || "/overtime/list";

  const overtimes = await api
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
        success: "Success returned overtimes",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return overtimes;
};

const getOvertime = async (overtime_id: string) => {
  const endpoint = "/overtime/get/" + overtime_id;

  const overtime = await api
    .get(endpoint)
    .then((res) => {
      return {
        overtime: res.data,
        code: res.status,
        success: "Successfully returned overtimes",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return overtime;
};

const editOvertime = async (
  overtime_id: string,
  values: EditOvertimeParams
) => {
  const response = await api
    .put<AddOvertimeResponse[]>("/overtime/edit/" + overtime_id, values)
    .then((res) => {
      return {
        success: "Overtime updated successfully",
        code: res.status,
        overtime: res.data,
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

const deleteOvertime = async (empployee_id: string) => {
  const response = await api
    .delete("/overtime/delete/" + empployee_id)
    .then((res) => {
      return {
        success: "Overtime deleted successfully",
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

const OvertimeAPI = {
  listOvertimes,
  editOvertime,
  deleteOvertime,
  addOvertime,
  getOvertime
};

export default OvertimeAPI;
