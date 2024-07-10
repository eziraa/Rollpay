import { useEffect } from "react";
import { useStatistics } from "../../../hooks/statistics-hook";
import { MonthCard } from "../../utils/curr-month-card/curr-month-card";
import { PaymentCard } from "../../utils/payment-card/payment-card";
import {
  LargeText,
  NormalBlurredText,
  // NormalBlurredText
} from "../../utils/titles/titles";
import {
  CardColumnTemplate,
  CardRowTemplate,
  DashboardBody,
  DashboardContainer,
  DecreaseIcon,
  IncreaseIcon,
  // DecreaseIcon,
  // IncreaseIcon,
  StatCard,
  StatContainer,
} from "./dashboard.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import { getStatRequest } from "../../../store/statistics/statistics-slice";
import { FaUsers } from "react-icons/fa6";

export const DashBoard = () => {
  const { stat } = useStatistics();
  const dispatcher = useAppDispatch();

  useEffect(() => {
    dispatcher(getStatRequest());
  }, []);
  return (
    <DashboardContainer>
      <StatContainer className="state-card-container">
        {stat &&
          Object.entries(stat).map(([key, value], index) => {
            return (
              <StatCard>
                <CardRowTemplate>
                  <CardColumnTemplate>
                    <LargeText>{value}</LargeText>
                    <p>{key.toLocaleUpperCase()}</p>
                  </CardColumnTemplate>
                  {<FaUsers />}
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
