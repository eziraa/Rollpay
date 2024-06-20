import { AxiosError } from "axios";
import { AddEmpParams, AddSalaryParams } from "../typo/employee/params";
import api from "../config/api";
import {
  AddEmpResponse,
  EmpResponse,
  Employee,
} from "../typo/employee/response";

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
export interface Pagination {
  next: string | undefined;
  previous: string | undefined;
  count: number;
  page_size: number;
  current_page: number;
  number_of_pages: number;
}

export interface PaginatedEmpResponse extends EmpResponse {
  count: number;
  results: Employee[];
  pagination: Pagination;
}

export interface PaginatedBackEndResponse {
  count: number;
  results: Employee[];
  next: string | null;
  previous: string | null;
  status: number;
}

const listEmployee = async (pageUrl?: string) => {
  // Use the provided page URL or default to the initial list endpoint
  const endpoint = pageUrl || "/employee/list";

  const employees = await api
    .get<PaginatedBackEndResponse>(endpoint)
    .then((res) => {
      return {
        results: res.data.results,
        pagination: {
          next: res.data.next, // Assuming 'next' is part of your response
          previous: res.data.previous,
          count: res.data.count, // Assuming 'previous' is part of your response
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

const addSalary = async (values: AddSalaryParams) => {
  const employees = await api
    .post<EmpResponse>("/employee/salary/add/" + values.empID, values)
    .then((res) => {
      return res.data;
    });
  return employees;
};

export interface EditEmployeeParams extends AddEmpParams {
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

const deleteEmployee = async (empployee_id: string) => {
  const response = await api
    .delete<EmpResponse>("/employee/delete/" + empployee_id)
    .then((res) => {
      return {
        success: "Employee deleted successfully",
        code: res.status,
        data: res.data,
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
  deleteEmployee,
};

export default EmployeeAPI;
