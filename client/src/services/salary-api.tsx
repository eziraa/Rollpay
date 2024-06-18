import { AxiosError } from "axios";
import api from "../config/api";
import { EmpResponse } from "../typo/employee/response";
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

const SalaryAPI = {
  listEmployeeSalary,
};
export default SalaryAPI;
