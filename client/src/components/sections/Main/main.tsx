import { useContext } from "react";
import { Salary } from "../../pages/salary/salary";
import { SeeEmployee } from "../../pages/see-employee/see-employee";
import { DisplayContext } from "../../../contexts/display-context";
import { MainContainer } from "../../utils/pages-utils/containers.style";

const Main = () => {
  const { display } = useContext(DisplayContext);
  return (
    <MainContainer>
      {display.see_employee && <SeeEmployee />}
      {(display.see_employee_salary || display.search_employee_salary) && (
        <Salary />
      )}
    </MainContainer>
  );
};

export default Main;
