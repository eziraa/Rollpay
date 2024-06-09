import axios from "axios";
import { SignUpParams } from "../typo/user/params";
import { UserResponse } from "../typo/user/response";
import api from "../config/router/api";

const signUp = async (values: SignUpParams) => {
  const employee = await axios
    .post<UserResponse>(api + "/user/register", values)
    .then((res) => res.data);
  return employee;
};

const UserAPI = {
  signUp,
};

export default UserAPI;
