import { MidBlurredText } from "../../../utils/titles/titles";
import { DashboardBody, DashboardTitle } from "../../dashboard/dashboard.style";
import {
  CardFooter,
  CardsContainer,
  DashBoardCard,
  DashboardContainer,
  DataBox,
  Icon,
} from "./dashboard.style";
import { mock_data } from "./mock_data";

export const UserDashboard = () => {
  return (
    <DashboardContainer>
      <CardsContainer>
        {mock_data.map((data, index) => {
          return (
            <DashBoardCard key={index}>
              <DashboardBody>
                <Icon> {data.icon} </Icon>
                <DataBox>
                  <DashboardTitle className="success">
                    {data.salary}
                  </DashboardTitle>
                  <DashboardTitle className="italic">
                    {data.title}
                  </DashboardTitle>
                </DataBox>
              </DashboardBody>
              <CardFooter>
                <MidBlurredText className="mid-spaced">
                  Your {data.title} is greater than prev month by
                  <span className="fail"> {data.persentage}</span>
                </MidBlurredText>
              </CardFooter>
            </DashBoardCard>
          );
        })}
      </CardsContainer>
    </DashboardContainer>
  );
};
