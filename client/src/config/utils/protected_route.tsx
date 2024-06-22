import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import {
  REFRESH_TOKEN,
  ACCESS_TOKEN,
  CURRENT_USER,
} from "../../constants/token-constants";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth-context";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { setCurrUser } = useAuth();

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
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
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
    const current_user = localStorage.getItem(CURRENT_USER);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpiration)
      if (tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
        setCurrUser(JSON.parse(current_user || ""));
      }
  };

  if (!isAuthorized) {
    return <div>Loading...</div>;
  }
  return isAuthorized ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
