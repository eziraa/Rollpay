import { useContext } from "react";
import { DisplayEmployee } from "../display-employee/display-employee";
import { Salary } from "../salary/salary";
import { SeeEmployee } from "../see-employee/see-employee";
import { MainContainer } from "./main.style";
import { DisplayContext } from "../../../contexts/display-context";

const Main = () => {
  const { display } = useContext(DisplayContext);
  return (
    <MainContainer>
      {display.see_employee && <SeeEmployee />}
      {(display.list_employees || display.search_employee) && (
        <DisplayEmployee />
      )}
      {(display.see_employee_salary || display.search_employee_salary) && (
        <Salary />
      )}
    </MainContainer>
  );
};

export default Main;
