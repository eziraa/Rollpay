/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unsafe-optional-chaining */
import { AxiosError } from "axios";
import { LoginParams, SignUpParams } from "../typo/user/params";
import api from "../config/api";
import { SignUpResponse } from "../typo/user/response";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/token-constants";

const signUp = async (values: SignUpParams) => {
  const response = await api
    .post<SignUpResponse>("/user/register", values)
    .then((res) => {
      return {
        success: "Account created successfully",
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

const login = async (values: LoginParams) => {
  try {
    const { username, password } = values;
    const response = await api.post("/user/login/", {
      username,
      password,
    });
    localStorage.setItem(ACCESS_TOKEN, response.data.access);
    localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
    return {
      employee: response.data.employee,
      success: "User Logged in successfully",
      code: response.status,
    };
  } catch (err) {
    console.log(err);
  }
};

const logout = async () => {
  const response = await api
    .get("/user/logout")
    .then((res) => {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      return {
        success: "User logged out successfully",
        code: res.status,
      };
    })
    .catch((err) => {
      console.log(err);
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });
  return response;
};

const UserAPI = {
  signUp,
  login,
  logout,
};

export default UserAPI;
