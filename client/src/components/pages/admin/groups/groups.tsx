import { Outlet } from "react-router";
import { PageBody } from "../utils/body/page-body";

export const GroupsPage = () => {
  return (
    <PageBody>
      <Outlet />
    </PageBody>
  );
};
