import { useState } from "react";
import { EmployeeFilter, FilterContext } from "../contexts/filter-context";

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = useState<EmployeeFilter>({
    filter_by: "",
    order_by: "",
    order: "",
    position: "",
    salary_range: undefined,
    date_of_hire_range: undefined,
    date_of_birth_range: undefined,
  });

  const updateFilter = (newFilter: EmployeeFilter) => {
    setFilter({
      filter_by: newFilter.filter_by || filter?.filter_by,
      order_by: newFilter.order_by || filter?.order_by,
      order: newFilter.order || filter?.order,
      position: newFilter.position || filter?.position,
      date_of_hire_range:
        newFilter.date_of_hire_range || filter?.date_of_hire_range,
      salary_range: newFilter.salary_range || filter?.salary_range,
      date_of_birth_range:
        newFilter.date_of_birth_range || filter?.date_of_birth_range,
    });
  };

  return (
    <FilterContext.Provider value={{ filter: filter, setFilter: updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
