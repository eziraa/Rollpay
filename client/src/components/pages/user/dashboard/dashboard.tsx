/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaDAndDBeyond, FaUserSecret } from "react-icons/fa";
import { MidBlurredText } from "../../../utils/titles/titles";
import {
  DashboardContainer,
  DashboardTitle,
} from "../../dashboard/dashboard.style";
import {
  CardBody,
  CardFooter,
  CardsContainer,
  DashBoardCard,
  DataBox,
  Icon,
} from "./dashboard.style";
import { useAppDispatch } from "../../../../utils/custom-hook";
import { useSalary } from "../../../../hooks/salary-hook";
import { getCurrEmpPaymentInfo } from "../../../../store/salary/salary-slice";
import { useUser } from "../../../../hooks/user-hook";
import { useEffect } from "react";
import { FaAmazonPay, FaSackDollar } from "react-icons/fa6";
import { AllowanceStat } from "./allowance-stat.tsx";
import { DeductionStat } from "./deduction-stat";
import { OvertimeStat } from "./overtime-stat.tsx";
import salary from "../../../../assets/salary.png";
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
              <img
                style={{
                  width: "7rem",
                  height: "7rem",
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "1rem",
                  display: "block",
                  border: "1px solid #ccc",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
                src={salary}
                alt=""
              />
            </Icon>
            <DataBox>
              <DashboardTitle className="success">
                {employee?.salary}
              </DashboardTitle>
              <DashboardTitle className="italic">Salary</DashboardTitle>
            </DataBox>
          </CardBody>
          <CardFooter>
            <MidBlurredText className="mid-spaced">
              Your salary is greater than prev month by
              <span className="success"> 5%</span>
            </MidBlurredText>
          </CardFooter>
        </DashBoardCard>
        <DashBoardCard>
          <CardBody>
            <Icon>
              <img
                style={{
                  width: "7rem",
                  height: "7rem",
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "1rem",
                  display: "block",
                  border: "1px solid #ccc",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
                src={salary}
                alt=""
              />
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
              <span className="success"> 4% </span>
            </MidBlurredText>
          </CardFooter>
        </DashBoardCard>
        <DashBoardCard>
          <CardBody>
            <Icon>
              <img
                style={{
                  width: "7rem",
                  height: "7rem",
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "1rem",
                  display: "block",
                  border: "1px solid #ccc",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
                src={salary}
                alt=""
              />
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
              <span className="success"> 12%</span>
            </MidBlurredText>
          </CardFooter>
        </DashBoardCard>
        <DashBoardCard>
          <CardBody>
            <Icon>
              <img
                style={{
                  width: "7rem",
                  height: "7rem",
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "1rem",
                  display: "block",
                  border: "1px solid #ccc",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
                src={salary}
                alt=""
              />
            </Icon>
            <DataBox>
              <DashboardTitle className="success">
                {employee?.payments.slice(-1)[0].income_tax}
              </DashboardTitle>
              <DashboardTitle className="italic"> Income Tax </DashboardTitle>
            </DataBox>
          </CardBody>
          <CardFooter>
            <MidBlurredText className="mid-spaced">
              Your income tax is greater than prev month by
              <span className="success"> 4%</span>
            </MidBlurredText>
          </CardFooter>
        </DashBoardCard>
      </CardsContainer>
      <AllowanceStat />
      <DeductionStat />
      <OvertimeStat />
    </DashboardContainer>
  );
};
