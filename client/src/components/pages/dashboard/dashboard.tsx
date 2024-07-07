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

export const DashBoard = () => {
  return (
    <DashboardContainer>
      <StatContainer className="state-card-container">
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
                  <NormalBlurredText>{data.percentage}%</NormalBlurredText>
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
