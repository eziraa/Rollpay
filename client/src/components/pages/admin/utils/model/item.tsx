// import { FaSearch } from "react-icons/fa";
// import {
//   ActionButton,
//   ActionContainer,
//   ItemBody,
//   ItemContainer,
//   ItemHeader,
//   ItemInput,
//   ItemTitle,
//   SearchButton,
//   SearchContainer,
// } from "./item.style";
// import { BlurredIcon } from "../icons/icons.style";
// import { Label } from "../dropdown/dropdown.style";
// import { DropDown } from "../dropdown/dropdown";
// import { DisplayUsers } from "../custom-table/custom.table";
// import { AddBtn } from "../../../../sections/add_employee/add-employee.style";
// import { useNavigate } from "react-router";

// export const ModelItem = () => {
//   const navigate = useNavigate();
//   return (
//     <ItemContainer>
//       <ItemHeader>
//         <ItemTitle>Manage Groups</ItemTitle>
//         <AddBtn
//           onClick={(e) => {
//             e.stopPropagation();
//             e.preventDefault();
//             navigate("add-group");
//           }}
//         >
//           Add New
//         </AddBtn>
//       </ItemHeader>
//       <ItemBody>
//         <SearchContainer>
//           <BlurredIcon>
//             <FaSearch />
//           </BlurredIcon>
//           <ItemInput placeholder="" />
//           <SearchButton>Search</SearchButton>
//         </SearchContainer>
//         <ActionContainer>
//           <Label>Action:</Label>
//           <DropDown />
//           <ActionButton>Apply</ActionButton>
//         </ActionContainer>
//         <DisplayUsers />
//       </ItemBody>
//     </ItemContainer>
//   );
// };
