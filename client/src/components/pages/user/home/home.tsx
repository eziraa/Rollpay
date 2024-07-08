import { HomeBody, HomeContainer } from "../../home/home-page.style";
import LeftMenu from "../../../sections/left-menu/left-menu";
import { Header } from "../../../sections/header/header";
import { DashBoard } from "../../dashboard/dashboard";

export const UserHomePage = () => {
  return (
    <HomeContainer>
      <LeftMenu />
      <HomeBody>
        <Header />
        <DashBoard />
      </HomeBody>
    </HomeContainer>
  );
};
