import { Navigate, RouteObject } from "react-router-dom";

import { ClerkPage, HomePage } from "../../components/pages/home/home-page";
import { EmployeesListPage } from "../../components/pages/display-employee/display-employee";
import { SeeEmployee } from "../../components/pages/see-employee/see-employee";
import { EmployeesSalaryPage } from "../../components/pages/salary/salary";
import { EmployeeAllowance } from "../../components/sections/employee-allowance/allowance";
import { EmployeeOvertime } from "../../components/sections/employee-overtime/overtime";
import { EmployeeDeduction } from "../../components/sections/employee-deduction/deduction";
import { EditEmployee } from "../../components/pages/edit-employee/edit-employee";
import {
  AddAllowanceToEmp,
  loader as allowancesLoader,
} from "../../components/pages/see-employee/add-allowance";
import {
  AddDeductionToEmp,
  loader as deductionsLoader,
} from "../../components/pages/see-employee/add-deduction";
import {
  AddOvertimeToEmp,
  loader as overtimesLoader,
} from "../../components/pages/see-employee/add-overtime";
import {
  AddEmployee,
  loader as positionsLoader,
} from "../../components/sections/add_employee/add-employee";
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
import {
  EditGroup,
  loader as groupLoader,
} from "../../components/pages/admin/groups/edit-group";
import { GroupsPage } from "../../components/pages/admin/groups/groups";
import { DisplayGroups } from "../../components/pages/admin/groups/display-groups";
import { RolePage } from "../../components/pages/admin/roles/roles";
import { DisplayRoles } from "../../components/pages/admin/roles/display-roles";
import { UserDashboard } from "../../components/pages/user/dashboard/dashboard";
import { UserHomePage } from "../../components/pages/user/home/home";
import UserProfile from "../../components/pages/user-profile/user-profile";
import { AddUser } from "../../components/pages/admin/users/add-user";
import {
  EditUser,
  loader as userLoader,
} from "../../components/pages/admin/users/edit-user";
import { EmployeePage } from "../../components/pages/admin/employees/employees";
import { DisplayEmployees } from "../../components/pages/admin/employees/display-employees";
import {
  AddGroup,
  loader as permissionsLoader,
} from "../../components/pages/admin/groups/add-group";
import {
  AddRole,
  loader as groupsLoader,
} from "../../components/pages/admin/roles/add-role";
import {
  EditRole,
  loader as roleLoader,
} from "../../components/pages/admin/roles/edit-role";

export const userRoute = (base_end_point: string): RouteObject[] => [
  {
    path: "/" + base_end_point,
    element: <UserHomePage />,
    children: [
      { path: "", element: <UserDashboard /> },
      {
        path: "user-profile/:employee_id",
        element: <UserProfile />,
        children: [
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

export const clerk_routes: RouteObject[] = [
  {
    path: "/",
    element: <ClerkPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          { path: "/", element: <DashBoard /> },
          {
            path: "/employees",
            element: <EmployeesListPage />,
            children: [
              {
                path: "add-employee",
                element: <AddEmployee />,
                loader: positionsLoader,
                children: [{ path: "add-position", element: <AddPosition /> }],
              },
              { path: "upload-document", element: <AddDocument /> },
            ],
          },
          {
            path: "/positions",
            element: <PositionPage />,
            children: [
              { path: "add-position", element: <AddPosition /> },
              { path: "edit-position/:position_id", element: <AddPosition /> },
            ],
          },
          {
            path: "/allowances",
            element: <AllowancePage />,
            children: [
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
            children: [
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
            children: [
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
            children: [{ path: "raise", element: <RaiseSalary /> }],
          },

          {
            path: "/payroll/:year/:month",
            element: <EmployeesSalaryPage />,
          },
          {
            path: "/employees/employee/:employee_id",
            element: <SeeEmployee />,
            children: [
              { path: "", element: <Navigate to="allowances" replace /> },
              {
                path: "allowances/:year/:month",
                element: <EmployeeAllowance />,
                children: [
                  { path: "delete", element: <CheckFlashMessage /> },

                  {
                    path: "add-allowance",
                    element: <AddAllowanceToEmp />,
                    loader: allowancesLoader,
                    children: [
                      { path: "add-new-allowance", element: <AddAllowance /> },
                    ],
                  },
                ],
              },
              {
                path: "allowances",
                element: <EmployeeAllowance />,
                children: [
                  { path: "delete", element: <CheckFlashMessage /> },
                  {
                    path: "add-allowance",
                    element: <AddAllowanceToEmp />,
                    loader: allowancesLoader,
                    children: [
                      { path: "add-new-allowance", element: <AddAllowance /> },
                    ],
                  },
                ],
              },
              {
                path: "assets",
                element: <EmployeeAsset />,
                children: [
                  { path: "delete", element: <CheckFlashMessage /> },

                  { path: "add-asset", element: <AddDocument /> },
                ],
              },
              {
                path: "overtimes/:year/:month",
                element: <EmployeeOvertime />,
                children: [
                  { path: "delete", element: <CheckFlashMessage /> },

                  {
                    path: "add-overtime",
                    element: <AddOvertimeToEmp />,
                    loader: overtimesLoader,
                    children: [
                      { path: "add-new-overtime", element: <AddOvertime /> },
                    ],
                  },
                ],
              },
              {
                path: "overtimes",
                element: <EmployeeOvertime />,
                children: [
                  { path: "delete", element: <CheckFlashMessage /> },

                  {
                    path: "add-overtime",
                    element: <AddOvertimeToEmp />,
                    loader: overtimesLoader,
                    children: [
                      { path: "add-new-overtime", element: <AddOvertime /> },
                    ],
                  },
                ],
              },
              {
                path: "deductions/:year/:month",
                element: <EmployeeDeduction />,
                children: [
                  { path: "delete", element: <CheckFlashMessage /> },

                  {
                    path: "add-deduction",
                    element: <AddDeductionToEmp />,
                    loader: deductionsLoader,
                    children: [
                      { path: "add-new-deduction", element: <AddDeduction /> },
                    ],
                  },
                ],
              },
              {
                path: "deductions",
                element: <EmployeeDeduction />,
                children: [
                  { path: "delete", element: <CheckFlashMessage /> },

                  {
                    path: "add-deduction",
                    element: <AddDeductionToEmp />,
                    loader: deductionsLoader,
                    children: [
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
      ...userRoute("me"),
    ],
  },
];

export const adminRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AdminDashBoard />,
    children: [
      {
        path: "/users",
        element: <UserPage />,
        children: [
          { path: "", element: <DisplayUsers /> },
          { path: "add-user", element: <AddUser /> },
          {
            path: ":user_id/edit",
            element: <EditUser />,
            loader: ({ params }) => {
              if (!params.user_id) {
                throw new Error("User ID is required");
              }
              return userLoader({ params: { user_id: params.user_id } });
            },
          },
        ],
      },
      {
        path: "/employees",
        element: <EmployeePage />,
        children: [
          { path: "", element: <DisplayEmployees /> },
          {
            path: "add-employee",
            element: <AddEmployee />,
            loader: positionsLoader,
            children: [{ path: "add-position", element: <AddPosition /> }],
          },
          {
            path: ":employee_id/edit",
            loader: positionsLoader,
            element: <AddEmployee />,
          },
        ],
      },
      { path: "", element: <Navigate to="users" replace={true} /> },

      {
        path: "/groups",
        element: <GroupsPage />,
        children: [
          { path: "", element: <DisplayGroups /> },
          {
            path: "add-group",
            element: <AddGroup />,
            loader: permissionsLoader,
          },
          {
            path: ":group_id/edit",
            element: <EditGroup />,
            loader: ({ params }) => {
              if (!params.group_id) {
                throw new Error("Group ID is required");
              }
              return groupLoader({ params: { group_id: params.group_id } });
            },
          },
        ],
      },
      {
        path: "/roles",
        element: <RolePage />,
        children: [
          { path: "", element: <DisplayRoles /> },
          { path: "add-role", element: <AddRole />, loader: groupsLoader },
          {
            path: ":role_id/edit",
            element: <EditRole />,
            loader: ({ params }) => {
              if (!params.role_id) {
                throw new Error("Role ID is required");
              }
              return roleLoader({ params: { role_id: params.role_id } });
            },
          },
        ],
      },
    ],
  },
  ...userRoute("me"),
];
