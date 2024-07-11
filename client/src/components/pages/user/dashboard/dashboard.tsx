/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaDAndDBeyond, FaMoneyBill, FaUserSecret } from "react-icons/fa";
import { MediumIcon } from "../../../utils/icons/icons.style";
import {
  MidBlurredText,
  NormalBlurredText,
} from "../../../utils/titles/titles";
import { DashboardTitle } from "../../dashboard/dashboard.style";
import {
  AxisKey,
  BarGraphContainer,
  BarGraphContent,
  BarGraphHeader,
  BarsContainer,
  BlurredText,
  CardBody,
  CardFooter,
  CardsContainer,
  DashBoardCard,
  DashboardContainer,
  DataBox,
  DataHorizontalAxis,
  DataVerticalAxis,
  GraphContainer,
  GraphData,
  GraphKey,
  GrpahKeyContainer,
  Icon,
  ToastContainer,
  ToastRow,
  VerticalAxis,
} from "./dashboard.style";
import { SmallDot } from "../../../utils/dots/dots";
import { useAppDispatch } from "../../../../utils/custom-hook";
import { useSalary } from "../../../../hooks/salary-hook";
import { getCurrEmpPaymentInfo } from "../../../../store/salary/salary-slice";
import { useUser } from "../../../../hooks/user-hook";
import { useEffect } from "react";
import { colors } from "./colors";
import { getNamedMonth } from "../../salary/utils";
import { Cross } from "./cross";
import { FaAmazonPay, FaSackDollar } from "react-icons/fa6";

export const UserDashboard = () => {
  const dispatcher = useAppDispatch();
  const employee = useSalary().curr_emp?.employee;
  const { user } = useUser();

  useEffect(() => {
    user?.employee &&
      dispatcher(getCurrEmpPaymentInfo(user?.employee.id || "ED1001"));
  }, [user]);

  return (
    <DashboardContainer>
      <CardsContainer>
        <DashBoardCard>
          <CardBody>
            <Icon>
              <FaUserSecret />
            </Icon>
            <DataBox>
              <DashboardTitle className="success">
                {employee?.salary}
              </DashboardTitle>
              <DashboardTitle className="italic">
                Employee Salary
              </DashboardTitle>
            </DataBox>
          </CardBody>
          <CardFooter>
            <MidBlurredText className="mid-spaced">
              Your salary is greater than prev month by
              <span className="fail">5%</span>
            </MidBlurredText>
          </CardFooter>
        </DashBoardCard>
        <DashBoardCard>
          <CardBody>
            <Icon>
              <FaAmazonPay />
            </Icon>
            <DataBox>
              <DashboardTitle className="success">
                {employee?.payments.slice(-1)[0].net_salary}
              </DashboardTitle>
              <DashboardTitle className="italic">Net Salary</DashboardTitle>
            </DataBox>
          </CardBody>
          <CardFooter>
            <MidBlurredText className="mid-spaced">
              Your net Salary is greater than prev month by
              <span className="fail"> 14% </span>
            </MidBlurredText>
          </CardFooter>
        </DashBoardCard>
        <DashBoardCard>
          <CardBody>
            <Icon>
              <FaSackDollar />
            </Icon>
            <DataBox>
              <DashboardTitle className="success">
                {employee?.payments.slice(-1)[0].gross_salary}
              </DashboardTitle>
              <DashboardTitle className="italic">Gross salary</DashboardTitle>
            </DataBox>
          </CardBody>
          <CardFooter>
            <MidBlurredText className="mid-spaced">
              Your gross salary is greater than prev month by
              <span className="fail">12%</span>
            </MidBlurredText>
          </CardFooter>
        </DashBoardCard>
        <DashBoardCard>
          <CardBody>
            <Icon>
              <FaDAndDBeyond />
            </Icon>
            <DataBox>
              <DashboardTitle className="success">
                {employee?.payments.slice(-1)[0].income_tax}
              </DashboardTitle>
              <DashboardTitle className="italic"> Imcome Tax </DashboardTitle>
            </DataBox>
          </CardBody>
          <CardFooter>
            <MidBlurredText className="mid-spaced">
              Your income tax is greater than prev month by
              <span className="fail"> 4%</span>
            </MidBlurredText>
          </CardFooter>
        </DashBoardCard>
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
      </BarGraphContainer>
    </DashboardContainer>
  );
};
