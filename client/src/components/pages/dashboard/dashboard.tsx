/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { MonthCard } from "../../utils/curr-month-card/curr-month-card";
import { PaymentCard } from "../../utils/payment-card/payment-card";
import { LargeText, NormalBlurredText } from "../../utils/titles/titles";
import {
  CardColumnTemplate,
  CardRowTemplate,
  DashboardBody,
  DashboardContainer,
  DecreaseIcon,
  IncreaseIcon,
  StatCard,
  StatContainer,
} from "./dashboard.style";
import { mockData } from "./stat";
import { useEmployee } from "../../../hooks/employee-hook";
import { useAppDispatch } from "../../../utils/custom-hook";
import { getEmpNumRequested } from "../../../store/employee/employee-slice";

export const DashBoard = () => {
  const dispatcher = useAppDispatch();

  const employee = useEmployee();

  useEffect(() => {
    dispatcher(getEmpNumRequested());
  }, []);

  return (
    <DashboardContainer>
      <StatContainer>
        {mockData.map((data, index) => {
          return (
            <StatCard>
              <CardRowTemplate>
                <CardColumnTemplate>
                  <LargeText>{data.total}</LargeText>
                  <p>{data.name}</p>
                </CardColumnTemplate>
                {<data.icon />}
              </CardRowTemplate>
              <CardRowTemplate>
                {index % 2 === 0 ? <IncreaseIcon /> : <DecreaseIcon />}
                <CardColumnTemplate>
                  <NormalBlurredText>
                    Our company has {employee.total} employees.
                  </NormalBlurredText>
                </CardColumnTemplate>
              </CardRowTemplate>
            </StatCard>
          );
        })}
      </StatContainer>
      <DashboardBody>
        <PaymentCard />
        <MonthCard />
      </DashboardBody>
    </DashboardContainer>
  );
};
