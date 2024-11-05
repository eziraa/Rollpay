/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DashboardContainer,
  DashboardTitle,
} from "../../dashboard/dashboard.style";
import {
  Card,
  CardBody,
  CardsContainer,
  DashBoardCard,
  Image,
} from "./dashboard.style";
import { useAppDispatch } from "../../../../utils/custom-hook";
import { useSalary } from "../../../../hooks/salary-hook";
import { getCurrEmpPaymentInfo } from "../../../../store/salary/salary-slice";
import { useUser } from "../../../../hooks/user-hook";
import { useEffect } from "react";
import { AllowanceStat } from "./allowance-stat.tsx";
import { DeductionStat } from "./deduction-stat";
import { OvertimeStat } from "./overtime-stat.tsx";
import salary from "../../../../assets/salary.png";
import netSalary from "../../../../assets/net_salary.png";
import gross from "../../../../assets/gross.png";
import tax from "../../../../assets/tax.png";
import { ThreeDots } from "../../../utils/loading/dots.tsx";
import { useLocation } from "react-router";
import { useAuth } from "../../../../hooks/auth-hook.tsx";
import { FaArrowTrendUp } from "react-icons/fa6";
import CountUp from "react-countup";

export const UserDashboard = () => {
  const dispatcher = useAppDispatch();
  const employee = useSalary().curr_emp?.employee;
  const { loading } = useUser();
  const { curr_user: user } = useAuth();
  const pathname = useLocation().pathname;

  useEffect(() => {
    user?.employee && pathname.includes("user-profile");
    dispatcher(getCurrEmpPaymentInfo(user?.employee.id || "ED1001"));
  }, [user]);

  return (
    <DashboardContainer>
      <CardsContainer>
        <DashBoardCard className="drop-shadow-md">
          {loading ? (
            <ThreeDots size={1} />
          ) : (
            <CardBody>
              <Image src={salary} />
              <Card>
                  <h4 className="font-extrabold text-3xl text-slate-600/90 ">
                    <CountUp
                      end={employee?.salary || 0}
                      duration={5}
                      delay={1}
                      decimals={2}
                    />
                  </h4>
                  <DashboardTitle className="italic">Salary</DashboardTitle>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-1 bg-slate-100 px-2 rounded-sm text-xl text-green-400">
                    <FaArrowTrendUp />
                    <span>1.2%</span>
                  </div>
                  <span className="text-slate-400 text-xl">last month</span>
                </div>
              </Card>
            </CardBody>
          )}
        </DashBoardCard>
        <DashBoardCard className="drop-shadow-md">
          {loading ? (
            <ThreeDots size={1} />
          ) : (
            <CardBody>
              <Image src={netSalary} />
              <Card>
                  <h4 className="font-extrabold text-3xl text-slate-600/90 ">
                    <CountUp
                      end={employee?.payments.slice(-1)[0].net_salary || 0}
                      duration={5}
                      delay={1}
                      decimals={2}
                    />
                  </h4>
                  <DashboardTitle className="italic">Net Salary</DashboardTitle>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-1 bg-slate-100 px-2 rounded-sm text-xl text-green-400">
                    <FaArrowTrendUp />
                    <span>1.2%</span>
                  </div>
                  <span className="text-slate-400 text-xl">last month</span>
                </div>
              </Card>
            </CardBody>
          )}
        </DashBoardCard>
        <DashBoardCard className="drop-shadow-md">
          {loading ? (
            <ThreeDots size={1} />
          ) : (
            <CardBody>
              <Image src={gross} />
              <Card>
                  <h4 className="font-extrabold text-3xl text-slate-600/90 ">
                    <CountUp
                      end={employee?.payments.slice(-1)[0].gross_salary || 0}
                      duration={5}
                      delay={1}
                      decimals={2}
                    />
                  </h4>
                  <DashboardTitle className="italic">
                    Gross Salary
                  </DashboardTitle>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-1 bg-slate-100 px-2 rounded-sm text-xl text-green-400">
                    <FaArrowTrendUp />
                    <span>1.2%</span>
                  </div>
                  <span className="text-slate-400 text-xl">last month</span>
                </div>
              </Card>
            </CardBody>
          )}
        </DashBoardCard>
        <DashBoardCard className="drop-shadow-md">
          {loading ? (
            <ThreeDots size={1} />
          ) : (
            <CardBody>
              <Image src={tax} />
              <Card>
                  <h4 className="font-extrabold text-3xl text-slate-600/90 ">
                    <CountUp
                      end={employee?.payments.slice(-1)[0].income_tax || 0}
                      duration={5}
                      delay={1}
                      decimals={2}
                    />
                  </h4>
                  <DashboardTitle className="italic">Icome Tax</DashboardTitle>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-1 bg-slate-100 px-2 rounded-sm text-xl text-green-400">
                    <FaArrowTrendUp />
                    <span>1.2%</span>
                  </div>
                  <span className="text-slate-400 text-xl">last month</span>
                </div>
              </Card>
            </CardBody>
          )}
        </DashBoardCard>
        
      </CardsContainer>
      <AllowanceStat />
      <DeductionStat />
      <OvertimeStat />
    </DashboardContainer>
  );
};
