import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import { listEmpRequested } from "../../../store/employee/employee-slice";
import {
  Data,
  HeaderItem,
  ListBody,
  ListContainer,
  ListHeader,
  ListRow,
  ListTitle,
  SortBtn,
} from "./list-displayer.style";
import { ScrollBar } from "../../utils/scroll-bar/scroll-bar";
import { EmployeeResponse } from "../../../typo/employee/response";

interface EmployeeOrderType {
  name: string;
  isAscending: boolean;
}
const initialOrder: EmployeeOrderType[] = [
  {
    name: "first_name",
    isAscending: true,
  },
  {
    name: "id",
    isAscending: true,
  },
  {
    name: "email",
    isAscending: true,
  },
  {
    name: "phone_number",
    isAscending: true,
  },
  {
    name: "date_of_hire",
    isAscending: true,
  },
  {
    name: "date_of_birth",
    isAscending: true,
  },
  {
    name: "position",
    isAscending: true,
  },
];

function EmployeeListDisplayer() {
  const employee = useAppSelector((state) => state.employee);
  const dispatcher = useAppDispatch();
  useEffect(() => {
    dispatcher(listEmpRequested());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [order, setOrder] = useState(initialOrder);
  const emplist = [
    ...employee.employees,
    ...employee.employees,
    ...employee.employees,
    ...employee.employees,
  ];

  const [emp_list, setEmpList] = useState(emplist);
  useEffect(() => {
    setEmpList(emplist);
  }, []);
  const sortEmployee = (index: number) => {
    const sorted = emp_list.sort((a, b) => {
      if (
        a[order[index].name as keyof EmployeeResponse] <
        b[order[index].name as keyof EmployeeResponse]
      ) {
        return order[index].isAscending ? 1 : -1;
      }
      if (
        a[order[index].name as keyof EmployeeResponse] >
        b[order[index].name as keyof EmployeeResponse]
      ) {
        return order[index].isAscending ? -1 : 1;
      }
      return 0;
    });
    order[index].isAscending = !order[index].isAscending;
    setOrder([...order]);
    setEmpList([...sorted]);
  };
  return (
    <div
      style={{
        position: "relative",
        marginTop: "3rem",
      }}
    >
      <ListContainer>
        <ListHeader>
          <HeaderItem>
            <ListTitle>Employee</ListTitle>
            <SortBtn
              onClick={() => {
                sortEmployee(0);
              }}
            >
              {order[0].isAscending ? (
                <FaArrowUp />
              ) : (
                <FaArrowDown />
              )}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>ID</ListTitle>
            <SortBtn
              onClick={() => {
                sortEmployee(1);
              }}
            >
              {order[1].isAscending ? (
                <FaArrowUp />
              ) : (
                <FaArrowDown />
              )}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Gender</ListTitle>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Email</ListTitle>
            <SortBtn
              onClick={() => {
                sortEmployee(2);
              }}
            >
              {order[2].isAscending ? (
                <FaArrowUp />
              ) : (
                <FaArrowDown />
              )}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Phone</ListTitle>
            <SortBtn
              onClick={() => {
                sortEmployee(3);
              }}
            >
              {order[3].isAscending ? (
                <FaArrowUp />
              ) : (
                <FaArrowDown />
              )}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Hired Date</ListTitle>
            <SortBtn
              onClick={() => {
                sortEmployee(4);
              }}
            >
              {order[4].isAscending ? (
                <FaArrowUp />
              ) : (
                <FaArrowDown />
              )}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Date of Birth</ListTitle>
            <SortBtn
              onClick={() => {
                sortEmployee(5);
              }}
            >
              {order[5].isAscending ? (
                <FaArrowUp />
              ) : (
                <FaArrowDown />
              )}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Position</ListTitle>
            <SortBtn
              onClick={() => {
                sortEmployee(6);
              }}
            >
              {order[6].isAscending ? (
                <FaArrowUp />
              ) : (
                <FaArrowDown />
              )}
            </SortBtn>
          </HeaderItem>
        </ListHeader>
      </ListContainer>
      <ListBody>
        <ScrollBar>
          {emp_list.map((emp) => {
            return (
              <ListRow>
                <Data> {emp.first_name + " " + emp.last_name} </Data>
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
        </ScrollBar>
      </ListBody>
    </div>
  );
}

export default EmployeeListDisplayer;
