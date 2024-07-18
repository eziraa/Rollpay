/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";

export interface Navigation {
  from: string;
  to: string;
}

export interface NavigationContextType {
  navigation: Navigation;
  setNavigation: (navigation: Navigation) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  navigation: {
    from: "",
    to: "",
  },
  setNavigation: (_: Navigation) => {},
});

export default NavigationContext;
