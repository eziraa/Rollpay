import { SmallDot } from "../../../utils/dots/dots";
import {
  MidBlurredText,
  NormalBlurredText,
} from "../../../utils/titles/titles";
import { getNamedMonth } from "../../salary/utils";
import { colors } from "./colors";
import { Cross } from "./cross";
import {
  BarGraphContainer,
  BarGraphContent,
  BarGraphHeader,
  GrpahKeyContainer,
  GraphKey,
  GraphContainer,
  DataHorizontalAxis,
  VerticalAxis,
  AxisKey,
  DataVerticalAxis,
  BarsContainer,
  GraphData,
  ToastContainer,
  ToastRow,
  BlurredText,
} from "./dashboard.style";
import { useSalary } from "../../../../hooks/salary-hook";

export const OvertimeStat = () => {
  const employee = useSalary().curr_emp?.employee;
  return (
    <BarGraphContainer>
      <BarGraphContent>
        <BarGraphHeader>
          <MidBlurredText>Your annual overtime stat</MidBlurredText>
        </BarGraphHeader>
        <GrpahKeyContainer>
          {employee?.payments
            .slice(-12)
            .sort((a, b) => -a.overtimes.length + b.overtimes.length)[0]
            .overtimes.slice(0)
            .sort((a, b) => b.length_of_overtime - a.length_of_overtime)
            .map((overtime, index) => (
              <GraphKey>
                <SmallDot color={colors[index]} />
                <NormalBlurredText>{overtime.overtime_type}</NormalBlurredText>
              </GraphKey>
            ))}
        </GrpahKeyContainer>
        <GraphContainer>
          <Cross />
          <DataHorizontalAxis>
            <VerticalAxis>
              <AxisKey>5k</AxisKey>
              <AxisKey>4k</AxisKey>
              <AxisKey>3k</AxisKey>
              <AxisKey>2k</AxisKey>
              <AxisKey>1k</AxisKey>
              <AxisKey>0k</AxisKey>
            </VerticalAxis>
            {employee?.payments.slice(-12).map((payment) => {
              return (
                <DataVerticalAxis>
                  <BarsContainer colors={colors}>
                    {payment?.overtimes
                      .slice(0)
                      .sort(
                        (a, b) => b.length_of_overtime - a.length_of_overtime
                      )
                      .map((overtime, index) => {
                        return (
                          <GraphData
                            className="data"
                            color={colors[index]}
                            height={
                              (overtime.length_of_overtime * employee.salary) /
                              30000
                            }
                          />
                        );
                      })}
                    <ToastContainer className="toast">
                      {payment.overtimes
                        .slice(0)
                        .sort(
                          (a, b) => b.length_of_overtime - a.length_of_overtime
                        )
                        .map((overtime, index) => (
                          <ToastRow>
                            <SmallDot color={colors[index]} />
                            <span className="italic">
                              {overtime.overtime_type}{" "}
                              {(overtime.length_of_overtime * employee.salary) /
                                100}
                            </span>
                          </ToastRow>
                        ))}
                    </ToastContainer>
                  </BarsContainer>
                </DataVerticalAxis>
              );
            })}
          </DataHorizontalAxis>
          <DataHorizontalAxis>
            <div></div>
            {employee?.payments.slice(-12).map((payment) => {
              return (
                <div>
                  <BlurredText>
                    {getNamedMonth(new Date(payment.month))}
                  </BlurredText>
                </div>
              );
            })}
          </DataHorizontalAxis>
        </GraphContainer>
      </BarGraphContent>
    </BarGraphContainer>
  );
};
