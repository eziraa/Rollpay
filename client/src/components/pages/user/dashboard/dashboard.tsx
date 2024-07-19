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
import { AllowanceStat } from "./allowance-stat.tsx";
import { DeductionStat } from "./deduction-stat";
import { OvertimeStat } from "./overtime-stat.tsx";

import money3 from "../../../../assets/money.jpg";
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
                  backgroundSize: "cover",
                  borderRadius: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "1rem",
                  display: "block",
                  border: "1px solid #ccc",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
                src={money3}
                alt=""
              />
            </Icon>
            <DataBox>
              <DashboardTitle className="success">
                {employee?.salary} ETB
              </DashboardTitle>
              <DashboardTitle className="italic">Base Salary</DashboardTitle>
            </DataBox>
          </CardBody>
          <CardFooter>
            <MidBlurredText className="mid-spaced">
              This is your current base salary for the current month
              {/* <span className="success"> 5%</span> */}
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
                src={money3}
                alt=""
              />
            </Icon>
            <DataBox>
              <DashboardTitle className="success">
                {employee?.payments.slice(-1)[0].net_salary} ETB
              </DashboardTitle>
              <DashboardTitle className="italic">Net Salary</DashboardTitle>
            </DataBox>
          </CardBody>
          <CardFooter>
            <MidBlurredText className="mid-spaced">
              This is your current net salary for the current month
              {/* <span className="success"> 4% </span> */}
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
                src={money3}
                alt=""
              />
            </Icon>
            <DataBox>
              <DashboardTitle className="success">
                {employee?.payments.slice(-1)[0].gross_salary} ETB
              </DashboardTitle>
              <DashboardTitle className="italic">Gross salary</DashboardTitle>
            </DataBox>
          </CardBody>
          <CardFooter>
            <MidBlurredText className="mid-spaced">
              This is your current gross salary for the current month
              {/* <span className="success"> 12%</span> */}
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
                src={money3}
                alt=""
              />
            </Icon>
            <DataBox>
              <DashboardTitle className="success">
                {employee?.payments.slice(-1)[0].income_tax} ETB
              </DashboardTitle>
              <DashboardTitle className="italic"> Income Tax </DashboardTitle>
            </DataBox>
          </CardBody>
          <CardFooter>
            <MidBlurredText className="mid-spaced">
              This is your current income tax for the current month
              {/* <span className="success"> 4%</span> */}
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
