import { DropDownContainer, DropDownItem } from "./drop-down.style";

function DropDown() {
  return (
    <DropDownContainer name="page">
      <DropDownItem value="10">10</DropDownItem>
      <DropDownItem value="20">20</DropDownItem>
      <DropDownItem value="30">30</DropDownItem>
      <DropDownItem value="40">40</DropDownItem>
      <DropDownItem value="50">50</DropDownItem>
    </DropDownContainer>
  );
}

export default DropDown;
