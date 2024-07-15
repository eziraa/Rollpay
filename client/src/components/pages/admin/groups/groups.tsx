import { Outlet } from "react-router";
import { PageBody } from "./group.style";

export const GroupsPage = () => {
  return (
    <PageBody>
      <Outlet />
    </PageBody>
  );
};
