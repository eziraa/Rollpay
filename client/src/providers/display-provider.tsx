import { useState } from "react";
import { DisplayContext, DisplayInterface } from "../contexts/display-context";

export const DisplayProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [display, setDisplay] = useState<DisplayInterface>({
    add_employee: false,
    edit_employee: false,
    list_employees: true,
    see_employee: false,
    see_employee_allowance: false,
    see_employee_deduction: false,
    see_employee_overtime: false,
    see_employee_salary: false,
    see_profile: false,
    search_employee: false,
    search_employee_salary: false,
  });

  return (
    <DisplayContext.Provider value={{ display, setDisplay }}>
      {children}
    </DisplayContext.Provider>
  );
};
