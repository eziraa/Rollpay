import { Header } from "../../sections/header/header";
import { HomeBody, HomeContainer } from "./home-page.style";
import { useAppSelector } from "../../../utils/custom-hook";
import LeftMenu from "../../sections/left-menu/left-menu";
import Main from "../../sections/main/main";
import LoadingSpinner from "../../utils/spinner/spinner";
import { CheckFlashMessage } from "../../sections/confirm-flash-message/confirm-flash-message";

import { ModalStore } from "../../utils/modal-store/modal-store";
export const HomePage = () => {
  const employee = useAppSelector((state) => state.employee);

  return (
    <HomeContainer>
      <Header />
      <HomeBody>
        <LeftMenu />
        <CheckFlashMessage />
        {employee.loading ? <LoadingSpinner /> : <Main />}
      </HomeBody>
    </HomeContainer>
  );
};
