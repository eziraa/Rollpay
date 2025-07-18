import { useEffect, useMemo, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { MainPage } from "./components/pages/main/main";
import { LoginPage } from "./components/pages/login/login";
import { protectedRoute } from "./config/utils/protected_route";
import SignUp from "./components/pages/sign-up/sign-up";
import ConfirmRegistration from "./components/pages/sign-up/confirm-registration";
import RequestPasswordReset from "./components/pages/change-password/request-password-reset";
import NotFoundPage from "./components/pages/4_0_4/404";
import AccessDenied from "./components/pages/access-denied/access-denied";
import api from "./config/api";
import { ACCESS_TOKEN } from "./constants/token-constants";
import RequestOTP from "./components/pages/otp/request-otp";
import ResetPassword from "./components/pages/forgot_password/reset-password";
import ChangePassword from "./components/pages/change-password/change-password";

const AppRouter = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const getUserRole = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) return;

      try {
        const res = await api.get("/user/current-user");
        setUserRole(res.data.role);
      } catch (err: any) {
        console.error("Failed to fetch user role", err);
      }
    };

    getUserRole();
  }, []);

  const router = useMemo(() => {
    const isLoggedIn = localStorage.getItem(ACCESS_TOKEN);
    if (!userRole && isLoggedIn) return null;

    return createBrowserRouter(
      [
        {
          path: "/",
          element: <MainPage />,
          children: [
            ...protectedRoute(userRole ?? ""),
            { path: "/change-password", element: <RequestPasswordReset /> },
            {
              path: "/password-reset-confirm/:uidb64/:token",
              element: <ChangePassword />,
            },
            { path: "/forgot-password", element: <RequestOTP /> },
            { path: "/reset-password", element: <ResetPassword /> },
          ],
        },
        { path: "/login", element: <LoginPage /> },
        { path: "/sign-up", element: <SignUp /> },
        { path: "/404", element: <NotFoundPage /> },
        { path: "/access-denied", element: <AccessDenied /> },
        {
          path: "/confirm-registration/:uid/:token",
          element: <ConfirmRegistration />,
        },
        { path: "*", element: <Navigate to="404" /> },
      ],
      {
        future: {
          v7_startTransition: true, // ✅ silences React Router v7 warning
        } as any,
      }
    );
  }, [userRole]);

  if (!router) {
    return (
      <div
        className="flex-col backdrop-blur-md h-full space-y-3 animate-pulse w-full p-7"
        style={{
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* Skeleton Loader UI */}
        {/* (you can keep this unchanged or shorten it if you want) */}
        <div className="h-6 w-36 bg-slate-300 mb-2"></div>
        <div className="h-6 w-52 bg-slate-300 mb-2"></div>
        <div className="h-6 w-52 bg-slate-300"></div>
      </div>
    );
  }

  return <RouterProvider future={{v7_startTransition:true}} router={router} />;
};

export default AppRouter;
