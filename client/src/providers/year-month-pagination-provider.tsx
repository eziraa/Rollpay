import { useState } from "react";
import { YearMonthPaginationContext } from "../contexts/month-year-pagination";

export const YearMonthPaginationProvider = () => {
  const [year, setYear] = useState(1);
  const [month, setMonth] = useState(1);
  return (
    <YearMonthPaginationContext.Provider
      value={{
        year,
        month,
        changeYear: setYear,
        changeMonth: setMonth,
      }}
    ></YearMonthPaginationContext.Provider>
  );
};
