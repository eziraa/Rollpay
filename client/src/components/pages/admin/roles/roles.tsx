import { Outlet } from "react-router";
import { PageBody } from "../utils/body/page-body";

export const RolePage = () => {
  return (
    <PageBody>
      <Outlet />
    </PageBody>
  );
};
