import { useState } from "react";
import { CurrentUser } from "../typo/user/states";
import { AuthContext } from "../contexts/auth-context";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [curr_user, setCurrUser] = useState<CurrentUser>({
    id: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    gender: "",
    date_of_birth: "",
    date_of_hire: "",
    position: "",
    salary: 0,
    role: "",
  });

  return (
    <AuthContext.Provider
      value={{ curr_user, setCurrUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
