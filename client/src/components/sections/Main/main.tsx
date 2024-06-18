import { LIST_EMP_S, SEE_EMPLOYEE } from "../../../constants/tasks";
import { useAppSelector } from "../../../utils/custom-hook";
import { DisplayEmployee } from "../display-employee/display-employee";
import { SeeEmployee } from "../see-employee/see-employee";
import { MainContainer } from "./main.style";

const Main = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <MainContainer>
      {user.long_task === SEE_EMPLOYEE && <SeeEmployee />}
      {user.long_task === LIST_EMP_S && <DisplayEmployee />}
    </MainContainer>
  );
};

export default Main;
