import { AxiosError } from "axios";
import {
  AddAllowanceToEmployeesParams,
  AddDeductionToEmployeesParams,
  AddEmpParams,
  AddSalaryParams,
  UpdateProfileParams,
} from "../typo/employee/params";
import api from "../config/api";
import {
  AddEmpResponse,
  EmpResponse,
  Employee,
  Profile,
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
  const endpoint = pageUrl || "/employee/list";

  const employees = await api
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

const addAllowance = async (values: AddAllowanceToEmployeesParams) => {
  const employees = await api
    .patch<EmpResponse>(
      "/employee/allowance/add/" +
        values.employee_id +
        "/" +
        values.allowance_type
    )
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
  return employees;
};

const addDeduction = async (values: AddDeductionToEmployeesParams) => {
  const employees = await api
    .patch<EmpResponse>(
      "/employee/deduction/add/" +
        values.employee_id +
        "/" +
        values.deduction_type
    )
    .then((res) => {
      console.log(res);
      return {
        employee: res.data,
        code: res.status,
        success: "Success returned employees",
      };
    })
    .catch((err: AxiosError) => {
      console.log(err);
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
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

const updatProfilePicture = async (values: UpdateProfileParams) => {
  console.log("from api", values.profile_url);
  const response = await api
    .put<Profile>("/user/profile/" + values.employee_id, values.profile_url, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return {
        success: "Profile picture updated successfully",
        code: res.status,
        profile: res.data,
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

const getProfilePicture = async (employee_id: string) => {
  const response = await api
    .get<Profile>("/user/profile" + employee_id)
    .then((res) => {
      return {
        profile: res.data,
        code: res.status,
        success: "Successfully returned profile picture",
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
  addAllowance,
  addDeduction,
  updatProfilePicture,
  getProfilePicture,
};

export default EmployeeAPI;
