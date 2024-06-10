import { AddButton, MainContainer, MainHeader, Title } from "./main.style";
// import { Search } from "../../utils/search/search";
// import Table from "../table/table";
import { useAppDispatch, useAppSelector } from "../../../utils/customHook";
import { setTask } from "../../../store/employee/employeeSlice";
import { ADD_EMP } from "../../../utils/constants/tasks";
import { AddEmployee } from "../add_employee/add-employee";

const Main = () => {
  const dispatcher = useAppDispatch();
  const employee = useAppSelector((state) => state.employee);

  return (
    <MainContainer>
      <MainHeader>
        <Title>All Employees</Title>
        <AddButton onClick={() => dispatcher(setTask(ADD_EMP))}>Add</AddButton>
        {employee.task === ADD_EMP && <AddEmployee />}
      </MainHeader>
      {/* <ListBody>
        <Search />
        <Table />
      </ListBody> */}
    </MainContainer>
  );
};

export default Main;
