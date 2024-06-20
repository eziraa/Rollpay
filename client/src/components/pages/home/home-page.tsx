import { Header } from "../../sections/header/header";
import { HomeBody, HomeContainer } from "./home-page.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { ADD_EMP } from "../../../utils/constants/tasks";
import LeftMenu from "../../sections/left-menu/left-menu";
import { AddEmployee } from "../../sections/add_employee/add-employee";
import Main from "../../sections/main/main";
import { useEffect } from "react";
import { listEmpRequested } from "../../../store/employee/employee-slice";
import {
  ADD_ALLOWANCE,
  ADD_DEDUCTION,
  ADD_OVERTIME,
  LIST_EMP_S,
  SEE_EMP_SALARY,
} from "../../../constants/tasks";
import { AddSalaryComponent } from "../../sections/salary-components/salary-components";
import LoadingSpinner from "../../utils/spinner/spinner";
import { CheckFlashMessage } from "../../sections/confirm-flash-message/confirm-flash-message";
import { getSalariesRequested } from "../../../store/salary/salary-slice";
export const HomePage = () => {
  const employee = useAppSelector((state) => state.employee);
  const { long_task, short_task } = useAppSelector((state) => state.user);
  const salary = useAppSelector((state) => state.salary);
  const dispacher = useAppDispatch();
  useEffect(() => {
    if (long_task === SEE_EMP_SALARY) dispacher(getSalariesRequested());
    else if (long_task === undefined || long_task === LIST_EMP_S)
      dispacher(listEmpRequested());
  }, [dispacher, long_task]);
  return (
    <HomeContainer>
      <Header />
      <HomeBody>
        <LeftMenu />
        <CheckFlashMessage />
        {employee.loading || salary.loading ? <LoadingSpinner /> : <Main />}
      </HomeBody>
      {employee.task === ADD_EMP && <AddEmployee />}
      {[ADD_ALLOWANCE, ADD_DEDUCTION, ADD_OVERTIME].includes(
        short_task ?? ""
      ) && <AddSalaryComponent />}
    </HomeContainer>
  );
};
