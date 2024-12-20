/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";

export interface SalaryRange {
  min: number;
  max: number;
}

export interface DateRange {
  from: string;
  to: string;
}

export interface EmployeeFilter {
  filter_by: string;
  order_by: string;
  order: string;
  position: string;
  salary_range: SalaryRange | undefined;
  date_of_hire_range: DateRange | undefined;
}

export interface FilterContextType {
  filter: EmployeeFilter;
  setFilter: (filter: EmployeeFilter) => void;
  resetFilter: () => void;
}

export const initialFilter: EmployeeFilter = {
  filter_by: "",
  order_by: "",
  order: "",
  position: "",
  salary_range: {
    min: 0,
    max: 0,
  },
  date_of_hire_range: {
    from: "",
    to: "",
  },
};
export const FilterContext = createContext<FilterContextType>({
  filter: initialFilter,
  setFilter: () => {},
  resetFilter: () => {},
});
