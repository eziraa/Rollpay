import { createContext } from "react";
import { Auth } from "../typo/auth/auth";

export const AuthContext = createContext<Auth>({
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
    role: "",
  },
  setIsAuthenticated: () => {},
  setCurrUser: () => {},
});
