import { useMemo } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
      const TOKEN = localStorage.getItem(ACCESS_TOKEN);
      if (!TOKEN) {
        return;
      }
      await api
        .get("/user/current-user")
        .then((res) => {
          setUserRole(res.data.role);
        })
        .catch((err) => {
          const { error } = err.response?.data as { error: string };
          return {
            error: error,
            code: err.response?.status,
          } as { error: string; code: number };
        });
    };

    getUserRole();
  }, []);

  const router = useMemo(() => {
    const isLoggedIn = localStorage.getItem(ACCESS_TOKEN);
    if (!userRole && isLoggedIn) return null; // Avoid creating routes if role is not set

    return createBrowserRouter([
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
          {
            path: "/forgot-password",
            element: <RequestOTP />,
          },
          {
            path: "/reset-password",
            element: <ResetPassword />,
          },
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
    ]);
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
        <div className="flex h-32 w-full align-middle">
          <div className="flex justify-between w-full align-middle bg-slate-100 ">
            <div className="flex-col space-y-3  h-20 w-48 p-4 align-middle justify-end  ">
              <div className="h-6 w-36 bg-slate-300 "></div>
              <div className="h-6 w-52 bg-slate-300 "></div>
              <div className="h-6 w-52 bg-slate-300 "></div>
            </div>
            <div className="p-3 pl-6 flex align-middle justify-center  border-red-500 border-spacing-4 space-x-3">
              <div className="p-3 w-28 h-28 rounded-full bg-slate-300 "></div>
              <div className="flex-col space-y-3 h-28 w-48 p-4">
                <div className="h-7 w-36 bg-slate-300 "></div>
                <div className="h-7 w-36 bg-slate-300 "></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 space-x-4  py-3  w-full">
          <div className="flex-col w-2/12 pt-10 px-7 bg-slate-100 space-y-4 drop-shadow-md  shadow-green-400 h-full align-middle justify-start">
            <div className="w-full flex  h-12 space-x-7">
              <div className="h-full w-12 bg-slate-300/70"></div>
              <div className="bg-slate-300/70 h-full flex-1"></div>
            </div>
            <div className="w-full flex  h-12 space-x-7">
              <div className="h-full w-12 bg-slate-300/70"></div>
              <div className="bg-slate-300/70 h-full flex-1"></div>
            </div>
            <div className="w-full flex  h-12 space-x-7">
              <div className="h-full w-12 bg-slate-300/70"></div>
              <div className="bg-slate-300/70 h-full flex-1"></div>
            </div>
            <div className="w-full flex  h-12 space-x-7">
              <div className="h-full w-12 bg-slate-300/70"></div>
              <div className="bg-slate-300/70 h-full flex-1"></div>
            </div>
            <div className="w-full flex  h-12 space-x-7">
              <div className="h-full w-12 bg-slate-300/70"></div>
              <div className="bg-slate-300/70 h-full flex-1"></div>
            </div>
          </div>
          <div className="w-10/12 p-5 flex-col space-y-4 bg-slate-100 h-full">
            <div className="flex items-center justify-between bg-slate-50 w-full h-1/6">
              <div className="flex-col space-y-3 h-fit w-fit p-4 align-middle justify-end  ">
                <div className="h-6 w-36 bg-slate-300 "></div>
                <div className="h-6 w-52 bg-slate-300 "></div>
                <div className="h-6 w-52 bg-slate-300 "></div>
              </div>
              <div className="flex-col space-y-3   h-20 w-48 p-4 align-middle justify-center  ">
                <div className="h-6 w-full bg-slate-300 "></div>
                <div className="h-6 w-full bg-slate-300 "></div>
              </div>
            </div>
            <div className="w-full h-5/6 flex space-x-6 bg-slate-50 p-7">
              <div className="flex-col h-full w-8/12 space-y-4 ">
                <div className="h-4/6 w-full bg-slate-200/70"></div>
                <div className="h-2/6 w-full bg-slate-200/70"></div>
              </div>
              <div className=" h-full w-4/12 bg-slate-200/70  "></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
};

export default AppRouter;
