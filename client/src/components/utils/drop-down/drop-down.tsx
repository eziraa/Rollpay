import { setPagesize } from "../../../store/employee/employee-slice";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { DropDownContainer, DropDownItem } from "./drop-down.style";

function DropDown() {
  const dispatcher = useAppDispatch();
  const { pagination } = useAppSelector((state) => state.employee);

  return (
    <DropDownContainer
      name="page"
      onChange={(e) => {
        dispatcher(setPagesize(Number.parseInt(e.currentTarget.value)));
      }}
    >
      <DropDownItem value="10" selected={pagination?.page_size === 10}>
        10
      </DropDownItem>
      <DropDownItem value="20" selected={pagination?.page_size === 20}>
        20
      </DropDownItem>
      <DropDownItem value="30" selected={pagination?.page_size === 30}>
        30
      </DropDownItem>
      <DropDownItem value="40" selected={pagination?.page_size === 40}>
        40
      </DropDownItem>
      <DropDownItem value="50" selected={pagination?.page_size === 50}>
        50
      </DropDownItem>
    </DropDownContainer>
  );
}

export default DropDown;
