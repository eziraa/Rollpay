import { createContext } from "react";
import { Auth } from "../typo/auth/auth";

export const AuthContext = createContext<Auth>({
  isAuthenticated: false,
  curr_user: {
    user_id: "",
    username: "",
    employeeId: "",
    profile_picture: "",
    role: "",
    employee: {
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
      profile_picture: "",
      employement_contract: "",
      role: "",
    },
  },
  setIsAuthenticated: () => {},
  setCurrUser: () => {},
});
