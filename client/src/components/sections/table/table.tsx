// import TableFooter from "../tablefooter/table_footer";

import {
  TableContainer,
  TableHeaderRow,
  TableHeader,
  TableBodyRow,
  BodyData,
} from "./table.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { useEffect } from "react";
import { listEmpRequested } from "../../../store/employee/employee-slice";
import TableFooter from "../table-footer/table-footer";

function Table() {
  const employee = useAppSelector((state) => state.employee);
  console.log();
  const dispatcher = useAppDispatch();
  useEffect(() => {
    dispatcher(listEmpRequested());
  }, []);
  employee.employees.map((emp) => {
    console.log(emp.first_name);
  });

  return (
    <>
      <TableContainer>
        <TableHeaderRow>
          <TableHeader scope="col">Employee</TableHeader>
          <TableHeader scope="col">ID</TableHeader>
          <TableHeader scope="col">Gender</TableHeader>
          <TableHeader scope="col">Email</TableHeader>
          <TableHeader scope="col">Phone</TableHeader>
          <TableHeader scope="col">Hired Date</TableHeader>
          <TableHeader scope="col">Date of Birth</TableHeader>
          <TableHeader scope="col">Position</TableHeader>
        </TableHeaderRow>
        {/* {employee.employees.map((emp) => {
          return (
            <TableBodyRow>
              <BodyData>{emp.first_name + emp.last_name}</BodyData>
              <BodyData> {emp.id} </BodyData>
              <BodyData> {emp.gender} </BodyData>
              <BodyData> {emp.email} </BodyData>
              <BodyData> {emp.phone_number} </BodyData>
              <BodyData> {emp.date_of_hire} </BodyData>
              <BodyData> {emp.date_of_birth} </BodyData>
              <BodyData> {emp.position} </BodyData>
            </TableBodyRow>
          );
        })} */}
        <TableBodyRow>
          <BodyData>Netsanet Alemu</BodyData>
          <BodyData> ED1000 </BodyData>
          <BodyData> F </BodyData>
          <BodyData> netsialemu1907@gmail.com</BodyData>
          <BodyData> +2519071907</BodyData>
          <BodyData> 2023-02-02 </BodyData>
          <BodyData> 2023-02-02 </BodyData>
          <BodyData>Full stack developer </BodyData>
        </TableBodyRow>
        <TableFooter />
      </TableContainer>
    </>
  );
}

export default Table;
