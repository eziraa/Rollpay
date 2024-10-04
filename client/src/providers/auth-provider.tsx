import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth-context";
import { UserResponse } from "../typo/user/response";
import { useAppDispatch } from "../utils/custom-hook";
import { useUser } from "../hooks/user-hook";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/token-constants";
import api from "../config/api";
import { jwtDecode } from "jwt-decode";
import { getCurrentUserRequest } from "../store/user/user-slice";
import { protectedRoute } from "../config/utils/protected_route";
import { RouteObject } from "react-router-dom";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [routers, setRouters] = useState<RouteObject[]>([]);
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
  const dispatcher = useAppDispatch();
  const user = useUser();

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    let decoded: {
      exp: number;
      user_id: string;
    };
    if (!token) {
      setIsAuthenticated(false);
    } else {
      decoded = await jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;
      if (tokenExpiration)
        if (tokenExpiration < now) {
          await refreshToken();
        } else {
          setIsAuthenticated(true);
          dispatcher(getCurrentUserRequest(decoded.user_id));
        }
    }
    return user;
  };
  useEffect(() => {
    auth();
  }, []);

  useEffect(() => {
    if (user.user) {
      setCurrUser(user.user);
      setRouters(protectedRoute(user.user.role));
    }
  }, [user.user]);

  return (
    <AuthContext.Provider
      value={{
        curr_user,
        setCurrUser,
        isAuthenticated,
        setIsAuthenticated,
        routers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
