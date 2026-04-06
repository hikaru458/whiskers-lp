"use client";

import { createContext, useContext, useState } from "react";

type Target = "biz" | "creator";

const TargetContext = createContext<{
  target: Target;
  setTarget: (t: Target) => void;
}>({ target: "biz", setTarget: () => {} });

export function TargetProvider({ children }: { children: React.ReactNode }) {
  const [target, setTarget] = useState<Target>("biz");
  return (
    <TargetContext.Provider value={{ target, setTarget }}>
      {children}
    </TargetContext.Provider>
  );
}

export const useTarget = () => useContext(TargetContext);
