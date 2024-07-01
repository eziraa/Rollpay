import { Header } from "../../sections/header/header";
import { HomeBody, HomeContainer } from "./home-page.style";
import LeftMenu from "../../sections/left-menu/left-menu";

import { Outlet } from "react-router";

export const HomePage = () => {
  return (
    <HomeContainer>
      <Header />
      <HomeBody>
        <LeftMenu />
        <Outlet />
      </HomeBody>
    </HomeContainer>
  );
};
