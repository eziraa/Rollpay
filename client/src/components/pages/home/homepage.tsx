// import { AddEmployee } from "../../sections/add_employee/add-employee";
import { Header } from "../../sections/header/header";
// import { Button } from "../../utils/form_elements/form.style";
import { HomeBody, HomeContainer } from "./homepage.style";
// import { LoginPage } from "../login/login";
// import { useAuth } from "../../../contexts/authContext";
import { useAppSelector } from "../../../utils/customHook";
// import { setTask } from "../../../store/employee/employeeSlice";
import { ADD_EMP } from "../../../utils/constants/tasks";
import LeftMenu from "../../sections/left-menu/left-menu";
import Main from "../../sections/main/main";
import { AddEmployee } from "../../sections/add_employee/add-employee";

// import { useAuth } from "../../../contexts/authContext";

export const HomePage = () => {
  const employee = useAppSelector((state) => state.employee);
  // const dispatcher = useAppDispatch();
  // const { isAuthenticated } = useAuth();
  return (
    <>
      <HomeContainer>
        <Header />
        <HomeBody>
          <LeftMenu />
          <Main />
        </HomeBody>

        {/* {isAuthenticated && (
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
      <LoginPage /> */}
      </HomeContainer>
      {employee.task === ADD_EMP && <AddEmployee />}
    </>
  );
};
