import { useEffect } from "react";
import { useStatistics } from "../../../hooks/statistics-hook";
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
import { useAppDispatch } from "../../../utils/custom-hook";
import { getStatRequest } from "../../../store/statistics/statistics-slice";
import { FaUser } from "react-icons/fa";

export const DashBoard = () => {
  const { stat } = useStatistics();
  const dispatcher = useAppDispatch();
  useEffect(() => {
    dispatcher(getStatRequest());
    console.log(stat);
  }, []);

  // const employee = useEmployee();

  // useEffect(() => {
  //   dispatcher(getEmpNumRequested());
  // }, []);
  return (
    <DashboardContainer>
      <StatContainer className="state-card-container">
        {Object.entries(stat).map(([key, value], index) => {
          return (
            <StatCard>
              <CardRowTemplate>
                <CardColumnTemplate>
                  <LargeText>{value}</LargeText>
                  <p>{key.toLocaleUpperCase()}</p>
                </CardColumnTemplate>
                {<FaUser />}
              </CardRowTemplate>
              <CardRowTemplate>
                {index % 2 === 0 ? <IncreaseIcon /> : <DecreaseIcon />}
                <CardColumnTemplate>
                  <NormalBlurredText>{87}%</NormalBlurredText>
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
