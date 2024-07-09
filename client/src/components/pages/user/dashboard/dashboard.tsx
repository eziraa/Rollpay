/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaMoneyBill } from "react-icons/fa";
import { MediumIcon } from "../../../utils/icons/icons.style";
import {
  MidBlurredText,
  NormalBlurredText,
} from "../../../utils/titles/titles";
import { DashboardBody, DashboardTitle } from "../../dashboard/dashboard.style";
import {
  AxisKey,
  BarGraphContainer,
  BarGraphContent,
  BarGraphHeader,
  BlurredText,
  CardFooter,
  CardsContainer,
  DashBoardCard,
  DashboardContainer,
  DataBox,
  DataHorizontalAxis,
  DataVerticalAxis,
  GraphContainer,
  GraphData,
  GraphFooter,
  GraphKey,
  GrpahKeyContainer,
  Icon,
  VerticalAxis,
} from "./dashboard.style";
import { mock_data, monthMock } from "./mock_data";
import { SmallDot } from "../../../utils/dots/dots";
import { useAppDispatch } from "../../../../utils/custom-hook";
import { useSalary } from "../../../../hooks/salary-hook";
import { getCurrEmpPaymentInfo } from "../../../../store/salary/salary-slice";
import { useUser } from "../../../../hooks/user-hook";
import { useEffect } from "react";

export const UserDashboard = () => {
  const dispatcher = useAppDispatch();
  const employee = useSalary().curr_emp?.employee;
  const { user } = useUser();

  useEffect(() => {
    dispatcher(getCurrEmpPaymentInfo(user?.employee.id || "ED1001"));
  }, []);

  return (
    <DashboardContainer>
      <CardsContainer>
        {mock_data.map((data, index) => {
          return (
            <DashBoardCard key={index}>
              <DashboardBody>
                <Icon> {data.icon} </Icon>
                <DataBox>
                  <DashboardTitle className="success">
                    {data.salary}
                  </DashboardTitle>
                  <DashboardTitle className="italic">
                    {data.title}
                  </DashboardTitle>
                </DataBox>
              </DashboardBody>
              <CardFooter>
                <MidBlurredText className="mid-spaced">
                  Your {data.title} is greater than prev month by
                  <span className="fail"> {data.persentage}</span>
                </MidBlurredText>
              </CardFooter>
            </DashBoardCard>
          );
        })}
      </CardsContainer>
      <BarGraphContainer>
        <BarGraphContent>
          <BarGraphHeader>
            <MidBlurredText>Payroll Salary of Employee</MidBlurredText>
            <MediumIcon>
              <FaMoneyBill />
            </MediumIcon>
          </BarGraphHeader>
          <GrpahKeyContainer>
            <GraphKey>
              <SmallDot color="#0e6bcf" />
              <NormalBlurredText>Deduction Amount</NormalBlurredText>
            </GraphKey>
            <GraphKey>
              <SmallDot color="#05f086" />
              <NormalBlurredText>Net Pay</NormalBlurredText>
            </GraphKey>
            <GraphKey>
              <SmallDot color="#710b97" />
              <NormalBlurredText>Allowance</NormalBlurredText>
            </GraphKey>
            <GraphKey>
              <SmallDot color="#e356b4" />
              <NormalBlurredText>Overtimes</NormalBlurredText>
            </GraphKey>
          </GrpahKeyContainer>
          <GraphContainer>
            <DataHorizontalAxis>
              <VerticalAxis>
                <AxisKey>5k</AxisKey>
                <AxisKey>4k</AxisKey>
                <AxisKey>3k</AxisKey>
                <AxisKey>2k</AxisKey>
                <AxisKey>1k</AxisKey>
                <AxisKey>0k</AxisKey>
              </VerticalAxis>
              {employee?.payments.slice(0, 12).map((payment) => {
                return (
                  <DataVerticalAxis>
                    {payment?.allowances
                      ?.map((all) => {
                        return all.allowance_rate;
                      })
                      .sort((a, b) => b - a)
                      .map((allowance, index) => {
                        return (
                          <GraphData
                            color={
                              index === 0
                                ? "#0cfcbc"
                                : index === 1
                                ? "#e6ff04"
                                : index === 2
                                ? "#1e00fe"
                                : index === 3
                                ? "#04b701"
                                : "#5a6cf9"
                            }
                            height={allowance * 3}
                          />
                        );
                      })}
                  </DataVerticalAxis>
                );
              })}
            </DataHorizontalAxis>
            <GraphFooter>
              {monthMock.map((month) => (
                <BlurredText> {month} </BlurredText>
              ))}
            </GraphFooter>
          </GraphContainer>
        </BarGraphContent>
      </BarGraphContainer>
    </DashboardContainer>
  );
};
