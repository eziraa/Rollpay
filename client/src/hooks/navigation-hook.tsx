/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from "react";
import NavigationContext from "../contexts/navigation-context";

export const useNavigation = () => useContext(NavigationContext);
