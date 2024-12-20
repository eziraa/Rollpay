export type AddGroupParams = {
  group_name: string;
  permissions: string[];
};

export type EditGroupParams = {
  id: string;
  name: string;
  permissions: string[];
};

export type AddUserParams = {
  username: string;
  empID: string;
  password: string;
};

export type EditUserParams = {
  id: string;
  username: string;
  empID: string;
  password: string;
  role: string;
};

export type AddRoleParams = {
  name: string;
  groups: string[];
};

export type EditRoleParams = {
  id: string;
  name: string;
  groups: string[];
};