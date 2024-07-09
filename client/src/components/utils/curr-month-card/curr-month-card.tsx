import { useEffect, useState } from "react";
// import { BoldText } from "../titles/text";
import { LargeText } from "../titles/titles";
// import Piechart from "./bar";
import Chart from "react-apexcharts"; // Import the Chart component from react-apexcharts

import {
  MonthCardBody,
  MonthCardContainer,
  MonthHeader,
} from "./curr-month-card.style";
import { useStatistics } from "../../../hooks/statistics-hook";
import { useAppDispatch } from "../../../utils/custom-hook";
import { getStatRequest } from "../../../store/statistics/statistics-slice";
import React from "react";
import {
  AllowanceResponse,
  DeductionResponse,
} from "../../../typo/statistics/response";

interface Props {
  statType: string;
}
interface ChartData {
  series: number[];
  labels: string[];
}
export const MonthCard = ({ statType }: Props) => {
  const [currentMonth, setCurrentMonth] = useState("");
  const { stat } = useStatistics();
  const dispatcher = useAppDispatch();
  const [allowanceData, setAllowanceData] = useState<ChartData>({
    series: [],
    labels: [],
  });
  const [deductiontData, setDeductionData] = useState<ChartData>({
    series: [],
    labels: [],
  });

  useEffect(() => {
    dispatcher(getStatRequest());
  }, [dispatcher]);
  const colors = [
    "#c24949",
    "#00df7f",
    "#faee03",
    "#3b8ad9",
    "#f7a35c",
    "#9567e2",
    "#49a9c2",
    "#f15c80",
  ];

  useEffect(() => {
    if (stat.curr_month_allowance) {
      const series = stat.curr_month_allowance.map(
        (allowance: AllowanceResponse) => allowance.amount || 0
      );
      const labels = stat.curr_month_allowance.map(
        (allowance: AllowanceResponse) => allowance.allowance_type
      );

      setAllowanceData({
        series: series,
        labels: labels,
      });
    }
  }, [stat.curr_month_allowance]);
  useEffect(() => {
    if (stat.curr_month_deduction) {
      const series = stat.curr_month_deduction.map(
        (deduction: DeductionResponse) => deduction.amount || 0
      );
      const labels = stat.curr_month_deduction.map(
        (deduction: DeductionResponse) => deduction.deduction_type
      );

      setDeductionData({
        series: series,
        labels: labels,
      });
    }
  }, [stat.curr_month_deduction]);

  useEffect(() => {
    dispatcher(getStatRequest());
  }, [dispatcher]);

  useEffect(() => {
    const date = new Date();
    const monthYear = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    setCurrentMonth(monthYear);
  }, []);
  if (statType === "allowance") {
    return (
      <MonthCardContainer>
        <MonthHeader>
          <LargeText>Allowance of {currentMonth}</LargeText>
        </MonthHeader>
        <MonthCardBody>
          <React.Fragment>
            <div className="container-fluid mb-3">
              <Chart
                type="pie"
                width={350}
                height={350}
                series={allowanceData.series}
                options={{
                  title: { text: "Allowance PieChart" },
                  noData: { text: "Empty Data" },
                  colors: colors.slice(0, allowanceData.series.length),
                  labels: allowanceData.labels,
                }}
              ></Chart>
            </div>
          </React.Fragment>{" "}
        </MonthCardBody>
        <LargeText>Total: {stat.curr_month_allowances} ETB</LargeText>
      </MonthCardContainer>
    );
  } else if (statType === "deduction") {
    return (
      <MonthCardContainer>
        <MonthHeader>
          <LargeText>Deduction of {currentMonth}</LargeText>
        </MonthHeader>
        <MonthCardBody>
          <React.Fragment>
            <div className="container-fluid mb-3">
              <Chart
                type="pie"
                width={350}
                height={350}
                series={deductiontData.series}
                options={{
                  title: { text: "Deduction PieChart" },
                  noData: { text: "Empty Data" },
                  colors: colors.slice(0, deductiontData.series.length),
                  labels: deductiontData.labels,
                }}
              ></Chart>
            </div>
          </React.Fragment>{" "}
        </MonthCardBody>
        <LargeText>Total: {stat.curr_month_deductions} ETB</LargeText>
      </MonthCardContainer>
    );
  }
};
