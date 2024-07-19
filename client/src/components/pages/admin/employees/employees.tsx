import { Outlet } from "react-router";
import { PageBody } from "../utils/body/page-body";

export const EmployeePage = () => {
  return (
    <PageBody>
      <Outlet />
    </PageBody>
  );
};
