import {
  AllowanceBody,
  AllowanceContainer,
  AllowanceHeader,
  AllowanceTitle,
} from "../../sections/allowance/allowance.style";
import { monthlyAllowances2024 } from "../../sections/allowance/data";
import { CustomTable, HeaderTitle, TableBody, TableCaption, TableData, TableHeader, TableRow } from "../../utils/custom-table/custom-table";

const UserAllowance = () => {
  return (
    <AllowanceContainer>
      <AllowanceHeader>
        <AllowanceTitle>Employee Allowance</AllowanceTitle>
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

export default UserAllowance;
