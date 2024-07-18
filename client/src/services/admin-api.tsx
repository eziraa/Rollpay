import { AxiosError } from "axios";
import api from "../config/api";
import { AddGroupParams, EditGroupParams } from "../typo/admin/params";

/**
 * @returns a list of usrs
 */
const getUsers = async () => {
  const users = await api
    .get("user/list")
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

const getRoles = async () => {
  const roles = await api
    .get("role/list")
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

const getGroups = async () => {
  const groups = await api
    .get("group/list")
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

const AdminAPI = {
  getRoles,
  getUsers,
  getGroups,
  getPermissions,
  addGroup,
  deleteGroup,
  editGroup,
};

export default AdminAPI;
