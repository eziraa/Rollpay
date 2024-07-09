import { HomeBody, HomeContainer } from "../../home/home-page.style";
import { Header } from "../../../sections/header/header";
import { Outlet } from "react-router";
import UserMenu from "../../../sections/user-menu/user-menu";

export const UserHomePage = () => {
  return (
    <HomeContainer>
      <UserMenu />
      <HomeBody>
        <Header />
        <Outlet />
      </HomeBody>
    </HomeContainer>
  );
};
