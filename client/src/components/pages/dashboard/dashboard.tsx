import { useEffect, useState } from "react";
import { useStatistics } from "../../../hooks/statistics-hook";
import { MonthCard } from "../../utils/curr-month-card/curr-month-card";
import { PaymentStatistics } from "../../utils/payment-card/payment-statistics";
import {
  DashboardBody,
  DashboardBodyRow,
  DashboardContainer,
  StatCard,
  StatContainer,
} from "./dashboard.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import {
  getPaymentStatRequest,
  getStatRequest,
} from "../../../store/statistics/statistics-slice";
import { ThreeDots } from "../../utils/loading/dots";
import { TiInfo } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

export const DashBoard = () => {
  const { stat, loading } = useStatistics();
  const dispatcher = useAppDispatch();
  const [openInfo, closeInfo] = useState(true);
  const [currentMonth, setCurrentMonth] = useState("");
  useEffect(() => {
    const date = new Date();
    const monthYear = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    setCurrentMonth(monthYear);
  }, []);
  useEffect(() => {
    dispatcher(getStatRequest());
    dispatcher(getPaymentStatRequest());
  }, []);

  return (
    <DashboardContainer>
      {openInfo && (
        <div
          className={
            "border-green-400/60 px-3 py-2 relative justify-start w-full border-2  flex  items-center space-x-2 rounded-md "
          }
        >
          <TiInfo className="text-green-400 text-3xl" />
          <p className="text-slate-400 text-2xl">
            Payroll submission for current day period is due in 2 days,. review
            and finalize all employees payroll detail
          </p>
          <IoMdClose
            className=" text-green-400 text-3xl absolute right-2  "
            onClick={(e) => {
              e.stopPropagation(); // Cancel
              closeInfo(false);
            }}
          />
        </div>
      )}
      {
        <StatContainer
          className="state-card-container w-full justify-stretch"
          style={{
            justifyContent: "stretch",
          }}
        >
          <StatCard>
            <div className="flex justify-between p-2   space-x-3 items-end ">
              <div className="flex-col space-y-3 gap-2 mr-3">
                <h3 className="text-slate-400 text-xl">Total Employees</h3>
                {loading ? (
                  <ThreeDots size={1} />
                ) : (
                  <h4 className="font-extrabold text-4xl text-slate-600/90 ">
                    {stat.total_employees * 137}
                  </h4>
                )}
              </div>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-1 bg-slate-100 px-2 rounded-sm text-xl text-green-400">
                  <FaArrowTrendUp />
                  <span>1.2%</span>
                </div>
                <span className="text-slate-400 text-xl">last month</span>
              </div>
            </div>
          </StatCard>
          <StatCard>
            <div className="flex justify-between p-2 space-x-3 items-end ">
              <div className="flex-col space-y-3">
                <h3 className="text-slate-400 text-xl">Total Positions</h3>
                {loading ? (
                  <ThreeDots size={1} />
                ) : (
                  <h4 className="font-extrabold text-4xl text-slate-600/90">
                    {stat.total_positions * 13}
                  </h4>
                )}
              </div>
              <div className="flex space-x-2">
                <div className="flex items-center space-x-1 bg-slate-100 px-2 rounded-sm text-xl text-red-400">
                  <FaArrowTrendDown />
                  <span>2.4%</span>
                </div>
                <span className="text-slate-400 text-xl">last month</span>
              </div>
            </div>
          </StatCard>
          <StatCard>
            <div className="flex justify-between p-2 space-x-3 items-end ">
              <div className="flex-col space-y-3 mr-2">
                <h3 className="text-slate-400 text-xl">Average Salary</h3>
                {loading ? (
                  <ThreeDots size={1} />
                ) : (
                  <h4 className="font-extrabold text-4xl text-slate-600/90 ">
                    {stat.avg_basic_salary} ETB
                  </h4>
                )}
              </div>
              <div className="flex space-x-3">
                <div className="flex items-center space-x-1 bg-slate-100 px-2 rounded-sm text-xl text-green-400">
                  <FaArrowTrendUp />
                  <span>4.2%</span>
                </div>
                <span className="text-slate-400 text-xl">last month</span>
              </div>
            </div>
          </StatCard>
          <StatCard>
            <div className="flex justify-between p-2 space-x-3 items-end ">
              <div className="flex-col space-y-3 mr-2">
                <h3 className="text-slate-400 text-xl">Incom Tax</h3>
                {loading ? (
                  <ThreeDots size={1} />
                ) : (
                  <h4 className="font-extrabold text-4xl text-slate-600/90 ">
                    {stat.curr_month_tax} ETB
                  </h4>
                )}
              </div>
              <div className="flex space-x-3">
                <div className="flex items-center space-x-1 bg-slate-100 px-2 rounded-sm text-xl text-green-400">
                  <FaArrowTrendUp />
                  <span>3.4%</span>
                </div>
                <span className="text-slate-400 text-xl">last month</span>
              </div>
            </div>
          </StatCard>
        </StatContainer>
      }
      <DashboardBody>
        <div className="w-full border-b-2 bg-green-50/75 border-green-400/75 p-3 rounded-sm">
          <h2 className="text-3xl text-slate-500 font-bold uppercase">
            Salary assets of {currentMonth}
          </h2>
        </div>
        <DashboardBodyRow>
          <MonthCard statType="allowance" />
          <MonthCard statType="deduction" />
          <MonthCard statType="overtime" />
        </DashboardBodyRow>
        <PaymentStatistics />
      </DashboardBody>
    </DashboardContainer>
  );
};
