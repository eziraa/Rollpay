import { Option, Select } from "./dropdown.style";

export const DropDown = () => {
  return (
    <Select>
      <Option value=""> action</Option>
      <Option value="1">Delete</Option>
      <Option value="2">inactive</Option>
      <Option value="3">edit</Option>
    </Select>
  );
};
