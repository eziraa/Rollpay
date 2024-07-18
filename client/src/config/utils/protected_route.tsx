/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, Route, useLocation } from "react-router-dom";
import {
  adminRoutes,
  clerk_routes,
  getRoutes,
  userRoute,
} from "../router/back";
import { UserResponse } from "../../typo/user/response";

function ProtectedRoute(isAuthorised: boolean, user: UserResponse) {
  const path = window.location.pathname;

  if (isAuthorised) {
    return user?.role === "Clerk" ? (
      getRoutes(clerk_routes)
    ) : user?.role === "sys_admin" ? (
      getRoutes(adminRoutes)
    ) : user?.role === "user" ? (
      getRoutes(userRoute("/"))
    ) : (
      <Route path={path} element={<Navigate to={"/access-denied"} />} />
    );
  } else {
    return (
      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            state={{
              from: window.location.pathname,
            }}
          />
        }
      />
    );
  }
}

export default ProtectedRoute;
