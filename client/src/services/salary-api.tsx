import { AxiosError } from "axios";
import api from "../config/api";
import { EmpResponse } from "../typo/employee/response";
import { SearchParams } from "../typo/salary/params";
const listEmployeeSalary = async () => {
  const employees = await api
    .get("/employee/salary/get")
    .then((res) => {
      return {
        employees: res.data.results,
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
    .get<EmpResponse>(endpoint)
    .then((res) => {
      console.log(res);
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
