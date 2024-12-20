import { DropDownContainer } from "./drop-down.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import { SelectOption } from "../form-elements/form.style";
import { loadNextEmployeeListPage } from "../../../store/employee/employee-slice";
import { loadNextPaymentListPage } from "../../../store/salary/salary-slice";
import { Pagination } from "../../../typo/utils/response";

function DropDown({ pagination }: { pagination: Pagination }) {
  const dispatcher = useAppDispatch();

  return (
    <DropDownContainer
      name="page"
      value={pagination?.page_size || 10}
      onChange={(e) => {
        pagination.type === "employee" &&
          dispatcher(
            loadNextEmployeeListPage(
              `/${pagination.type}/list` +
                `?page=${1}&page_size=${e.currentTarget.value}`
            )
          );

        pagination.type === "salary" &&
          dispatcher(
            loadNextPaymentListPage(
              `/employee/${pagination.type}/get` +
                `?page=${1}&page_size=${e.currentTarget.value}`
            )
          );
      }}
    >
      <SelectOption value="5">5</SelectOption>
      <SelectOption value="10">10</SelectOption>
      <SelectOption value="20">20</SelectOption>
      <SelectOption value="30">30</SelectOption>
      <SelectOption value="40">40</SelectOption>
      <SelectOption value="50">50</SelectOption>
    </DropDownContainer>
  );
}

export default DropDown;
