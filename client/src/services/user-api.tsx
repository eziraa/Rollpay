/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unsafe-optional-chaining */
import axios, { AxiosError } from "axios";
import { LoginParams, SignUpParams } from "../typo/user/params";
import { API } from "../config/api";
import { SignUpResponse } from "../typo/user/response";
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
  try {
    const { username, password } = values;
    const response = await axios.post("http://localhost:8000/user/login/", {
      username,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    console.log(token); // Save the token locally
    axios.defaults.headers.common["Authorization"] = `Token ${token}`; // Set default header
    console.log("Login successful");
    return {
      success: "User Logged in successfully",
      code: response.status,
    };
  } catch (err) {
    console.log(err);
  }
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
