/* eslint-disable no-unsafe-optional-chaining */
import axios, { AxiosError } from "axios";
import { LoginParams, SignUpParams } from "../typo/user/params";
import api from "../config/router/api";
import { SignUpResponse } from "../typo/user/response";
const signUp = async (values: SignUpParams) => {
  const response = await axios
    .post<SignUpResponse>(api + "/user/register", values)
    .then((res) => {
      return {
        success: "User sign up successfully",
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
  const response = await axios
    .post(api + "/user/login", values)
    .then((res) => {
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log(res.data);
      return {
        success: "User Logged in successfully",
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



const UserAPI = {
  signUp,
  login,
};

export default UserAPI;
