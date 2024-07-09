import { jwtDecode } from "jwt-decode";
import api from "../api";
import {
  REFRESH_TOKEN,
  ACCESS_TOKEN,
  LOGGED_IN_USERS,
} from "../../constants/token-constants";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../utils/custom-hook";
import { getCurrentUserRequest } from "../../store/user/user-slice";
import { useUser } from "../../hooks/user-hook";
import { ClerkRouterConfig } from "../router/clerk-router";
import { UserRouterConfig } from "../router/user-router";
import AccessDenied from "../../components/pages/access-denied/access-denied";
import { Route } from "react-router-dom";

function ProtectedRoute() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const dispatcher = useAppDispatch();
  const { user } = useUser();

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        let logged_in_users = JSON.parse(
          localStorage.getItem(LOGGED_IN_USERS) || "[]"
        );

        logged_in_users = [
          ...logged_in_users,
          {
            username: res.data.username,
            access_token: res.data.access,
            refresh_token: res.data.refresh,
          },
        ];
        localStorage.setItem(ACCESS_TOKEN, logged_in_users);
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

    if (!token) {
      setIsAuthorized(false);
      return <Route path="/access-denied" element={<AccessDenied />} />;
    }
    const decoded: {
      exp: number;
      user_id: string;
    } = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpiration)
      if (tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
        dispatcher(getCurrentUserRequest(decoded.user_id));
      }
  };

  if (!isAuthorized) {
    return <Route path="/access-denied" element={<AccessDenied />} />;
  }

  return user?.role === "Clerk" ? ClerkRouterConfig() : UserRouterConfig();
}

export default ProtectedRoute;
