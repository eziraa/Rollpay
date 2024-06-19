/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { useEffect, useState } from "react";
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
import { setLongTask } from "../../../store/user/user-slice";
import {
  LIST_EMP_S,
  SEARCH_EMPLOYEE,
  SEE_EMPLOYEE,
} from "../../../constants/tasks";
import { setCurrentEmployee } from "../../../store/employee/employee-slice";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { getTableElements } from "../../utils/custom-table/table-sizer";
import { NoResult } from "../../utils/no-result/no-result";

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
  {
    name: "salary",
    isAscending: true,
  },
];

function EmployeeListDisplayer() {
  const employee = useAppSelector((state) => state.employee);
  const dispatcher = useAppDispatch();
  const [order, setOrder] = useState(initialOrder);
  const emplist = [...employee.employees];
  const { long_task } = useAppSelector((state) => state.user);
  const [emp_list, setEmpList] = useState(emplist);
  useEffect(() => {
    if (long_task == LIST_EMP_S) setEmpList(emplist);
    else if (long_task == SEARCH_EMPLOYEE) {
      setEmpList(employee.query_set);
      console.log(employee.query_set);
    }
    // getTableElements(emplist);
  }, [employee]);
  const sortEmployee = (index: number) => {
    const sorted = emp_list.sort((a, b) => {
      if (
        a[order[index].name as keyof unknown] <
        b[order[index].name as keyof unknown]
      ) {
        return order[index].isAscending ? 1 : -1;
      }
      if (
        a[order[index].name as keyof unknown] >
        b[order[index].name as keyof unknown]
      ) {
        return order[index].isAscending ? -1 : 1;
      }
      return 0;
    });
    order[index].isAscending = !order[index].isAscending;
    setOrder([...order]);
    setEmpList([...sorted]);
  };

  if (long_task == SEARCH_EMPLOYEE && employee.query_set.length < 1)
    return <NoResult />;
  return (
    <div
      style={{
        position: "relative",
        marginTop: "1rem",
      }}
    >
      <ListContainer>
        <ListHeader
          style={{
            gridTemplateColumns:
              emp_list.length > 0
                ? getTableElements(emp_list)
                : "2fr 1fr 1fr 2.5fr 1.5fr 1.7fr 1.7fr 2.5fr 1.5fr 0.5fr",
          }}
        >
          <HeaderItem>
            <ListTitle>ID</ListTitle>
            <SortBtn
              onClick={(e) => {
                e.stopPropagation();
                sortEmployee(1);
              }}
            >
              {order[1].isAscending ? <GoArrowUp /> : <GoArrowDown />}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Employee</ListTitle>
            <SortBtn
              onClick={(e) => {
                e.stopPropagation();
                sortEmployee(0);
              }}
            >
              {order[0].isAscending ? <GoArrowUp /> : <GoArrowDown />}
            </SortBtn>
          </HeaderItem>

          <HeaderItem>
            <ListTitle>Gender</ListTitle>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Email</ListTitle>
            <SortBtn
              onClick={(e) => {
                e.stopPropagation();
                sortEmployee(2);
              }}
            >
              {order[2].isAscending ? <GoArrowUp /> : <GoArrowDown />}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Phone</ListTitle>
            <SortBtn
              onClick={(e) => {
                e.stopPropagation();
                sortEmployee(3);
              }}
            >
              {order[3].isAscending ? <GoArrowUp /> : <GoArrowDown />}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Hired Date</ListTitle>
            <SortBtn
              onClick={(e) => {
                e.stopPropagation();
                sortEmployee(4);
              }}
            >
              {order[4].isAscending ? <GoArrowUp /> : <GoArrowDown />}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Birth Date</ListTitle>
            <SortBtn
              onClick={(e) => {
                e.stopPropagation();
                sortEmployee(5);
              }}
            >
              {order[5].isAscending ? <GoArrowUp /> : <GoArrowDown />}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Position</ListTitle>
            <SortBtn
              onClick={(e) => {
                e.stopPropagation();
                sortEmployee(6);
              }}
            >
              {order[6].isAscending ? <GoArrowUp /> : <GoArrowDown />}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Salary</ListTitle>
            <SortBtn
              onClick={(e) => {
                e.stopPropagation();
                sortEmployee(7);
              }}
            >
              {order[7].isAscending ? <GoArrowUp /> : <GoArrowDown />}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Actions</ListTitle>
          </HeaderItem>
        </ListHeader>
        <ListBody>
          <ScrollBar>
            {emp_list.map((emp, index) => {
              return (
                <ListRow
                  key={index}
                  style={{
                    gridTemplateColumns: getTableElements(emp_list),
                  }}
                >
                  <Data> {emp.id} </Data>
                  <Data> {emp.first_name + " " + emp.last_name} </Data>
                  <Data> {emp.gender} </Data>
                  <Data> {emp.email} </Data>
                  <Data> {emp.phone_number} </Data>
                  <Data> {emp.date_of_hire} </Data>
                  <Data> {emp.date_of_birth} </Data>
                  <Data> {emp.position} </Data>
                  <Data>
                    {(emp.salary as { basic_salary: number } | undefined)
                      ?.basic_salary ?? 0}
                  </Data>
                  <Data
                    style={{
                      fontSize: "1.2rem",
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatcher(setLongTask(SEE_EMPLOYEE));
                      dispatcher(setCurrentEmployee(emp));
                    }}
                  >
                    View
                  </Data>
                </ListRow>
              );
            })}
          </ScrollBar>
        </ListBody>
      </ListContainer>
    </div>
  );
}

export default EmployeeListDisplayer;
