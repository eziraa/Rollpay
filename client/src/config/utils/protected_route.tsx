/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../constants/token-constants";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../utils/custom-hook";
import { getCurrentUserRequest } from "../../store/user/user-slice";
import { useUser } from "../../hooks/user-hook";
import { Navigate, Route } from "react-router-dom";
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
    return <Route path={path} element={<Navigate to={"/login"} />} />;
  }
}

export default ProtectedRoute;
