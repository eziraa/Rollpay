import { EDIT_EMP, LIST_EMP_S } from "../../../constants/tasks";
import { useAppSelector } from "../../../utils/custom-hook";
import { DisplayEmployee } from "../display-employee/display-employee";
import { EditEmployee } from "../edit-employee/edit-employee";
import { MainContainer } from "./main.style";

const Main = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <MainContainer>
      {user.long_task === EDIT_EMP && <EditEmployee />}
      {user.long_task === LIST_EMP_S && <DisplayEmployee />}
    </MainContainer>
  );
};

export default Main;
