import { ADD_DEDUCTION } from "../../../constants/tasks";
import { setShortTask } from "../../../store/user/user-slice";
import { useAppDispatch } from "../../../utils/custom-hook";
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

export const EmployeeDeduction = () => {
  const dispatcher = useAppDispatch();
  return (
    <DeductionContainer>
      <DeductionHeader>
        <DeductionTitle>Employee Deduction</DeductionTitle>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatcher(setShortTask(ADD_DEDUCTION));
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
