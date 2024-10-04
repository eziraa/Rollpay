import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { MainPage } from "./components/pages/main/main";
import { LoginPage } from "./components/pages/login/login";
import { protectedRoute } from "./config/utils/protected_route";
import SignUp from "./components/pages/sign-up/sign-up";
import { ChangePassword } from "./components/pages/change-password/change-password";
import NotFoundPage from "./components/pages/4_0_4/404";
import AccessDenied from "./components/pages/access-denied/access-denied";
import api from "./config/api";

const AppRouter = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
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
    if (!userRole) return null; // Avoid creating routes if role is not set

    return createBrowserRouter([
      {
        path: "/",
        element: <MainPage />,
        children: [...protectedRoute(userRole)],
      },
      { path: "login", element: <LoginPage /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "change-password", element: <ChangePassword /> },
      { path: "404", element: <NotFoundPage /> },
      { path: "access-denied", element: <AccessDenied /> },
    ]);
  }, [userRole]);

  if (!router) {
    return <div>Loading...</div>; // Display a loading state while user role is fetched
  }

  return <RouterProvider router={router} />;
};

export default AppRouter;
