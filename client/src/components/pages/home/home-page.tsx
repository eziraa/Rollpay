import { Header } from "../../sections/header/header";
import { HomeBody, HomeContainer } from "./home-page.style";
import { useAppSelector } from "../../../utils/custom-hook";
import { ADD_EMP } from "../../../utils/constants/tasks";
import LeftMenu from "../../sections/left-menu/left-menu";
import { AddEmployee } from "../../sections/add_employee/add-employee";
import Main from "../../sections/main/main";

export const HomePage = () => {
  const employee = useAppSelector((state) => state.employee);
  return (
    <HomeContainer>
      <Header />
      <HomeBody>
        <LeftMenu />
        <Main />
      </HomeBody>
      {employee.task === ADD_EMP && <AddEmployee />}
    </HomeContainer>
  );
};
