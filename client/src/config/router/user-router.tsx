import { Route, Navigate } from "react-router-dom";
import { UserHomePage } from "../../components/pages/user/home/home";
import { UserDashboard } from "../../components/pages/user/dashboard/dashboard";
import UserProfile from "../../components/pages/user-profile/user-profile";
import UserAllowance from "../../components/pages/user-profile/user-allowance";
import UserOvertime from "../../components/pages/user-profile/user-overtime";
import UserDeductions from "../../components/pages/user-profile/user-deductions";
export const UserRouterConfig = () => (
  <Route path="/" element={<UserHomePage />}>
    <Route path="/" element={<UserDashboard />} />
    <Route path="/user-profile/:employee_id" element={<UserProfile />}>
      <Route path="allowances" element={<UserAllowance />} />
      <Route path="" element={<Navigate to="allowances" replace />} />
      <Route path="overtimes" element={<UserOvertime />} />
      <Route path="deductions" element={<UserDeductions />} />
    </Route>
  </Route>
);
