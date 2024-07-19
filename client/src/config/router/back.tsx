import { Route, Navigate } from "react-router-dom";

import { ClerkPage, HomePage } from "../../components/pages/home/home-page";
import { EmployeesListPage } from "../../components/pages/display-employee/display-employee";
import { SeeEmployee } from "../../components/pages/see-employee/see-employee";
import { EmployeesSalaryPage } from "../../components/pages/salary/salary";
import { EmployeeAllowance } from "../../components/sections/employee-allowance/allowance";
import { EmployeeOvertime } from "../../components/sections/employee-overtime/overtime";
import { EmployeeDeduction } from "../../components/sections/employee-deduction/deduction";
import { EditEmployee } from "../../components/pages/edit-employee/edit-employee";
import { AddAllowanceToEmp } from "../../components/pages/see-employee/add-allowance";
import { AddDeductionToEmp } from "../../components/pages/see-employee/add-deduction";
import { AddOvertimeToEmp } from "../../components/pages/see-employee/add-overtime";
import { AddEmployee } from "../../components/sections/add_employee/add-employee";
import { CheckFlashMessage } from "../../components/sections/confirm-flash-message/confirm-flash-message";
import { AddAllowance } from "../../components/sections/add-allowance/add-allowance";
import { AddOvertime } from "../../components/sections/add-overtime/add-overtime";
import { AddDeduction } from "../../components/sections/add-deduction/add-deduction";
import { DashBoard } from "../../components/pages/dashboard/dashboard";
import { AddPosition } from "../../components/sections/add-position/add-position";
import { PositionPage } from "../../components/pages/positions/position";
import { AllowancePage } from "../../components/pages/allowances/allowances";
import { DeductionPage } from "../../components/pages/deductions/deductions";
import { OvertimePage } from "../../components/pages/overtimes/overtime";
import { AddDocument } from "../../components/sections/add-document/add-document";
import { EmployeeAsset } from "../../components/sections/employee-asset/asset";
import { RaiseSalary } from "../../components/sections/raise-salary/raise-salary";
import { EmployeeSalary } from "../../components/sections/employee-salary/employee-salary";
import { AdminDashBoard } from "../../components/pages/admin/dashboard/dashbord";
import { UserPage } from "../../components/pages/admin/users/users";
import { DisplayUsers } from "../../components/pages/admin/users/display-users";
import { AddGroup } from "../../components/pages/admin/groups/add-group";
import { GroupsPage } from "../../components/pages/admin/groups/groups";
import { DisplayGroups } from "../../components/pages/admin/groups/display-groups";
import { RolePage } from "../../components/pages/admin/roles/roles";
import { DisplayRoles } from "../../components/pages/admin/roles/display-roles";
import { UserDashboard } from "../../components/pages/user/dashboard/dashboard";
import { UserHomePage } from "../../components/pages/user/home/home";
import UserProfile from "../../components/pages/user-profile/user-profile";
import { AddUser } from "../../components/pages/admin/users/add-user";
import { EditUser } from "../../components/pages/admin/users/edit-user";
import { EmployeePage } from "../../components/pages/admin/employees/employees";
import { DisplayEmployees } from "../../components/pages/admin/employees/display-employees";

export const userRoute = (base_end_point: string) => [
  {
    path: base_end_point || "",
    element: <UserHomePage />,
    sub_routes: [
      { path: "", element: <UserDashboard /> },
      {
        path: "user-profile/:employee_id",
        element: <UserProfile />,
        sub_routes: [
          { path: "allowances", element: <EmployeeAllowance /> },
          { path: "", element: <Navigate to="allowances" replace /> },
          { path: "allowances/:year/:month", element: <EmployeeAllowance /> },
          { path: "overtimes", element: <EmployeeOvertime /> },
          { path: "overtimes/:year/:month", element: <EmployeeOvertime /> },
          { path: "deductions", element: <EmployeeDeduction /> },
          { path: "deductions/:year/:month", element: <EmployeeDeduction /> },
          { path: "assets", element: <EmployeeAsset /> },
          { path: "salary-history", element: <EmployeeSalary /> },
        ],
      },
    ],
  },
];

export interface CustomRoute {
  path: string;
  element: JSX.Element;
  sub_routes?: CustomRoute[];
}
export const clerk_routes: CustomRoute[] = [
  {
    path: "/",
    element: <ClerkPage />,
    sub_routes: [
      {
        path: "/",
        element: <HomePage />,
        sub_routes: [
          { path: "/", element: <DashBoard /> },
          {
            path: "/employees",
            element: <EmployeesListPage />,
            sub_routes: [
              {
                path: "add-employee",
                element: <AddEmployee />,
                sub_routes: [
                  { path: "add-position", element: <AddPosition /> },
                ],
              },
              { path: "upload-document", element: <AddDocument /> },
            ],
          },
          {
            path: "/positions",
            element: <PositionPage />,
            sub_routes: [
              { path: "add-position", element: <AddPosition /> },
              { path: "edit-position/:position_id", element: <AddPosition /> },
            ],
          },
          {
            path: "/allowances",
            element: <AllowancePage />,
            sub_routes: [
              { path: "add-allowance", element: <AddAllowance /> },
              {
                path: "edit-allowance/:allowance_id",
                element: <AddAllowance />,
              },
            ],
          },
          {
            path: "/deductions",
            element: <DeductionPage />,
            sub_routes: [
              { path: "add-deduction", element: <AddDeduction /> },
              {
                path: "edit-deduction/:deduction_id",
                element: <AddDeduction />,
              },
            ],
          },
          {
            path: "/overtimes",
            element: <OvertimePage />,
            sub_routes: [
              { path: "add-overtime", element: <AddOvertime /> },
              { path: "edit-overtime/:overtime_id", element: <AddOvertime /> },
            ],
          },
          {
            path: "/employees/employee/delete",
            element: <CheckFlashMessage />,
          },
          {
            path: "/payroll",
            element: <EmployeesSalaryPage />,
            sub_routes: [{ path: "raise", element: <RaiseSalary /> }],
          },

          {
            path: "/payroll/:year/:month",
            element: <EmployeesSalaryPage />,
          },
          {
            path: "/employees/employee/:employee_id",
            element: <SeeEmployee />,
            sub_routes: [
              { path: "", element: <Navigate to="allowances" replace /> },
              {
                path: "allowances/:year/:month",
                element: <EmployeeAllowance />,
                sub_routes: [
                  { path: "delete", element: <CheckFlashMessage /> },

                  {
                    path: "add-allowance",
                    element: <AddAllowanceToEmp />,
                    sub_routes: [
                      { path: "add-new-allowance", element: <AddAllowance /> },
                    ],
                  },
                ],
              },
              {
                path: "allowances",
                element: <EmployeeAllowance />,
                sub_routes: [
                  { path: "delete", element: <CheckFlashMessage /> },
                  {
                    path: "add-allowance",
                    element: <AddAllowanceToEmp />,
                    sub_routes: [
                      { path: "add-new-allowance", element: <AddAllowance /> },
                    ],
                  },
                ],
              },
              {
                path: "assets",
                element: <EmployeeAsset />,
                sub_routes: [
                  { path: "delete", element: <CheckFlashMessage /> },

                  { path: "add-asset", element: <AddDocument /> },
                ],
              },
              {
                path: "overtimes/:year/:month",
                element: <EmployeeOvertime />,
                sub_routes: [
                  { path: "delete", element: <CheckFlashMessage /> },

                  {
                    path: "add-overtime",
                    element: <AddOvertimeToEmp />,
                    sub_routes: [
                      { path: "add-new-overtime", element: <AddOvertime /> },
                    ],
                  },
                ],
              },
              {
                path: "overtimes",
                element: <EmployeeOvertime />,
                sub_routes: [
                  { path: "delete", element: <CheckFlashMessage /> },

                  {
                    path: "add-overtime",
                    element: <AddOvertimeToEmp />,
                    sub_routes: [
                      { path: "add-new-overtime", element: <AddOvertime /> },
                    ],
                  },
                ],
              },
              {
                path: "deductions/:year/:month",
                element: <EmployeeDeduction />,
                sub_routes: [
                  { path: "delete", element: <CheckFlashMessage /> },

                  {
                    path: "add-deduction",
                    element: <AddDeductionToEmp />,
                    sub_routes: [
                      { path: "add-new-deduction", element: <AddDeduction /> },
                    ],
                  },
                ],
              },
              {
                path: "deductions",
                element: <EmployeeDeduction />,
                sub_routes: [
                  { path: "delete", element: <CheckFlashMessage /> },

                  {
                    path: "add-deduction",
                    element: <AddDeductionToEmp />,
                    sub_routes: [
                      { path: "add-new-deduction", element: <AddDeduction /> },
                    ],
                  },
                ],
              },
              { path: "edit", element: <EditEmployee /> },
              { path: "salary-history", element: <EmployeeSalary /> },
              { path: "delete", element: <CheckFlashMessage /> },
            ],
          },
        ],
      },
    ],
  },
  ...userRoute("me"),
];

export const getRoutes = (routes: CustomRoute[]) => {
  return routes.map((route) => {
    return (
      <Route key={route.path} path={route.path} element={route.element}>
        {route.sub_routes && getRoutes(route.sub_routes)}
      </Route>
    );
  });
};

export const getRoute = (routes: CustomRoute[]) => {
  return routes.map((route) => {
    return (
      <Route key={route.path} path={route.path} element={route.element}>
        {route.sub_routes && getRoutes(route.sub_routes)}
      </Route>
    );
  });
};

export const adminRoutes = [
  {
    path: "/",
    element: <AdminDashBoard />,
    sub_routes: [
      {
        path: "/users",
        element: <UserPage />,
        sub_routes: [
          { path: "", element: <DisplayUsers /> },
          { path: "add-user", element: <AddUser /> },
          { path: ":user_id/edit", element: <EditUser /> },
        ],
      },
      {
        path: "/employees",
        element: <EmployeePage />,
        sub_routes: [
          { path: "", element: <DisplayEmployees /> },
          {
            path: "add-employee",
            element: <AddEmployee />,
            sub_routes: [{ path: "add-position", element: <AddPosition /> }],
          },
          { path: ":employee_id/edit", element: <AddEmployee /> },
        ],
      },
      { path: "", element: <Navigate to="users" replace={true} /> },

      {
        path: "/groups",
        element: <GroupsPage />,
        sub_routes: [
          { path: "", element: <DisplayGroups /> },
          { path: "add-group", element: <AddGroup /> },
          { path: ":group_id/edit", element: <AddGroup /> },
        ],
      },
      {
        path: "/roles",
        element: <RolePage />,
        sub_routes: [
          { path: "", element: <DisplayRoles /> },
          // { path: "add-role", element: <AddGroup /> },
        ],
      },
    ],
  },
];
