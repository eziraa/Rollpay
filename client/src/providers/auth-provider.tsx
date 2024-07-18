import { useState } from "react";
import { AuthContext } from "../contexts/auth-context";
import { UserResponse } from "../typo/user/response";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [curr_user, setCurrUser] = useState<UserResponse>({
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
  });

  return (
    <AuthContext.Provider
      value={{ curr_user, setCurrUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
