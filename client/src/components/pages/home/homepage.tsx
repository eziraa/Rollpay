import { AddEmployee } from "../../sections/add_employee/add-employee";
import { Header } from "../../sections/header/header";
import { HomeContainer } from "./homepage.style";

export const HomePage = () => {
  return (
    <HomeContainer>
      <Header />
      <AddEmployee />
    </HomeContainer>
  );
};
