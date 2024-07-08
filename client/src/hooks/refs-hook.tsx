import { useContext } from "react";
import { RefsContext } from "../contexts/refs-context";

export const useRefs = () => useContext(RefsContext);
