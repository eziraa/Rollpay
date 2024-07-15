import { Route } from "react-router-dom";
import { AdminDashBoard } from "../../components/pages/admin/dashboard/dashbord";
import { ModelItem } from "../../components/pages/admin/utils/model/item";
import { AddGroup } from "../../components/pages/admin/add-item/add-item";
export const AdminRouterConfig = () => (
  <Route path="/" element={<AdminDashBoard />}>
    <Route path="" element={<ModelItem />} />
    <Route path="add-group" element={<AddGroup />} />
  </Route>
);
