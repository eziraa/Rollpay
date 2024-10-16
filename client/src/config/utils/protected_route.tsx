/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { adminRoutes, clerk_routes, userRoute } from "../router/router";

export function protectedRoute(role: string) {
  return role === "Clerk"
    ? clerk_routes
    : role === "sys_admin"
    ? adminRoutes
    : role === "user"
    ? userRoute("/")
    : [];
}

