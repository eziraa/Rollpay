import axios, { AxiosError } from "axios";
import { AddEmpParams } from "../typo/employee/params";
import api from "../config/api";
import { AddEmpResponse, EmployeeResponse } from "../typo/employee/response";

const addEmp = async (values: AddEmpParams) => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Token ${token}`; // Set default header
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
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Token ${token}`; // Set default header
  const employees = await api
    .get<EmployeeResponse[]>("/employee/list")
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
  return employees;
};

const EmployeeAPI = {
  addEmp,
  listEmployee,
};

export default EmployeeAPI;
