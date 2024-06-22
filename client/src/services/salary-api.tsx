import { AxiosError } from "axios";
import api from "../config/api";
import { EmpResponse } from "../typo/employee/response";
import { SearchParams } from "../typo/salary/params";
const listEmployeeSalary = async () => {
  const employees = await api
    .get<EmpResponse>("/employee/salary/get")
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

const searchEmployeeSalary = async (search_parms: SearchParams) => {
  const employees = await api
    .get<EmpResponse>(
      "/employee/salary/get" +
        `?search_by=${search_parms.search_by}&search_value=${search_parms.search_value}`
    )
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

const SalaryAPI = {
  listEmployeeSalary,
  searchEmployeeSalary,
};
export default SalaryAPI;
