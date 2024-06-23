import { useContext } from "react";
import { DropDownContainer } from "./drop-down.style";
import { PaginationContext } from "../../../contexts/pagination-context";
import { useAppDispatch } from "../../../utils/custom-hook";
import { loadNextPageRequested } from "../../../store/employee/employee-slice";
import { SelectOption } from "../form-elements/form.style";

function DropDown() {
  const { pagination, setPageSize } = useContext(PaginationContext);
  const dispatcher = useAppDispatch();
  return (
    <DropDownContainer
      name="page"
      onChange={(e) => {
        setPageSize(parseInt(e.currentTarget.value));
        dispatcher(
          loadNextPageRequested(
            "/employee/list" + `?page=${1}&page_size=${e.currentTarget.value}`
          )
        );
      }}
    >
      <SelectOption value="10" selected={pagination?.per_page === 10}>
        10
      </SelectOption>
      <SelectOption value="20" selected={pagination?.per_page === 20}>
        20
      </SelectOption>
      <SelectOption value="30" selected={pagination?.per_page === 30}>
        30
      </SelectOption>
      <SelectOption value="40" selected={pagination?.per_page === 40}>
        40
      </SelectOption>
      <SelectOption value="50" selected={pagination?.per_page === 50}>
        50
      </SelectOption>
    </DropDownContainer>
  );
}

export default DropDown;