import { useState } from "react";
import { YearMonthPaginationContext } from "../contexts/month-year-pagination";

export const YearMonthPaginationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [year, setYear] = useState<number | undefined>(undefined);
  const [month, setMonth] = useState<number | undefined>(undefined);
  return (
    <YearMonthPaginationContext.Provider
      value={{
        year,
        month,
        changeYear: setYear,
        changeMonth: setMonth,
      }}
    >
      {children}
    </YearMonthPaginationContext.Provider>
  );
};
