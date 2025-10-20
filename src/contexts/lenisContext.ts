import { createContext } from "react";
import Lenis from "lenis";

interface LenisContextType {
  lenis: Lenis | null;
}

export const LenisContext = createContext<LenisContextType>({ lenis: null });
