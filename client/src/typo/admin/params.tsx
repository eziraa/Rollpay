export type AddGroupParams = {
  group_name: string;
  permissions: string[];
};

export type EditGroupParams = {
  id: string;
  name: string;
  permissions: string[];
};
