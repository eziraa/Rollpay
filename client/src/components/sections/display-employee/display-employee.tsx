// import { setTask } from "../../../store/employee/employee-slice";
// import { ADD_EMP } from "../../../utils/constants/tasks";
// import { useAppDispatch } from "../../../utils/custom-hook";
import { useContext } from "react";
import { Search } from "../../utils/search/search";
import EmployeeListDisplayer from "../list-displayer/list-displayer";
import Pagination from "../pagination/pagination";
import { AddButton, Body, Header, Title } from "./display-employee.style";
import { EmployeeDisplayerContainer } from "./display-employee.style";
import { DisplayContext } from "../../../contexts/display-context";

export const DisplayEmployee = () => {
  // const dispatcher = useAppDispatch();
  const { display, setDisplay } = useContext(DisplayContext);
  return (
    <EmployeeDisplayerContainer>
      <Header>
        <Title>All Employees</Title>
        <Search />

        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDisplay({
              ...display,
              add_overtime: false,
              add_deduction: false,
              add_allowance: false,
              add_employee: true,
            });
          }}
        >
          Add Employee
        </AddButton>
      </Header>
      <Body>
        <EmployeeListDisplayer />
        <Pagination />
      </Body>
    </EmployeeDisplayerContainer>
  );
};
