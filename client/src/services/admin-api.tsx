import { AxiosError } from "axios";
import api from "../config/api";
import {
  AddGroupParams,
  AddRoleParams,
  AddUserParams,
  EditGroupParams,
  EditRoleParams,
  EditUserParams,
} from "../typo/admin/params";

/**
 * @returns a list of usrs
 */
const getUsers = async (user_id = "") => {
  const users = await api
    .get("user/list" + (user_id ? `/${user_id}` : ""))
    .then((res) => {
      return {
        users: res.data,
        code: res.status,
        success: "Success getting users",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return users;
};

const getEmployees = async () => {
  const users = await api
    .get("employee/admin")
    .then((res) => {
      return {
        employees: res.data,
        code: res.status,
        success: "Success getting users",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return users;
};

const getRoles = async (role_id = "") => {
  const roles = await api
    .get("role/list" + (role_id ? `/${role_id}` : ""))
    .then((res) => {
      return {
        roles: res.data,
        code: res.status,
        success: "Success getting roles",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return roles;
};

const getGroups = async (group_id = "") => {
  const groups = await api
    .get("group/list" + (group_id ? `/${group_id}` : ""))
    .then((res) => {
      return {
        groups: res.data,
        code: res.status,
        success: "Success getting groups",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return groups;
};

const getPermissions = async () => {
  const groups = await api
    .get("permission/list")
    .then((res) => {
      return {
        permissions: res.data,
        code: res.status,
        success: "Success getting permissions",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return groups;
};

const addGroup = async (values: AddGroupParams) => {
  const groups = await api
    .post("/group/add", values)
    .then((res) => {
      return {
        group: res.data,
        code: res.status,
        success: "Success adding group",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return groups;
};

const editGroup = async (values: EditGroupParams) => {
  const groups = await api
    .put("/group/edit", values)
    .then((res) => {
      return {
        group: res.data,
        code: res.status,
        success: "Edit Group Success",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return groups;
};

const deleteGroup = async (values: string[]) => {
  const groups = await api
    .delete("/group/delete", { data: { groups: values } })
    .then((res) => {
      return {
        groups: res.data,
        code: res.status,
        success: "Group deleted successfully",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return groups;
};

const addUser = async (values: AddUserParams) => {
  const users = await api
    .post("/user/add", values)
    .then((res) => {
      return {
        user: res.data,
        code: res.status,
        success: "Success adding user",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return users;
};

const editUser = async (values: EditUserParams) => {
  const users = await api
    .put("/user/edit", values)
    .then((res) => {
      return {
        user: res.data,
        code: res.status,
        success: "Edit User Success",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return users;
};

const deleteUser = async (values: string[]) => {
  const users = await api
    .delete("/user/delete", { data: { users: values } })
    .then((res) => {
      return {
        users: res.data,
        code: res.status,
        success: "User deleted successfully",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return users;
};

const deleteEmployee = async (values: string[]) => {
  const users = await api
    .delete("/employee/admin/delete", { data: { employees: values } })
    .then((res) => {
      return {
        employees: res.data,
        code: res.status,
        success: "Employee deleted successfully",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return users;
};
const addRole = async (values: AddRoleParams) => {
  const users = await api
    .post("/role/add", values)
    .then((res) => {
      return {
        role: res.data,
        code: res.status,
        success: "Success adding role",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return users;
};

const editRole = async (values: EditRoleParams) => {
  const roles = await api
    .put("/role/edit", values)
    .then((res) => {
      return {
        role: res.data,
        code: res.status,
        success: "Edit Role Success",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return roles;
};

const deleteRole = async (values: string[]) => {
  const roles = await api
    .delete("/role/delete", { data: { roles: values } })
    .then((res) => {
      return {
        roles: res.data,
        code: res.status,
        success: "Role deleted successfully",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return roles;
};

const activateUser = async (user_id: string) =>
  await api
    .patch("/user/activate", {
      user_id: user_id,
    })
    .then((res) => {
      return {
        user: { ...res.data },
        success: " success",
        code: res.status,
      };
    })
    .catch((err) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

const AdminAPI = {
  getRoles,
  getUsers,
  getGroups,
  getEmployees,
  getPermissions,
  addGroup,
  deleteGroup,
  editGroup,
  addUser,
  deleteUser,
  editUser,
  deleteEmployee,
  addRole,
  deleteRole,
  editRole,
  activateUser,
};

export default AdminAPI;
