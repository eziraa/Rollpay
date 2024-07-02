/* eslint-disable react-hooks/exhaustive-deps */
import { useAppSelector } from "../../../utils/custom-hook";
import { useContext, useEffect, useState } from "react";
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

import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { getTableElements } from "../../utils/custom-table/table-sizer";
import { NoResult } from "../../utils/no-result/no-result";
import { DisplayContext } from "../../../contexts/display-context";
import { useNavigate } from "react-router";

import DownloadPDF from "../../utils/download/download";
import { ThreeDots } from "../../utils/loading/dots";

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
  const navigate = useNavigate();
  const [order, setOrder] = useState(initialOrder);
  const emplist = [...employee.employees];
  const [emp_list, setEmpList] = useState(emplist);
  const { display } = useContext(DisplayContext);

  useEffect(() => {
    if (display.list_employees) setEmpList(emplist);
    else if (display.search_employee) {
      setEmpList(employee.query_set);
    }
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

  if (!employee.task_finished) return <ThreeDots size={4} />;

  if (display.search_employee && employee.query_set.length < 1)
    return <NoResult text=" No Serch Results" />;
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
                : "2fr 1fr 1fr 2.5fr 2fr 2fr 3fr 1.5fr 1fr 3fr  ",
          }}
        >
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
          <HeaderItem>
            <ListTitle>Employement Contract</ListTitle>
          </HeaderItem>
        </ListHeader>
        <ListBody>
          <ScrollBar>
            {emp_list.map((emp, index, emplists) => {
              return (
                <ListRow
                  key={index}
                  style={{
                    gridTemplateColumns: getTableElements(emplists),
                  }}
                >
                  <Data> {emp.first_name + " " + emp.last_name} </Data>
                  <Data> {emp.id} </Data>
                  <Data> {emp.gender} </Data>
                  <Data> {emp.email} </Data>
                  <Data> {emp.phone_number} </Data>
                  <Data> {emp.date_of_hire} </Data>
                  {/* <Data> {emp.date_of_birth} </Data> */}
                  <Data> {emp.position} </Data>
                  <Data>{emp.salary}</Data>
                  <Data
                    style={{
                      fontSize: "1.2rem",
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      localStorage.setItem("curr_emp_id", emp.id);
                      navigate("/employees/employee/" + emp.id);
                    }}
                  >
                    View
                  </Data>
                  <Data>{"..." + emp.employement_contract.slice(-8)}</Data>
                  <DownloadPDF url={emp.employement_contract} />
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
