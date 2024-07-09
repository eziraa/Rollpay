import { HomeBody, HomeContainer } from "../../home/home-page.style";
import LeftMenu from "../../../sections/left-menu/left-menu";
import { Header } from "../../../sections/header/header";
import { Outlet } from "react-router";

export const UserHomePage = () => {
  return (
    <HomeContainer>
      <LeftMenu />
      <HomeBody>
        <Header />
        <Outlet />
      </HomeBody>
    </HomeContainer>
  );
};
