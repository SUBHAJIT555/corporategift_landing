import { useContext } from "react";
import { LenisContext } from "../contexts/lenisContext";

export const useLenisContext = () => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenisContext must be used within a LenisProvider");
  }
  return context;
};
