import { Search } from "../../utils/search/search";
import EmployeeListDisplayer from "../../sections/list-displayer/list-displayer";
import Pagination from "../../sections/pagination/pagination";
import {
  AddButton,
  Body,
  Title,
  EmployeesListHeader,
  EmployeesListBody,
  EmployeesListContainer,
} from "./display-employee.style";
import { useModal } from "../../../hooks/modal-hook";
import { ADD_EMPLOYEE } from "../../../constants/tasks";
import { listPositionsRequested } from "../../../store/position/position-slice";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { MainContainer } from "../../utils/pages-utils/containers.style";
import LeftMenu from "../../sections/left-menu/left-menu";
import { Header } from "../../sections/header/header";
import { useContext, useEffect } from "react";
import { listEmpRequested } from "../../../store/employee/employee-slice";
import { PaginationContext } from "../../../contexts/pagination-context";
export const EmployeesListPage = () => {
  const { openModal } = useModal();
  const employee = useAppSelector((state) => state.employee);
  const dispatcher = useAppDispatch();
  const { pagination, setPagination } = useContext(PaginationContext);
  useEffect(() => {
    dispatcher(listEmpRequested());
  }, []);
  useEffect(() => {
    employee.pagination && setPagination(employee.pagination);
  }, [employee.pagination]);
  return (
    <EmployeesListContainer>
      <Header />
      <EmployeesListBody>
        <LeftMenu />
        <MainContainer>
          <EmployeesListHeader>
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
          </EmployeesListHeader>
          <Body>
            <EmployeeListDisplayer />
            <Pagination pagination={pagination} />
          </Body>
        </MainContainer>
      </EmployeesListBody>
    </EmployeesListContainer>
  );
};
