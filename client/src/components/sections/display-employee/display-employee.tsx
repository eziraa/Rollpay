import { Search } from "../../utils/search/search";
import EmployeeListDisplayer from "../list-displayer/list-displayer";
import Pagination from "../pagination/pagination";
import {
  AddButton,
  Body,
  Header,
  Title,
  EmployeeDisplayerContainer,
} from "./display-employee.style";
import { useModal } from "../../../hooks/modal-hook";
import { ADD_EMPLOYEE } from "../../../constants/tasks";
import { listPositionsRequested } from "../../../store/position/position-slice";
import { useAppDispatch } from "../../../utils/custom-hook";

export const DisplayEmployee = () => {
  const { openModal } = useModal();
  const dispatcher = useAppDispatch();
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
            dispatcher(listPositionsRequested());
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
