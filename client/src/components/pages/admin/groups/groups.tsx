import { Outlet } from "react-router";
import { PageBody } from "../utils/body/page-body";
import { useNavigation } from "react-router-dom";
import BodyLoader from "../../../utils/loading/body-loading";
export const GroupsPage = () => {
  const isLoading = useNavigation().state === "loading";
  return <PageBody>{isLoading ? <BodyLoader /> : <Outlet />}</PageBody>;
};
