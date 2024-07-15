import { useEffect } from "react";
import { useStatistics } from "../../../hooks/statistics-hook";
import { MonthCard } from "../../utils/curr-month-card/curr-month-card";
import { PaymentCard } from "../../utils/payment-card/payment-card";
import { LargeText } from "../../utils/titles/titles";
import {
  CardColumnTemplate,
  CardRowTemplate,
  DashboardBody,
  DashboardBodyRow,
  DashboardContainer,
  StatCard,
  StatContainer,
  Text,
} from "./dashboard.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import {
  getPaymentStatRequest,
  getStatRequest,
} from "../../../store/statistics/statistics-slice";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import { IoBriefcase } from "react-icons/io5";

export const DashBoard = () => {
  const { stat } = useStatistics();
  const dispatcher = useAppDispatch();

  useEffect(() => {
    dispatcher(getStatRequest());
    dispatcher(getPaymentStatRequest());
  }, []);
  return (
    <DashboardContainer>
      <StatContainer className="state-card-container">
        <StatCard>
          <CardRowTemplate>
            <CardColumnTemplate>
              <LargeText>Total Employees</LargeText>
              <Text>{stat.total_employees}</Text>
            </CardColumnTemplate>
            {<FaUsers />}
          </CardRowTemplate>
          <CardRowTemplate>
            <CardColumnTemplate></CardColumnTemplate>
          </CardRowTemplate>
        </StatCard>
        <StatCard>
          <CardRowTemplate>
            <CardColumnTemplate>
              <LargeText>Total Positions</LargeText>
              <Text>{stat.total_positions}</Text>
            </CardColumnTemplate>
            {<IoBriefcase />}
          </CardRowTemplate>
          <CardRowTemplate>
            <CardColumnTemplate></CardColumnTemplate>
          </CardRowTemplate>
        </StatCard>
        <StatCard>
          <CardRowTemplate>
            <CardColumnTemplate>
              <LargeText>Average Salary</LargeText>
              <Text>{stat.avg_basic_salary} ETB</Text>
            </CardColumnTemplate>
            {<FaDollarSign />}
          </CardRowTemplate>
          <CardRowTemplate>
            <CardColumnTemplate></CardColumnTemplate>
          </CardRowTemplate>
        </StatCard>
        <StatCard>
          <CardRowTemplate>
            <CardColumnTemplate>
              <LargeText>Income Tax</LargeText>
              <Text>{stat.curr_month_tax} ETB</Text>
            </CardColumnTemplate>
            {<FaDollarSign />}
          </CardRowTemplate>
          <CardRowTemplate>
            <CardColumnTemplate></CardColumnTemplate>
          </CardRowTemplate>
        </StatCard>
      </StatContainer>
      <DashboardBody>
        <DashboardBodyRow>
          <MonthCard statType="allowance" />
          <MonthCard statType="deduction" />
          <MonthCard statType="overtime" />
        </DashboardBodyRow>
        <DashboardBodyRow>
          <PaymentCard />
        </DashboardBodyRow>
      </DashboardBody>
    </DashboardContainer>
  );
};
