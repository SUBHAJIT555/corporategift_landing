import { useEffect } from "react";
import type { Path, PathValue } from "react-hook-form";

/**
 * Custom hook for UTM parameter tracking
 *
 * This hook:
 * 1. Reads UTM parameters from the URL
 * 2. Saves them to localStorage if present
 * 3. Loads UTM values from localStorage and sets them in the form
 *
 * @param setValue - The setValue function from react-hook-form
 */
export function useUTMTracking<T extends Record<string, unknown>>(
  setValue: (key: Path<T>, value: PathValue<T, Path<T>>) => void
) {
  useEffect(() => {
    const utmKeys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ] as const;

    const params = new URLSearchParams(window.location.search);

    // 1️⃣ Save UTMs to localStorage (if present in URL)
    utmKeys.forEach((key) => {
      const value = params.get(key);
      if (value) {
        localStorage.setItem(key, value);
      }
    });

    // 2️⃣ Load UTMs from localStorage into the form
    utmKeys.forEach((key) => {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        setValue(key as Path<T>, storedValue as PathValue<T, Path<T>>);
      }
    });
  }, [setValue]);
}
