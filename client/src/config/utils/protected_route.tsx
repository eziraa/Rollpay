/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../constants/token-constants";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../utils/custom-hook";
import { getCurrentUserRequest } from "../../store/user/user-slice";
import { useUser } from "../../hooks/user-hook";
import { ClerkRouterConfig } from "../router/clerk-router";
import { UserRouterConfig } from "../router/user-router";
import { Navigate, Route } from "react-router-dom";
import { AdminRouterConfig } from "../router/admin-router";

function ProtectedRoute() {
  const [isAuthorised, setIsAuthorized] = useState(false);
  const dispatcher = useAppDispatch();
  const { user } = useUser();
  const path = window.location.pathname;
  useEffect(() => {
    auth().catch(() => {
      setIsAuthorized(false);
    });
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    let decoded: {
      exp: number;
      user_id: string;
    };
    if (!token) {
      setIsAuthorized(false);
      return <Route path={path} element={<Navigate to="/login" replace />} />;
    } else {
      decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;
      if (tokenExpiration)
        if (tokenExpiration < now) {
          await refreshToken();
        } else {
          setIsAuthorized(true);
          dispatcher(getCurrentUserRequest(decoded.user_id));
        }
    }
  };
  if (isAuthorised) {
    return user?.role === "Clerk"
      ? ClerkRouterConfig()
      : user?.role === "sys_admin"
      ? AdminRouterConfig()
      : user?.role === "user"
      ? UserRouterConfig("")
      : undefined;
  } else {
    return;
  }
}

export default ProtectedRoute;
