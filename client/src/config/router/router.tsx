import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../../components/pages/sign-up/sign-up";

import { HomePage } from "../../components/pages/home/home-page";
import { LoginPage } from "../../components/pages/login/login";
import ProtectedRoute from "../utils/protected_route";
import NotFoundPage from "../../components/pages/4_0_4/404";
import AccessDenied from "../../components/pages/access-denied/access-denied";
import { ChangePassword } from "../../components/pages/change-password/change-password";
import UserProfile from "../../components/pages/user-profile/user-profile";
import { EmployeesListPage } from "../../components/pages/display-employee/display-employee";
import { SeeEmployee } from "../../components/pages/see-employee/see-employee";
import { EmployeesSalaryPage } from "../../components/pages/salary/salary";
import { EmployeeAllowance } from "../../components/sections/employee-allowance/allowance";
import { EmployeeOvertime } from "../../components/sections/employee-overtime/overtime";
import { EmployeeDeduction } from "../../components/sections/employee-deduction/deduction";
import { EditEmployee } from "../../components/pages/edit-employee/edit-employee";
// import UserProfile from "../../components/pages/user-profile/user-profile";
export const RouterConfig = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      >
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/employees" element={<EmployeesListPage />} />
        <Route path="/employees-salary" element={<EmployeesSalaryPage />} />
        <Route path="/employees/employee" element={<SeeEmployee />}>
          <Route path="" element={<EmployeeAllowance />} />
          <Route path="employee-overtimes" element={<EmployeeOvertime />} />
          <Route path="employee-deductions" element={<EmployeeDeduction />} />
          <Route path="edit-employee" element={<EditEmployee />} />
        </Route>
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/access-denied" element={<AccessDenied />} />
      <Route path="/change-password" element={<ChangePassword />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);
