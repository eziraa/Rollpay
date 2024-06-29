import { Header } from "../../sections/header/header";
import { HomeBody, HomeContainer } from "./home-page.style";
import LeftMenu from "../../sections/left-menu/left-menu";

import { CheckFlashMessage } from "../../sections/confirm-flash-message/confirm-flash-message";
import { Outlet } from "react-router";

export const HomePage = () => {
  return (
    <HomeContainer>
      <Header />
      <HomeBody>
        <LeftMenu />
        <Outlet />
        <CheckFlashMessage />
      </HomeBody>
    </HomeContainer>
  );
};
