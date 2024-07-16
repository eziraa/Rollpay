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
  selected_permissions: Permission[];
}
export const DisplayPermissions = ({
  permission,
}: {
  permission: PermissionProps;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Step 2
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  ); //

  useEffect(() => {
    setSelectedPermissions(permission.selected_permissions);
  }, []);
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
        <PermissionHeader>
          <BlurredText>All Permissions</BlurredText>
        </PermissionHeader>
        <PermissionFilter>
          <BlurredIcon>
            <FaSearch />
          </BlurredIcon>
          <FilterInput placeholder="filter" />
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

            setSelectedOptions(value);
          }}
        >
          {permission.all_permissions.map((permission) => (
            <option value={permission.codename}>{permission.name}</option>
          ))}
        </Select>
        <ChooseBtn>Choose All</ChooseBtn>
      </PermissionGroup>
      <Adder>
        <SortBtn
          onClick={() => {
            setSelectedPermissions(
              permission.all_permissions.filter((permission) =>
                selectedOptions.includes(permission.codename)
              )
            );
          }}
        >
          <BlurredIcon>
            <GoArrowRight />
          </BlurredIcon>
        </SortBtn>
        <SortBtn>
          <BlurredIcon>
            <GoArrowLeft />
          </BlurredIcon>
        </SortBtn>
      </Adder>
      <PermissionGroup>
        <PermissionHeader>
          <BlurredText>Selected Permissions</BlurredText>
        </PermissionHeader>
        <PermissionFilter>
          <BlurredIcon>
            <FaSearch />
          </BlurredIcon>
          <FilterInput placeholder="filter" />
        </PermissionFilter>
        <Select
          style={{
            width: "100%",
          }}
          multiple
          size={5}
        >
          {selectedPermissions.map((permission) => (
            <option>{permission.name}</option>
          ))}
        </Select>
        <ChooseBtn>Choose All</ChooseBtn>
      </PermissionGroup>
    </PermissionContainer>
  );
};
