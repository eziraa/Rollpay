import { FaSearch } from "react-icons/fa";
import { BlurredIcon } from "../icons/icons.style";
import {
  FilterInput,
  PermissionContainer,
  PermissionFilter,
  PermissionGroup,
  PermissionHeader,
  PermissionItem,
  PermissionList,
  BlurredText,
  Header,
  Adder,
  ChooseBtn,
} from "./permission.style";
import { permission_mock_data } from "./permissions_mock_data";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { SortBtn } from "../../../../sections/list-displayer/list-displayer.style";

export const DisplayPermissions = () => {
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
        <PermissionList>
          {permission_mock_data.map((permission_mock) => (
            <PermissionItem>{permission_mock}</PermissionItem>
          ))}
        </PermissionList>
        <ChooseBtn>Choose All</ChooseBtn>
      </PermissionGroup>
      <Adder>
        <SortBtn>
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
          <BlurredText>Selectted Permissions</BlurredText>
        </PermissionHeader>
        <PermissionFilter>
          <BlurredIcon>
            <FaSearch />
          </BlurredIcon>
          <FilterInput placeholder="filter" />
        </PermissionFilter>
        <PermissionList>
          {permission_mock_data.splice(-5).map((permission_mock) => (
            <PermissionItem>{permission_mock}</PermissionItem>
          ))}
        </PermissionList>
        <ChooseBtn>Remove All</ChooseBtn>
      </PermissionGroup>
    </PermissionContainer>
  );
};
