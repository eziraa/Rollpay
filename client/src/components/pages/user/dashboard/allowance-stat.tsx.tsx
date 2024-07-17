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
import { ThreeDots } from "../../../utils/loading/dots";

export const AllowanceStat = () => {
  const employee = useSalary().curr_emp?.employee;
  const { task_finished } = useSalary();
  return (
    <BarGraphContainer>
      {!task_finished ? (
        <ThreeDots size={1} />
      ) : (
        <BarGraphContent>
          <BarGraphHeader>
            <MidBlurredText>Your annual allowance stat</MidBlurredText>
          </BarGraphHeader>
          <GrpahKeyContainer>
            {employee?.payments
              .slice(-12)
              .sort((a, b) => -a.allowances.length + b.allowances.length)[0]
              .allowances.slice(0)
              .sort((a, b) => b.allowance_rate - a.allowance_rate)
              .map((allowance, index) => (
                <GraphKey>
                  <SmallDot color={colors[index]} />
                  <NormalBlurredText>
                    {allowance.allowance_type}
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
                      {payment?.allowances
                        .slice(0)
                        .sort((a, b) => b.allowance_rate - a.allowance_rate)
                        .map((allowance, index) => {
                          return (
                            <GraphData
                              className="data"
                              color={colors[index]}
                              height={
                                (allowance.allowance_rate * employee.salary) /
                                30000
                              }
                            />
                          );
                        })}
                      <ToastContainer className="toast">
                        {payment.allowances
                          .slice(0)
                          .sort((a, b) => b.allowance_rate - a.allowance_rate)
                          .map((allowance, index) => (
                            <ToastRow>
                              <SmallDot color={colors[index]} />
                              <span className="italic">
                                {allowance.allowance_type}{" "}
                                {(allowance.allowance_rate * employee.salary) /
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
      )}
    </BarGraphContainer>
  );
};
