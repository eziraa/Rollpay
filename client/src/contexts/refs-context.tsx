import { RefObject, createContext } from "react";

export interface RefsInterface {
  leftMenuRef: RefObject<HTMLDivElement>;
}

export interface RefsContextType {
  refs: RefsInterface | null;
  setRefs: (refs: RefsInterface) => void;
}
export const RefsContext = createContext<RefsContextType>({
  refs: null,
  setRefs: () => {},
});
