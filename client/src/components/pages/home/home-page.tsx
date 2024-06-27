import { Header } from "../../sections/header/header";
import { HomeBody, HomeContainer } from "./home-page.style";
import LeftMenu from "../../sections/left-menu/left-menu";

import { CheckFlashMessage } from "../../sections/confirm-flash-message/confirm-flash-message";

export const HomePage = () => {
  return (
    <HomeContainer>
      <Header />
      <HomeBody>
        <LeftMenu current_menu={""} />
        <CheckFlashMessage />
      </HomeBody>
    </HomeContainer>
  );
};
