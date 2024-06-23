import { Search } from "../../utils/search/search";
import EmployeeListDisplayer from "../list-displayer/list-displayer";
import Pagination from "../pagination/pagination";
import { AddButton, Body, Header, Title } from "./display-employee.style";
import { EmployeeDisplayerContainer } from "./display-employee.style";
import { useModal } from "../../../hooks/modal-hook";
import { ADD_EMPLOYEE } from "../../../constants/tasks";

export const DisplayEmployee = () => {
  const { openModal } = useModal();
  return (
    <EmployeeDisplayerContainer>
      <Header>
        <Title>All Employees</Title>
        <Search />

        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openModal(ADD_EMPLOYEE);
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
