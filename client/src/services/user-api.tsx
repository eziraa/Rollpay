/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unsafe-optional-chaining */
import { AxiosError } from "axios";
import { LoginParams, SignUpParams } from "../typo/user/params";
import api from "../config/api";
import { SignUpResponse } from "../typo/user/response";
import {
  ACCESS_TOKEN,
  CURRENT_USER,
  REFRESH_TOKEN,
} from "../constants/token-constants";

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
  const { username, password } = values;
  const response = await api
    .post("/user/login/", {
      username,
      password,
    })
    .then((res) => {
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      localStorage.setItem(CURRENT_USER, JSON.stringify(res.data.employee));
      console.log(res);
      return {
        employee: res.data.employee,
        success: "User Logged in successfully",
        code: res.status,
      };
    })
    .catch((err: AxiosError) => {
      const code = err.response?.status;
      let { error } = err.response?.data as { error: string };
      if (!error) {
        if (code == 401)
          error = "Invalid Credintials Please check your password or username";
        if (code == 404)
          error = "Invalid Credintials Please check your password or username";
      }
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });
  return response;
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
