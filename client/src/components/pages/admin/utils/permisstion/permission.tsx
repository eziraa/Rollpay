/* eslint-disable react-hooks/rules-of-hooks */
import { FaSearch } from "react-icons/fa";
import { BlurredIcon } from "../icons/icons.style";
import {
  FilterInput,
  PermissionContainer,
  PermissionFilter,
  PermissionGroup,
  PermissionHeader,
  BlurredText,
  Header,
  Adder,
  ChooseBtn,
} from "./permission.style";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { SortBtn } from "../../../../sections/list-displayer/list-displayer.style";
import { Select } from "../dropdown/dropdown.style";
import { Permission } from "../../../../../typo/admin/response";
import { useEffect, useState } from "react";

interface PermissionProps {
  all_permissions: Permission[];
  selectedPermissions: Permission[];
  selectHandler: (permissions: Permission[]) => void;
}

export const DisplayPermissions = ({
  permission,
}: {
  permission: PermissionProps;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Step 2
  const [removedOptions, setRemovedOptions] = useState<string[]>([]); // Step 2
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [removeAll, setRemoveAll] = useState<boolean>(false);
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  );
  const [filterAll, setFilterAll] = useState<string>("");
  const [filterSelected, setFilterSelected] = useState<string>("");
  useEffect(() => {
    setPermissions(permission.all_permissions);
    setSelectedPermissions(permission.selectedPermissions);
    setSelectedOptions(
      permission.selectedPermissions.map((permission) => permission.codename)
    );
  }, [permission]);
  //

  useEffect(() => {
    setPermissions(
      permission.all_permissions.filter((permission) =>
        permission.name?.toLowerCase().includes(filterAll?.toLowerCase())
      )
    );
  }, [filterAll, permission.all_permissions]);

  useEffect(() => {
    setSelectedPermissions(
      permission.selectedPermissions.filter((permission) =>
        permission.name.toLowerCase().includes(filterSelected.toLowerCase())
      )
    );
  }, [filterSelected, permission.selectedPermissions]);

  return (
    <PermissionContainer>
      <Header>
        <BlurredText
          style={{
            fontSize: "1.8rem",
          }}
        >
          Permissions
        </BlurredText>
      </Header>
      <PermissionGroup>
        <PermissionHeader className="drop-shadow-md">
          <p className="text-slate-50 ">All Permissions</p>
        </PermissionHeader>
        <PermissionFilter>
          <BlurredIcon>
            <FaSearch />
          </BlurredIcon>
          <FilterInput
            placeholder="filter"
            onChange={(e) => {
              e.preventDefault();
              if (e.target.value !== "") {
                setFilterAll(e.target.value);
              } else {
                setFilterAll(" ");
              }
            }}
          />
        </PermissionFilter>
        <Select
          style={{
            width: "100%",
          }}
          multiple
          size={5}
          onChange={(event) => {
            const options = event.target.options;
            const value: string[] = [];
            Array.from(options).forEach((option) => {
              if (option.selected) {
                value.push(option.value);
              }
            });

            setSelectedOptions(
              Array.from(new Set([...selectedOptions, ...value]))
            );
          }}
        >
          {permissions.map((permission) => (
            <option
              selected={
                selectAll || selectedOptions.includes(permission.codename)
              }
              value={permission.codename}
            >
              {permission.name}
            </option>
          ))}
        </Select>
        <ChooseBtn
          onClick={(e) => {
            e.preventDefault();
            setSelectAll(true);
          }}
        >
          Choose All
        </ChooseBtn>
      </PermissionGroup>
      <Adder>
        <SortBtn
          onClick={() => {
            permission.selectHandler(
              selectAll
                ? permission.all_permissions
                : permission.all_permissions.filter((permission) => {
                    return selectedOptions.includes(permission.codename);
                  })
            );
          }}
        >
          <BlurredIcon>
            <GoArrowRight size={20} />
          </BlurredIcon>
        </SortBtn>
        <SortBtn
          onClick={() => {
            permission.selectHandler(
              removeAll
                ? []
                : selectedPermissions.filter(
                    (permission) =>
                      !removedOptions.includes(permission.codename)
                  )
            );
          }}
        >
          <BlurredIcon>
            <GoArrowLeft size={20} />
          </BlurredIcon>
        </SortBtn>
      </Adder>
      <PermissionGroup>
        <PermissionHeader>
          <p className="text-slate-50">Selected Permissions</p>
        </PermissionHeader>
        <PermissionFilter>
          <BlurredIcon>
            <FaSearch />
          </BlurredIcon>
          <FilterInput
            placeholder="filter"
            onChange={(e) => {
              e.preventDefault();
              if (e.target.value !== "") {
                setFilterSelected(e.target.value);
              } else {
                setFilterSelected(" ");
              }
            }}
          />
        </PermissionFilter>
        <Select
          style={{
            width: "100%",
          }}
          multiple
          size={5}
          onChange={(event) => {
            const { options } = event.target;
            const value: string[] = [];
            for (let i = 0, len = options.length; i < len; i++) {
              if (options[i].selected) {
                value.push(options[i].value);
              }
            }

            setRemovedOptions(
              Array.from(new Set([...removedOptions, ...value]))
            );
          }}
        >
          {selectedPermissions.map((permission) => (
            <option
              selected={
                removeAll || removedOptions.includes(permission.codename)
              }
              value={permission.codename}
            >
              {permission.name}
            </option>
          ))}
        </Select>
        <ChooseBtn
          onClick={(e) => {
            e.preventDefault();
            setRemoveAll(true);
          }}
        >
          Remove All
        </ChooseBtn>
      </PermissionGroup>
    </PermissionContainer>
  );
};
