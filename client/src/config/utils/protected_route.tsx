import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../constants/token-constants";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../utils/custom-hook";
import { getCurrentUserRequest } from "../../store/user/user-slice";
import { useUser } from "../../hooks/user-hook";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
function ProtectedRoute({ children }: ProtectedRouteProps) {
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
    if (!token) {
      setIsAuthorized(false);
      return;
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
    return <div>Loading...</div>;
  } else {
    console.log(user);
  }
  return isAuthorized ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
