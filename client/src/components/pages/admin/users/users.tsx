import { Outlet } from "react-router";
import { PageBody } from "../utils/body/page-body";

export const UserPage = () => {
  return (
    <PageBody>
      <Outlet />
    </PageBody>
  );
};
