import { Header } from "../../sections/header/header";
import { HomeBody, HomeContainer } from "./home-page.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import LeftMenu from "../../sections/left-menu/left-menu";
import { AddEmployee } from "../../sections/add_employee/add-employee";
import Main from "../../sections/main/main";
import { useContext, useEffect } from "react";
import { listEmpRequested } from "../../../store/employee/employee-slice";
import { AddSalaryComponent } from "../../sections/salary-components/salary-components";
import LoadingSpinner from "../../utils/spinner/spinner";
import { CheckFlashMessage } from "../../sections/confirm-flash-message/confirm-flash-message";
import { getSalariesRequested } from "../../../store/salary/salary-slice";
import { PaginationContext } from "../../../contexts/pagination-context";
import { DisplayContext } from "../../../contexts/display-context";
export const HomePage = () => {
  const employee = useAppSelector((state) => state.employee);
  const dispacher = useAppDispatch();
  const { setPagination } = useContext(PaginationContext);
  const { display } = useContext(DisplayContext);
  useEffect(() => {
    if (display.search_employee_salary) return;
    if (display.see_employee_salary) dispacher(getSalariesRequested());
    else if (display.list_employees) dispacher(listEmpRequested());
  }, [dispacher, display]);
  useEffect(() => {
    employee.pagination && setPagination(employee.pagination);
  }, [employee.pagination]);
  return (
    <HomeContainer>
      <Header />
      <HomeBody>
        <LeftMenu />
        <CheckFlashMessage />
        {employee.loading ? <LoadingSpinner /> : <Main />}
      </HomeBody>
      {display.add_employee && <AddEmployee />}
      {(display.add_allowance ||
        display.add_deduction ||
        display.add_overtime) && <AddSalaryComponent />}
    </HomeContainer>
  );
};