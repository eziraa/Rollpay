/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth-context";
import { UserResponse } from "../typo/user/response";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/token-constants";
import api from "../config/api";
import { jwtDecode } from "jwt-decode";
import GLOBAL_URLS from "../config/global_urls";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [curr_user, setCurrUser] = useState<UserResponse>({
    user_id: "",
    username: "",
    employeeId: "",
    profile_picture: "",
    role: "",
    employee: {
      id: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      gender: "",
      date_of_birth: "",
      date_of_hire: "",
      position: "",
      salary: 0,
      profile_picture: "",
      employement_contract: "",
      role: "",
    },
  });

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      await api
        .post("/token/refresh/", {
          refresh: refreshToken,
        })
        .then((response) => {
          localStorage.setItem(ACCESS_TOKEN, response.data.access);
          localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
          api
            .get("/user/current-user")
            .then((res) => {
              setCurrUser(res.data);
              setIsAuthenticated(true);
            })
            .catch((err) => {
              const { error } = err.response?.data as { error: string };
              return {
                error: error,
                code: err.response?.status,
              } as { error: string; code: number };
            });
        });
    } catch (error) {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      setIsAuthenticated(false);
    }
  };

  const auth = async () => {
    const pathname = window.location.pathname;
    if (pathname.includes("confirm-registration")) {
      return;
    }
    const token = localStorage.getItem(ACCESS_TOKEN);
    let decoded: {
      exp: number;
      user_id: string;
    };
    if (!token) {
      setIsAuthenticated(false);
      if (!GLOBAL_URLS.includes(window.location.pathname)) {
        // window.location.href = "/login";
      }
    } else {
      decoded = await jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;
      if (tokenExpiration)
        if (tokenExpiration < now) {
          await refreshToken();
        } else {
          await api
            .get("/user/current-user")
            .then((res) => {
              setCurrUser(res.data);
              setIsAuthenticated(true);
            })
            .catch((err) => {
              const { error } = err.response?.data as { error: string };
              return {
                error: error,
                code: err.response?.status,
              } as { error: string; code: number };
            });
        }
      else {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setIsAuthenticated(false);
      }
    }
  };
  useEffect(() => {
    auth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        curr_user,
        setCurrUser,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
