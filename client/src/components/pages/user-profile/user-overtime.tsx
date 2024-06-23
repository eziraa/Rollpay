import { monthsOvertimes } from "../../sections/allowance/data";
import { OvertimeBody, OvertimeContainer, OvertimeHeader, OvertimeTitle } from "../../sections/overtime/overtime.style";
import {
  CustomTable,
  HeaderTitle,
  TableBody,
  Caption,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";

const UserOvertime = () => {
  return (
    <OvertimeContainer>
      <OvertimeHeader>
        <OvertimeTitle>Employee Overtime</OvertimeTitle>
      </OvertimeHeader>
      <OvertimeBody>
        {monthsOvertimes.map((Overtime, index) => {
          return (
            <CustomTable key={index}>
              <Caption>{Overtime.month} 2024 </Caption>
              <TableHeader>
                <HeaderTitle>Overtime Name</HeaderTitle>
                <HeaderTitle>Overtime Value</HeaderTitle>
                <HeaderTitle>Length of Time</HeaderTitle>
                <HeaderTitle>Date of Given</HeaderTitle>
              </TableHeader>
              <TableBody>
                {Overtime.overtimes.map((overtime, index) => {
                  return (
                    <TableRow key={index}>
                      <TableData>{overtime.type}</TableData>
                      <TableData>{overtime.valuePerHour}</TableData>
                      <TableData>{overtime.lengthOfTime}</TableData>
                      <TableData>
                        {overtime.date.toLocaleDateString()}
                      </TableData>
                    </TableRow>
                  );
                })}
              </TableBody>
            </CustomTable>
          );
        })}
      </OvertimeBody>
    </OvertimeContainer>
  );
};

export default UserOvertime;
