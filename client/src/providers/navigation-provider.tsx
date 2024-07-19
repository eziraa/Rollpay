import { useState } from "react";
import NavigationContext, { Navigation } from "../contexts/navigation-context";

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [navigation, setNavigation] = useState<Navigation>({
    from: "",
    to: "",
  });

  return (
    <NavigationContext.Provider value={{ navigation, setNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
};
