import { useState } from "react";
import { AddEmployee } from "../../sections/add_employee/add-employee";
import { Header } from "../../sections/header/header";
import { Button } from "../../utils/form_elements/form.style";
import { HomeContainer } from "./homepage.style";
import { LoginPage } from "../login/login";
import { useAuth } from "../../../contexts/authContext";
// import { useAuth } from "../../../contexts/authContext";

export const HomePage = () => {
  const [addEmployee, closeAddEmployee] = useState(false);
  const { isAuthenticated } = useAuth();
  return (
    <HomeContainer>
      <Header />
      {isAuthenticated && (
        <Button
          style={{
            width: "auto",
            padding: "1rem 2rem",
            alignSelf: "end",
            marginRight: "2rem",
          }}
          onClick={() => {
            closeAddEmployee(true);
          }}
        >
          Add
        </Button>
      )}
      {addEmployee && <AddEmployee />}
      <LoginPage />
    </HomeContainer>
  );
};
