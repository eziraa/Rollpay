import { Outlet } from "react-router";
import { Header } from "../../../sections/header/header";
import { LeftMenu } from "../utils/leftmenu/leftmenu";
import { DashboardBody, DashboardContainer } from "./dashboard.style";

export const AdminDashBoard = () => {
  return (
    <DashboardContainer>
      <Header />
      <DashboardBody>
        <LeftMenu />
        <Outlet />
      </DashboardBody>
    </DashboardContainer>
  );
};
