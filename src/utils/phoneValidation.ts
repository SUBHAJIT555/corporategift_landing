import { z } from "zod";

/**
 * UAE Phone Number Validation System
 * 
 * Validates UAE phone numbers in international format only (no local format with 0).
 * Mobile: 9 digits starting with 5[02345678] (e.g., 501234567)
 * Landline: 8 digits starting with 2, 3, 4, 6, 7, or 9 (e.g., 41234567)
 * 
 * UI shows +971 prefix; user enters only the number part.
 */

// UAE phone regex pattern - International format only (no local format with 0)
// Matches: 5[02345678]\d{7} (mobile) OR [234679]\d{7} (landline)
// Since +971 is already displayed, user only enters the number part
const uaePhoneRegex = /^(?:5[02345678]\d{7}|[234679]\d{7})$/;

// Zod schema for UAE phone validation - International format only
export const uaePhoneSchema = z
  .string()
  .min(1, "Phone is required")
  .max(9, "Phone number must be 8-9 digits")
  .refine(
    (phone) => {
      const normalized = phone.replace(/\s/g, "");
      return uaePhoneRegex.test(normalized);
    },
    {
      message: "Please enter a valid UAE phone number (8-9 digits)",
    }
  );

/**
 * Validation function for react-hook-form
 * @param phone - Phone number string to validate (without +971 prefix)
 * @returns true if valid, error message string if invalid
 */
export const validateUAEPhone = (phone: string): boolean | string => {
  const result = uaePhoneSchema.safeParse(phone);
  if (!result.success) {
    return result.error.issues[0]?.message || "Please enter a valid UAE phone number";
  }
  return true;
};

/**
 * Normalize phone number on form submission - add +971 prefix
 * Since user only enters international format (no 0 prefix), just add +971
 * @param phone - Phone number string (without +971 prefix)
 * @returns Normalized phone number with +971 prefix (e.g., "+971501234567")
 */
export const normalizePhoneForSubmission = (phone: string): string => {
  if (!phone) return phone;
  
  // Remove spaces
  const cleaned = phone.replace(/\s/g, "");
  
  // Add +971 prefix (user already entered international format)
  return "+971" + cleaned;
};

/**
 * Simple formatter - only allow digits (no 0 prefix, no + since +971 is already shown)
 * @param value - Raw input value from user
 * @returns Formatted phone number string (digits only, no leading 0)
 */
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");
  
  // Prevent leading 0 (only international format allowed)
  if (digits.startsWith("0")) {
    return digits.slice(1);
  }
  
  return digits;
};

/**
 * Get maximum length for phone input based on whether it's mobile or landline
 * Mobile: 9 digits (starts with 5[02345678])
 * Landline: 8 digits (starts with 2, 3, 4, 6, 7, or 9)
 * @param phone - Current phone value
 * @returns Maximum length (8 or 9)
 */
export const getPhoneMaxLength = (phone: string): number => {
  const cleaned = phone.replace(/\D/g, "");
  // Mobile: 9 digits starting with 5[02345678]
  if (cleaned.startsWith("5") && /^5[02345678]/.test(cleaned)) {
    return 9;
  }
  // Landline: 8 digits starting with 2, 3, 4, 6, 7, or 9
  return 8;
};

/**
 * Handler for React Hook Form onChange events
 * Formats phone number as user types (digits only, no leading 0)
 * Handles both patterns:
 * - New pattern: User enters only digits (no +971 prefix)
 * - Old pattern: Strips +971 prefix if present for backward compatibility
 * 
 * Usage with separate +971 prefix display (recommended):
 * ```tsx
 * <div className="flex">
 *   <span>+971</span>
 *   <input
 *     value={field.value}
 *     onChange={(e) => {
 *       const formatted = formatPhoneNumber(e.target.value);
 *       field.onChange(formatted);
 *     }}
 *   />
 * </div>
 * ```
 * 
 * Or use this helper for backward compatibility:
 * ```tsx
 * onChange={(e) => {
 *   handlePhoneChange(e);
 *   field.onChange(e.target.value);
 * }}
 * ```
 * 
 * @param e - React change event
 */
export const handlePhoneChange = (
  e: React.ChangeEvent<HTMLInputElement>
): void => {
  const input = e.target;
  let value = input.value;
  
  // Remove +971 prefix if present (for backward compatibility with old pattern)
  if (value.startsWith("+971")) {
    value = value.slice(4);
  } else if (value.startsWith("971")) {
    value = value.slice(3);
  } else if (value.startsWith("00971")) {
    value = value.slice(5);
  }
  
  // Format: digits only, no leading 0
  const formatted = formatPhoneNumber(value);
  input.value = formatted;
};

/**
 * UAE country code prefix (for display purposes)
 */
export const PHONE_PREFIX = "+971";

/**
 * Handler for React Hook Form onKeyDown events
 * Prevents deletion of "+971" prefix (if using old pattern)
 * For new pattern with separate prefix display, this is not needed
 * @param e - React keyboard event
 * @param fieldValue - Current field value
 */
export const handlePhoneKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  fieldValue: string
): void => {
  // For new implementation with separate +971 prefix, this is not needed
  // Kept for backward compatibility with old pattern
  const input = e.currentTarget;
  const cursorPos = input.selectionStart || 0;
  const hasSelection = input.selectionStart !== input.selectionEnd;

  // Only prevent deletion if using old pattern where +971 is in the input
  if (
    (e.key === "Backspace" || e.key === "Delete") &&
    fieldValue?.startsWith(PHONE_PREFIX) &&
    cursorPos <= PHONE_PREFIX.length &&
    !hasSelection
  ) {
    e.preventDefault();
  }
};
