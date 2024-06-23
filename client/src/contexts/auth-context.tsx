import { createContext, useContext, useState } from "react";
import { Auth } from "../typo/auth/auth";
import { CurrentUser } from "../typo/user/states";

const AuthContext = createContext<Auth>({
  isAuthenticated: false,
  curr_user: {
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
  },
  setIsAuthenticated: () => {},
  setCurrUser: () => {},
});

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
  });

  return (
    <AuthContext.Provider
      value={{ curr_user, setCurrUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
