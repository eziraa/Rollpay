import { useContext } from "react";
import { FilterContext } from "../contexts/filter-context";

export const useFilter = () => {
  return useContext(FilterContext);
};
