import { FaMoneyBill } from "react-icons/fa";
import { SmallDot } from "../../../utils/dots/dots";
import { MediumIcon } from "../../../utils/icons/icons.style";
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

export const DeductionStat = () => {
  const employee = useSalary().curr_emp?.employee;
  return (
    <BarGraphContainer>
      <BarGraphContent>
        <BarGraphHeader>
          <MidBlurredText>Your annual deduction stat</MidBlurredText>
          <MediumIcon>
            <FaMoneyBill />
          </MediumIcon>
        </BarGraphHeader>
        <GrpahKeyContainer>
          {employee?.payments
            .slice(-12)
            .sort((a, b) => -a.deductions.length + b.deductions.length)[0]
            .deductions.slice(0)
            .sort((a, b) => b.deduction_rate - a.deduction_rate)
            .map((deduction, index) => (
              <GraphKey>
                <SmallDot color={colors[index]} />
                <NormalBlurredText>
                  {deduction.deduction_type}
                </NormalBlurredText>
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
                    {payment?.deductions
                      .slice(0)
                      .sort((a, b) => b.deduction_rate - a.deduction_rate)
                      .map((deduction, index) => {
                        return (
                          <GraphData
                            className="data"
                            color={colors[index]}
                            height={
                              (deduction.deduction_rate * employee.salary) /
                              30000
                            }
                          />
                        );
                      })}
                    <ToastContainer className="toast">
                      {payment.deductions
                        .slice(0)
                        .sort((a, b) => b.deduction_rate - a.deduction_rate)
                        .map((deduction, index) => (
                          <ToastRow>
                            <SmallDot color={colors[index]} />
                            <span className="italic">
                              {deduction.deduction_type}{" "}
                              {(deduction.deduction_rate * employee.salary) /
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
