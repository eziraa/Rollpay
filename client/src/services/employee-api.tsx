import { AxiosError } from "axios";
import { AddEmpParams, AddSalaryParams } from "../typo/employee/params";
import api from "../config/api";
import { AddEmpResponse, EmployeeResponse } from "../typo/employee/response";

const addEmp = async (values: AddEmpParams) => {
  const response = await api
    .post<AddEmpResponse>("/employee/add", values)
    .then((res) => {
      return {
        success: "Employee added successfully",
        code: res.status,
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

const listEmployee = async () => {
  const employees = await api
    .get<EmployeeResponse[]>("/employee/list")
    .then((res) => {
      return res.data;
    });
  return employees;
};

const addSalary = async (values: AddSalaryParams) => {
  const employees = await api
    .post<EmployeeResponse[]>("/employee/salary/add/" + values.empID, values)
    .then((res) => {
      return res.data;
    });
  return employees;
};

export interface EditEmployeeParams extends AddEmpParams {
  salary: string;
  id: string | undefined;
}

const editEmployee = async (
  empployee_id: string,
  values: EditEmployeeParams
) => {
  const response = await api
    .put<AddEmpResponse[]>("/employee/edit/" + empployee_id, values)
    .then((res) => {
      return {
        success: "Employee updated successfully",
        code: res.status,
        employee: res.data,
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

const EmployeeAPI = {
  addEmp,
  listEmployee,
  addSalary,
  editEmployee,
};

export default EmployeeAPI;
