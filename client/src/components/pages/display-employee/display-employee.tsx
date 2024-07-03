/* eslint-disable react-hooks/exhaustive-deps */
import { Search } from "../../utils/search/search";
import EmployeeListDisplayer from "../../sections/list-displayer/list-displayer";
import Pagination from "../../sections/pagination/pagination";
import {
  AddButton,
  Body,
  Title,
  EmployeesListHeader,
} from "./display-employee.style";
import { listPositionsRequested } from "../../../store/position/position-slice";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { MainContainer } from "../../utils/pages-utils/containers.style";
import { useContext, useEffect } from "react";
import { listEmpRequested } from "../../../store/employee/employee-slice";
import { PaginationContext } from "../../../contexts/pagination-context";
import { Outlet, useNavigate } from "react-router";
export const EmployeesListPage = () => {
  const employee = useAppSelector((state) => state.employee);
  const dispatcher = useAppDispatch();
  const { pagination, setPagination } = useContext(PaginationContext);
  const navigate = useNavigate();
  useEffect(() => {
    dispatcher(listEmpRequested());
  }, []);
  useEffect(() => {
    employee.pagination && setPagination(employee.pagination);
  }, [employee.pagination]);
  return (
    <MainContainer>
      <EmployeesListHeader>
        <Title>All Employees</Title>
        <Search />
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("add-employee");
            dispatcher(listPositionsRequested());
          }}
        >
          Add Employee
        </AddButton>
      </EmployeesListHeader>
      <Body>
        <Outlet />
        <EmployeeListDisplayer />
        <Pagination pagination={pagination} />
      </Body>
    </MainContainer>
  );
};
