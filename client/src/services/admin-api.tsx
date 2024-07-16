import { AxiosError } from "axios";
import api from "../config/api";
import { AddGroupParams } from "../typo/admin/params";

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
        success: "Success returned overtimes",
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
        success: "Success returned overtimes",
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
        success: "Success returned overtimes",
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
        success: "Success returned overtimes",
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
        success: "Success returned overtimes",
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
};

export default AdminAPI;
