import React, { createContext, useContext, useState } from "react";

interface ProfileContextProps {
  profilePictureUrl: string;
  setProfilePictureUrl: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined
);

export const useProfileContext = (): ProfileContextProps => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");

  return (
    <ProfileContext.Provider
      value={{ profilePictureUrl, setProfilePictureUrl }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
