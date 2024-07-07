/* eslint-disable react-hooks/exhaustive-deps */
import { Search } from "../../utils/search/search";
import EmployeeListDisplayer from "../../sections/list-displayer/list-displayer";
import {
  Body,
  Title,
  EmployeesListHeader,
  AddButton,
} from "./display-employee.style";
import { listPositionsRequested } from "../../../store/position/position-slice";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { MainContainer } from "../../utils/pages-utils/containers.style";
import { useContext, useEffect } from "react";
import { listEmpRequested } from "../../../store/employee/employee-slice";
import { PaginationContext } from "../../../contexts/pagination-context";
import { Outlet, useNavigate } from "react-router";
import { IoAddOutline } from "react-icons/io5";
export const EmployeesListPage = () => {
  const employee = useAppSelector((state) => state.employee);
  const dispatcher = useAppDispatch();
  const { setPagination } = useContext(PaginationContext);
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
      </EmployeesListHeader>
      <EmployeesListHeader>
        <Search />
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("add-employee");
            dispatcher(listPositionsRequested());
          }}
        >
          <IoAddOutline /> Add New
        </AddButton>
      </EmployeesListHeader>
      <Body>
        <Outlet />
        <EmployeeListDisplayer />
      </Body>
    </MainContainer>
  );
};
