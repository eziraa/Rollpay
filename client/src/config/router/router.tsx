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
import { EditEmployeePage } from "../../components/sections/edit-employee/edit-employee";
import { EmployeeDeductionPage } from "../../components/pages/employee-deduction/employee-deduction";
// import UserProfile from "../../components/pages/user-profile/user-profile";
export const RouterConfig = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/home-page"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/access-denied" element={<AccessDenied />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/employees" element={<EmployeesListPage />} />
      <Route path="/employees-salary" element={<EmployeesSalaryPage />} />
      <Route path="/employees/single-employee" element={<SeeEmployee />} />
      <Route path="/employees/edit-employee" element={<EditEmployeePage />} />
      <Route
        path="/employees/employee-deductions"
        element={<EmployeeDeductionPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);
