// import { ADD_DEDUCTION } from "../../../constants/tasks";
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
import { monthsDeductions } from "../allowance/data";
import {
  AddButton,
  DeductionBody,
  DeductionContainer,
  DeductionHeader,
  DeductionTitle,
} from "./deduction.style";
import { DisplayContext } from "../../../contexts/display-context";

export const EmployeeDeduction = () => {
  // const dispatcher = useAppDispatch();
  const { display, setDisplay } = useContext(DisplayContext);
  return (
    <DeductionContainer>
      <DeductionHeader>
        <DeductionTitle>Employee Deduction</DeductionTitle>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // dispatcher(setShortTask(ADD_DEDUCTION));
            setDisplay({
              ...display,
              add_overtime: false,
              add_deduction: true,
              add_allowance: false,
              add_employee: false,
            });
          }}
        >
          Add
        </AddButton>
      </DeductionHeader>
      <DeductionBody>
        {monthsDeductions.map((Deduction, index) => {
          return (
            <CustomTable key={index}>
              <TableCaption>{Deduction.month} 2024 </TableCaption>
              <TableHeader>
                <HeaderTitle>Deduction Name</HeaderTitle>
                <HeaderTitle>Deduction Value</HeaderTitle>
                <HeaderTitle>Date of Given</HeaderTitle>
              </TableHeader>
              <TableBody>
                {Deduction.Deductions.map((Deduction, index) => {
                  return (
                    <TableRow key={index}>
                      <TableData>{Deduction.type}</TableData>
                      <TableData>{Deduction.value}</TableData>
                      <TableData>{Deduction.date}</TableData>
                    </TableRow>
                  );
                })}
              </TableBody>
            </CustomTable>
          );
        })}
      </DeductionBody>
    </DeductionContainer>
  );
};
