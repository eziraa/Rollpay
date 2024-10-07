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
import { Group } from "../../../../../typo/admin/response";
import { useEffect, useState } from "react";

interface GroupProps {
  all_groups: Group[];
  selectedGroups: Group[];
  selectHandler: (groups: Group[]) => void;
}

export const DisplayGroups = ({ group }: { group: GroupProps }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Step 2
  const [removedOptions, setRemovedOptions] = useState<string[]>([]); // Step 2
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [removeAll, setRemoveAll] = useState<boolean>(false);
  const [selectedGroups, setSelectedGroups] = useState<Group[]>([]);
  const [filterAll, setFilterAll] = useState<string>("");
  const [filterSelected, setFilterSelected] = useState<string>("");
  useEffect(() => {
    setGroups(group.all_groups);
    setSelectedGroups(group.selectedGroups);
    setSelectedOptions(group.selectedGroups.map((group) => group.name));
  }, [group]);
  //

  useEffect(() => {
    setGroups(
      group.all_groups.filter((group) =>
        group.name?.toLowerCase().includes(filterAll?.toLowerCase())
      )
    );
  }, [filterAll, group.all_groups]);

  useEffect(() => {
    setSelectedGroups(
      group.selectedGroups.filter((group) =>
        group.name.toLowerCase().includes(filterSelected.toLowerCase())
      )
    );
  }, [filterSelected, group.selectedGroups]);

  return (
    <PermissionContainer>
      <Header>
        <BlurredText
          style={{
            fontSize: "1.8rem",
          }}
        >
          Groups
        </BlurredText>
      </Header>
      <PermissionGroup>
        <PermissionHeader className="drop-shadow-md">
          <p className="text-slate-50 ">All Groups</p>
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
          {groups.map((group) => (
            <option
              selected={selectAll || selectedOptions.includes(group.name)}
              value={group.name}
            >
              {group.name}
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
            group.selectHandler(
              selectAll
                ? group.all_groups
                : groups.filter((group) => selectedOptions.includes(group.name))
            );
          }}
        >
          <BlurredIcon>
            <GoArrowRight size={20} />
          </BlurredIcon>
        </SortBtn>
        <SortBtn
          onClick={() => {
            group.selectHandler(
              removeAll
                ? []
                : selectedGroups.filter(
                    (group) => !removedOptions.includes(group.name)
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
          <p className="text-slate-50">Selected Groups</p>
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
          {selectedGroups.map((group) => (
            <option
              selected={removeAll || removedOptions.includes(group.name)}
              value={group.name}
            >
              {group.name}
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
