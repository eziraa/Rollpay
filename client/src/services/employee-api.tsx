import axios from "axios";
import { AddEmpParams } from "../typo/employee/params";
import api from "../config/api";
import { EmployeeResponse } from "../typo/employee/response";

const addEmp = async (values: AddEmpParams) => {
  const employee = await axios
    .post<EmployeeResponse>(api + "/employee/add", values)
    .then((res) => res.data);
  return employee;
};

const EmployeeAPI = {
  addEmp,
};

export default EmployeeAPI;
