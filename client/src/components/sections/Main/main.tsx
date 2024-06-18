import {
  LIST_EMP_S,
  SEE_EMPLOYEE,
  SEE_EMP_SALARY,
} from "../../../constants/tasks";
import { useAppSelector } from "../../../utils/custom-hook";
import { DisplayEmployee } from "../display-employee/display-employee";
import { Salary } from "../salary/salary";
import { SeeEmployee } from "../see-employee/see-employee";
import { MainContainer } from "./main.style";

const Main = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <MainContainer>
      {user.long_task === SEE_EMPLOYEE && <SeeEmployee />}
      {user.long_task === LIST_EMP_S && <DisplayEmployee />}
      {user.long_task === SEE_EMP_SALARY && <Salary />}
    </MainContainer>
  );
};

export default Main;
