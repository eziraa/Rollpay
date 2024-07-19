import { Navigate, Route } from "react-router-dom";
import { AdminDashBoard } from "../../components/pages/admin/dashboard/dashbord";
import { DisplayUsers } from "../../components/pages/admin/users/display-users";
import { DisplayRoles } from "../../components/pages/admin/roles/display-roles";
import { DisplayGroups } from "../../components/pages/admin/groups/display-groups";
import { AddGroup } from "../../components/pages/admin/groups/add-group";
import { GroupsPage } from "../../components/pages/admin/groups/groups";
import { RolePage } from "../../components/pages/admin/roles/roles";
import { UserPage } from "../../components/pages/admin/users/users";
export const AdminRouterConfig = () => (
  <Route path="/" element={<AdminDashBoard />}>
    <Route path="/users" element={<UserPage />}>
      <Route path="" element={<DisplayUsers />} />
      <Route path="add-user" element={<AddGroup />} />
    </Route>
    <Route path="" element={<Navigate to="users" replace={true} />} />
    <Route path="/groups" element={<GroupsPage />}>
      <Route path="" element={<DisplayGroups />} />
      <Route path="add-group" element={<AddGroup />} />
    </Route>
    <Route path="/roles" element={<RolePage />}>
      <Route path="" element={<DisplayRoles />} />
      <Route path="add-role" element={<AddGroup />} />
    </Route>
  </Route>
);
