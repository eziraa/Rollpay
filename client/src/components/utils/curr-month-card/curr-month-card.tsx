import { BoldText } from "../titles/text";
import { LargeText } from "../titles/titles";
import Piechart from "./bar";
import {
  //   CircularBar,
  GreenBar,
  MonthCardBody,
  MonthCardContainer,
  MonthColumnTemplate,
  MonthHeader,
  MonthRowTemplate,
  RedBar,
  YellowBar,
} from "./curr-month-card.style";

export const MonthCard = () => {
  return (
    <MonthCardContainer>
      <MonthHeader>
        <LargeText>Current - month</LargeText>
      </MonthHeader>
      <MonthCardBody>
        <MonthColumnTemplate>
          <LargeText>450 Total employees</LargeText>
          <MonthRowTemplate>
            <RedBar />
            <p>
              <BoldText>50</BoldText> Rejected
            </p>
          </MonthRowTemplate>
          <MonthRowTemplate>
            <GreenBar />
            <p>
              <BoldText>240</BoldText> approved
            </p>
          </MonthRowTemplate>
          <MonthRowTemplate>
            <YellowBar />
            <p>
              <BoldText>120</BoldText> Pending
            </p>
          </MonthRowTemplate>
        </MonthColumnTemplate>
        <Piechart />
      </MonthCardBody>
    </MonthCardContainer>
  );
};
