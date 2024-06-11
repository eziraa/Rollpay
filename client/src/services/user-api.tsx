/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unsafe-optional-chaining */
import axios, { AxiosError } from "axios";
import { LoginParams, SignUpParams } from "../typo/user/params";
import { API } from "../config/api";
import { SignUpResponse } from "../typo/user/response";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "accessToken"
)}`;
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(API + "/refresh-token", {
            refreshToken,
          });
          const { accessToken } = response.data;
          localStorage.setItem("accessToken", accessToken);
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (error) {
          console.error("Token refresh failed", error);
        }
      }
    }
    return Promise.reject(error);
  }
);
const signUp = async (values: SignUpParams) => {
  const response = await axios
    .post<SignUpResponse>(API + "/user/register", values)
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
  const response = await axios
    .post(API + "/user/login", values)
    .then((res) => {
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
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

const logout = async () => {
  const response = await axios
    .post(API + "/user/logout") // Added an empty body `{}` and `{ withCredentials: true }`
    .then((res) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
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
