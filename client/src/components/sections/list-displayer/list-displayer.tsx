import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { useEffect } from "react";
import { listEmpRequested } from "../../../store/employee/employee-slice";
import Pagination from "../pagination/pagination";
import {
  Data,
  ListContainer,
  ListHeader,
  ListRow,
  ListTitle,
} from "./list-displayer.style";

function EmployeeListDisplayer() {
  const employee = useAppSelector((state) => state.employee);
  console.log();
  const dispatcher = useAppDispatch();
  useEffect(() => {
    dispatcher(listEmpRequested());
  }, []);

  const emplist = [
    ...employee.employees,
    ...employee.employees,
    ...employee.employees,
    ...employee.employees,
  ];

  return (
    <>
      <ListContainer>
        <ListHeader>
          <ListTitle>Employee</ListTitle>
          <ListTitle>ID</ListTitle>
          <ListTitle>Gender</ListTitle>
          <ListTitle>Email</ListTitle>
          <ListTitle>Phone</ListTitle>
          <ListTitle>Hired Date</ListTitle>
          <ListTitle>Date of Birth</ListTitle>
          <ListTitle>Position</ListTitle>
        </ListHeader>
        {emplist.map((emp) => {
          return (
            <ListRow>
              <Data> {emp.first_name + ' ' + emp.last_name} </Data>
              <Data> {emp.id} </Data>
              <Data> {emp.gender} </Data>
              <Data> {emp.email} </Data>
              <Data> {emp.phone_number} </Data>
              <Data> {emp.date_of_hire} </Data>
              <Data> {emp.date_of_birth} </Data>
              <Data> {emp.position} </Data>
            </ListRow>
          );
        })}
      </ListContainer>
      <Pagination />
    </>
  );
}

export default EmployeeListDisplayer;
