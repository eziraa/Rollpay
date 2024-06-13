import { Header } from "../../sections/header/header";
import { HomeBody, HomeContainer } from "./home-page.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { ADD_EMP } from "../../../utils/constants/tasks";
import LeftMenu from "../../sections/left-menu/left-menu";
import { AddEmployee } from "../../sections/add_employee/add-employee";
import Main from "../../sections/main/main";
import { useEffect } from "react";
import { listEmpRequested } from "../../../store/employee/employee-slice";

export const HomePage = () => {
  const employee = useAppSelector((state) => state.employee);
  const dispacher = useAppDispatch();
  useEffect(() => {
    dispacher(listEmpRequested());
  }, [dispacher]);
  return (
    <HomeContainer>
      <Header />
      <HomeBody>
        <LeftMenu />
        <Main />
      </HomeBody>
      {employee.task === ADD_EMP && <AddEmployee />}
    </HomeContainer>
  );
};
