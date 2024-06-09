/* eslint-disable no-unsafe-optional-chaining */
import axios, { AxiosError } from "axios";
import { SignUpParams } from "../typo/user/params";
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

const UserAPI = {
  signUp,
};

export default UserAPI;
