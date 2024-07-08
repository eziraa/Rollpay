import { useState } from "react";
import { RefsContext, RefsInterface } from "../contexts/refs-context";

export const RefsProvider = ({ children }: { children: React.ReactNode }) => {
  const [refs, setRefs] = useState<RefsInterface | null>(null);

  return (
    <RefsContext.Provider value={{ refs: refs, setRefs }}>
      {children}
    </RefsContext.Provider>
  );
};
