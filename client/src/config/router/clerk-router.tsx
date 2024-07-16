import { Route, Navigate } from "react-router-dom";

import { HomePage } from "../../components/pages/home/home-page";
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
import { RaiseSalary } from "../../components/sections/raise-salary/add-overtime";
// import UserProfile from "../../components/pages/user-profile/user-profile";
export const ClerkRouterConfig = () => (
  <Route path="/" element={<HomePage />}>
    <Route path="/" element={<DashBoard />} />
    <Route path="/employees" element={<EmployeesListPage />}>
      <Route path="add-employee" element={<AddEmployee />}>
        <Route path="add-position" element={<AddPosition />} />
      </Route>
      <Route path="upload-document" element={<AddDocument />} />
    </Route>
    <Route path="/positions" element={<PositionPage />}>
      <Route path="add-position" element={<AddPosition />} />
      <Route path="edit-position/:position_id" element={<AddPosition />} />
    </Route>
    <Route path="/allowances" element={<AllowancePage />}>
      <Route path="add-allowance" element={<AddAllowance />} />
      <Route path="edit-allowance/:allowance_id" element={<AddAllowance />} />
    </Route>
    <Route path="/deductions" element={<DeductionPage />}>
      <Route path="add-deduction" element={<AddDeduction />} />
      <Route path="edit-deduction/:deduction_id" element={<AddDeduction />} />
    </Route>
    <Route path="/overtimes" element={<OvertimePage />}>
      <Route path="add-overtime" element={<AddOvertime />} />
      <Route path="edit-overtime/:overtime_id" element={<AddOvertime />} />
    </Route>
    <Route path="/employees/employee/delete" element={<CheckFlashMessage />} />

    <Route path="/employees-salary" element={<EmployeesSalaryPage />}>
      <Route path="raise" element={<RaiseSalary />} />
    </Route>
    <Route
      path="/employees-salary/:year/:month"
      element={<EmployeesSalaryPage />}
    />
    <Route path="/employees/employee/:employee_id" element={<SeeEmployee />}>
      <Route path="" element={<Navigate to="allowances" replace />} />
      <Route path="allowances/:year/:month" element={<EmployeeAllowance />}>
        <Route path="add-allowance" element={<AddAllowanceToEmp />}>
          <Route path="add-new-allowance" element={<AddAllowance />} />
        </Route>
      </Route>
      <Route path="allowances" element={<EmployeeAllowance />}>
        <Route path="add-allowance" element={<AddAllowanceToEmp />}>
          <Route path="add-new-allowance" element={<AddAllowance />} />
        </Route>
      </Route>
      <Route path="assets" element={<EmployeeAsset />}>
        <Route path="add-asset" element={<AddDocument />} />
      </Route>
      <Route path="overtimes/:year/:month" element={<EmployeeOvertime />}>
        <Route path="add-overtime" element={<AddOvertimeToEmp />}>
          <Route path="add-new-overtime" element={<AddOvertime />} />
        </Route>
      </Route>
      <Route path="overtimes" element={<EmployeeOvertime />}>
        <Route path="add-overtime" element={<AddOvertimeToEmp />}>
          <Route path="add-new-overtime" element={<AddOvertime />} />
        </Route>
      </Route>
      <Route path="deductions/:year/:month" element={<EmployeeDeduction />}>
        <Route path="add-deduction" element={<AddDeductionToEmp />}>
          <Route path="add-new-deduction" element={<AddDeduction />} />
        </Route>
      </Route>
      <Route path="deductions" element={<EmployeeDeduction />}>
        <Route path="add-deduction" element={<AddDeductionToEmp />}>
          <Route path="add-new-deduction" element={<AddDeduction />} />
        </Route>
      </Route>
      <Route path="edit" element={<EditEmployee />} />
    </Route>
  </Route>
);
