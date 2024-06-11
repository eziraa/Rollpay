import {
  AddButton,
  ListBody,
  MainContainer,
  MainHeader,
  Title,
} from "./main.style";
import { Search } from "../../utils/search/search";
// import Table from "../table/table";
import { useAppDispatch } from "../../../utils/customHook";
import { setTask } from "../../../store/employee/employeeSlice";
import { ADD_EMP } from "../../../utils/constants/tasks";
import Table from "../table/table";

const Main = () => {
  const dispatcher = useAppDispatch();

  return (
    <MainContainer>
      <MainHeader>
        <Title>All Employees</Title>
        <AddButton onClick={() => dispatcher(setTask(ADD_EMP))}>Add</AddButton>
      </MainHeader>
      <ListBody>
        <Search />
      </ListBody>
      <ListBody>
        <Table />
      </ListBody>
    </MainContainer>
  );
};

export default Main;
