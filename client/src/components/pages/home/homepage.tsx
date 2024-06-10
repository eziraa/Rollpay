import { AddEmployee } from "../../sections/add_employee/add-employee";
import { Header } from "../../sections/header/header";
import { Button } from "../../utils/form_elements/form.style";
import { HomeContainer } from "./homepage.style";
import { LoginPage } from "../login/login";
import { useAuth } from "../../../contexts/authContext";
import { useAppDispatch, useAppSelector } from "../../../utils/customHook";
import { setTask } from "../../../store/employee/employeeSlice";
import { ADD_EMP } from "../../../utils/constants/tasks";
// import { useAuth } from "../../../contexts/authContext";

export const HomePage = () => {
  const employee = useAppSelector((state) => state.employee);
  const dispatcher = useAppDispatch();
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
            dispatcher(setTask(ADD_EMP));
          }}
        >
          Add
        </Button>
      )}
      {employee.task === ADD_EMP && <AddEmployee />}
      <LoginPage />
    </HomeContainer>
  );
};
