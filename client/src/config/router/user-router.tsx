import { Route, Navigate } from "react-router-dom";
import { UserHomePage } from "../../components/pages/user/home/home";
import { UserDashboard } from "../../components/pages/user/dashboard/dashboard";
import UserProfile from "../../components/pages/user-profile/user-profile";
import { EmployeeAllowance } from "../../components/sections/employee-allowance/allowance";
import { EmployeeOvertime } from "../../components/sections/employee-overtime/overtime";
import { EmployeeDeduction } from "../../components/sections/employee-deduction/deduction";
import { EmployeeAsset } from "../../components/sections/employee-asset/asset";
import { EmployeeSalary } from "../../components/sections/employee-salary/employee-salary";
export const UserRouterConfig = ({
  base_end_point,
}: {
  base_end_point: string | undefined;
}) => (
  <Route path={base_end_point || ""} element={<UserHomePage />}>
    <Route path={""} element={<UserDashboard />} />
    <Route path="user-profile/:employee_id" element={<UserProfile />}>
      <Route path="allowances" element={<EmployeeAllowance />} />
      <Route path="" element={<Navigate to="allowances" replace />} />
      <Route path="allowances/:year/:month" element={<EmployeeAllowance />} />
      <Route path="overtimes" element={<EmployeeOvertime />} />
      <Route path="overtimes/:year/:month" element={<EmployeeOvertime />} />
      <Route path="deductions" element={<EmployeeDeduction />} />
      <Route path="deductions/:year/:month" element={<EmployeeDeduction />} />
      <Route path="assets" element={<EmployeeAsset />} />
      <Route path="salary-history" element={<EmployeeSalary />} />
    </Route>
  </Route>
);
