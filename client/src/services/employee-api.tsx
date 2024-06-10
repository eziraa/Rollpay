import axios, { AxiosError } from "axios";
import { AddEmpParams } from "../typo/employee/params";
import api from "../config/api";
import { AddEmpResponse } from "../typo/employee/response";

const addEmp = async (values: AddEmpParams) => {
  const response = await axios
    .post<AddEmpResponse>(api + "/employee/add", values)
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

const EmployeeAPI = {
  addEmp,
};

export default EmployeeAPI;
