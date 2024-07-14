/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unsafe-optional-chaining */
import { AxiosError } from "axios";
import { LoginParams, SignUpParams } from "../typo/user/params";
import api from "../config/api";
import { SignUpResponse, UserResponse } from "../typo/user/response";
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

      return {
        data: {
          employee: res.data.employee,
          username: res.data.username,
          role: res.data.role[0],
          user_id: res.data.user_id[0],
          employeeId: res.data.employee_id[0],
          profile_picture: res.data.profile_picture[0],
        } as UserResponse,
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

  const updateProfile = async (employee_id: string, formData: FormData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await api
      .put(`/user/profile/${employee_id}`, formData, config)
      .then((response) => {
        return response.data.profile_picture;
      })
      .catch((error) => {
        return error.message;
      });

    return response;
  };

  const getCurrentUser = async (employee_id: string) => {
    const response = api
      .get("/user/current-user/" + employee_id)
      .then((res) => {
        return {
          employee: { ...res.data },
          success: " success",
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
    getCurrentUser,
    updateProfile,
  };

export default UserAPI;
