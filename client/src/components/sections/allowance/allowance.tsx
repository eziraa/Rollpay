// import { ADD_ALLOWANCE } from "../../../constants/tasks";
// import { setShortTask } from "../../../store/user/user-slice";
import { useContext } from "react";
// import { useAppDispatch } from "../../../utils/custom-hook";
import {
  CustomTable,
  HeaderTitle,
  TableBody,
  TableCaption,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";
import {
  AddButton,
  AllowanceBody,
  AllowanceContainer,
  AllowanceHeader,
  AllowanceTitle,
} from "./allowance.style";
import { monthlyAllowances2024 } from "./data";
import { DisplayContext } from "../../../contexts/display-context";

export const EmployeeAllowance = () => {
  // const dispatcher = useAppDispatch();
  const { display, setDisplay } = useContext(DisplayContext);
  return (
    <AllowanceContainer>
      <AllowanceHeader>
        <AllowanceTitle>Employee Allowance</AllowanceTitle>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDisplay({
              ...display,
              add_overtime: false,
              add_deduction: false,
              add_allowance: true,
              add_employee: false,
            });
            // dispatcher(setShortTask(ADD_ALLOWANCE));
          }}
        >
          Add
        </AddButton>
      </AllowanceHeader>
      <AllowanceBody>
        {Object.entries(monthlyAllowances2024).map((allowance, index) => {
          return (
            <CustomTable key={index}>
              <TableCaption>{allowance[0]} 2024 </TableCaption>
              <TableHeader>
                <HeaderTitle>Allowance Name</HeaderTitle>
                <HeaderTitle>Allowance Value</HeaderTitle>
                <HeaderTitle>Date of Given</HeaderTitle>
              </TableHeader>
              <TableBody>
                {allowance[1].map((allowance, index) => {
                  return (
                    <TableRow key={index}>
                      <TableData>{allowance.name}</TableData>
                      <TableData>{allowance.value}</TableData>
                      <TableData>{allowance.dateGiven}</TableData>
                    </TableRow>
                  );
                })}
              </TableBody>
            </CustomTable>
          );
        })}
      </AllowanceBody>
    </AllowanceContainer>
  );
};
