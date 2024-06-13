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
import { EmployeeResponse } from "../../../typo/employee/response";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin3Line } from "react-icons/ri";
import { setLongTask } from "../../../store/user/user-slice";
import { EDIT_EMP } from "../../../constants/tasks";
import { setCurrentEmployee } from "../../../store/employee/employee-slice";
import { GoArrowDown, GoArrowUp } from "react-icons/go";

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
              {order[0].isAscending ? <GoArrowUp /> : <GoArrowDown />}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>ID</ListTitle>
            <SortBtn
              onClick={() => {
                sortEmployee(1);
              }}
            >
              {order[1].isAscending ? <GoArrowUp /> : <GoArrowDown />}
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
              {order[2].isAscending ? <GoArrowUp /> : <GoArrowDown />}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Phone</ListTitle>
            <SortBtn
              onClick={() => {
                sortEmployee(3);
              }}
            >
              {order[3].isAscending ? <GoArrowUp /> : <GoArrowDown />}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Hired Date</ListTitle>
            <SortBtn
              onClick={() => {
                sortEmployee(4);
              }}
            >
              {order[4].isAscending ? <GoArrowUp /> : <GoArrowDown />}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Birth Date</ListTitle>
            <SortBtn
              onClick={() => {
                sortEmployee(5);
              }}
            >
              {order[5].isAscending ? <GoArrowUp /> : <GoArrowDown />}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Position</ListTitle>
            <SortBtn
              onClick={() => {
                sortEmployee(6);
              }}
            >
              {order[6].isAscending ? <GoArrowUp /> : <GoArrowDown />}
            </SortBtn>
          </HeaderItem>
          <HeaderItem>
            <ListTitle>Actions</ListTitle>
          </HeaderItem>
        </ListHeader>
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
                  <Data
                    style={{
                      fontSize: "1.5rem",
                    }}
                  >
                    <RiDeleteBin3Line
                      onClick={() => {
                        setEmpList(emp_list.filter((e) => e.id !== emp.id));
                      }}
                    />
                  </Data>
                  <Data
                    style={{
                      fontSize: "1.5rem",
                    }}
                    onClick={() => {
                      dispatcher(setLongTask(EDIT_EMP));
                      dispatcher(setCurrentEmployee(emp));
                    }}
                  >
                    <MdOutlineEdit />
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
