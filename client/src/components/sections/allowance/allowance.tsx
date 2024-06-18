import { ADD_ALLOWANCE } from "../../../constants/tasks";
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
import {
  AddButton,
  AllowanceBody,
  AllowanceContainer,
  AllowanceHeader,
  AllowanceTitle,
} from "./allowance.style";
import { monthlyAllowances2024 } from "./data";

export const EmployeeAllowance = () => {
  const dispatcher = useAppDispatch();
  return (
    <AllowanceContainer>
      <AllowanceHeader>
        <AllowanceTitle>Employee Allowance</AllowanceTitle>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatcher(setShortTask(ADD_ALLOWANCE));
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
