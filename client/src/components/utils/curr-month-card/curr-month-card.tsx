import { useEffect, useState } from "react";
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
import { useStatistics } from "../../../hooks/statistics-hook";
import { useAppDispatch } from "../../../utils/custom-hook";
import { getStatRequest } from "../../../store/statistics/statistics-slice";

interface Props {
  statType: string;
}
export const MonthCard = ({ statType }: Props) => {
  const [currentMonth, setCurrentMonth] = useState("");
  const { stat } = useStatistics();
  const dispatcher = useAppDispatch();

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
          <MonthColumnTemplate>
            {Object.keys(stat.curr_month_allowance).map(
              (allowanceType, index) => (
                <MonthRowTemplate key={index}>
                  {/* <Colorbar color={index}*/}
                  {index === 0 && <RedBar />}
                  {index === 1 && <GreenBar />}
                  {index === 2 && <YellowBar />}
                  <p>
                    <BoldText>
                      {stat.curr_month_allowance[allowanceType]}
                    </BoldText>{" "}
                    {allowanceType}
                  </p>
                </MonthRowTemplate>
              )
            )}
            <LargeText>Total: {stat.curr_month_allowances} ETB</LargeText>
          </MonthColumnTemplate>
          <Piechart />
        </MonthCardBody>
      </MonthCardContainer>
    );
  }
};
