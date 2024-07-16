import { AxiosError } from "axios";
import api from "../config/api";
import { SearchParams } from "../typo/salary/params";
import { BaseResponse } from "../typo/utils/response";
import { PaginatedPayBackEndResponse } from "../typo/salary/response";
const listEmployeeSalary = async (pageUrl?: string) => {
  const endpoint = pageUrl || "/employee/salary/get";
  const employees = await api
    .get<PaginatedPayBackEndResponse>(endpoint)
    .then((res) => {
      console.log(res.data);
      return {
        results: res.data.results,
        pagination: {
          next: res.data.next,
          previous: res.data.previous,
          count: res.data.count,
        },
        code: res.status,
        success: "Success returned employees",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });
  return employees;
};

const searchEmployeeSalary = async (search_parms: SearchParams) => {
  let endpoint = "/employee/salary/get";
  if (
    search_parms.search_by.trim().length > 0 &&
    search_parms.search_value.trim().length > 0
  )
    endpoint += `?search_by=${search_parms.search_by}&search_value=${search_parms.search_value}`;
  const employees = await api
    .get<BaseResponse>(endpoint)
    .then((res) => {
      return {
        employees: res.data,
        code: res.status,
        success: "Success returned employees",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });
  return employees;
};

const getEmployeeSalary = async (pageUrl: string) => {
  const response = await api
    .get(`/employee/salary/get/${pageUrl}`)
    .then((res) => {
      return {
        employee: res.data,
        code: res.status,
        success: "Success returned employees",
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


const raiseSalary = async (value: number) => {
  const response = await api
    .post(`/employee/salary/raise/${value}`)
    .then((res) => {
      return {
        employees: res.data,
        code: res.status,
        success: "Success returned employees",
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

const SalaryAPI = {
  listEmployeeSalary,
  searchEmployeeSalary,
  getEmployeeSalary,
  raiseSalary,
};
export default SalaryAPI;
