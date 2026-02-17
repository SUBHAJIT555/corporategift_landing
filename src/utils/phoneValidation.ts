/**
 * Dubai/UAE Phone Number Validation Utilities
 * 
 * Validates and formats UAE mobile numbers for Dubai/UAE.
 * Used across all forms that require phone number input.
 */

export const PHONE_PREFIX = "+971"; // UAE country code
export const PHONE_DIGITS_LENGTH = 9; // Number of digits after country code

// UAE phone validation regex: allows +971, 00971, 0 prefix or no prefix
// Valid prefixes: 50, 51, 52, 55, 56, 2, 3, 4, 6, 7, 9 followed by 7 digits
export const UAE_PHONE_REGEX = /^(?:\+971|00971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{7}$/;

/**
 * Normalizes phone number to +971 format
 * @param value - Raw input value from user
 * @returns Normalized phone number string (e.g., "+971501234567")
 */
export const normalizePhoneNumber = (value: string): string => {
  if (!value) return "";
  
  // Remove all non-digit characters except +
  let cleaned = value.replace(/[^\d+]/g, "");

  // Handle different prefix formats and convert to +971
  if (cleaned.startsWith("00971")) {
    cleaned = "+971" + cleaned.slice(5);
  } else if (cleaned.startsWith("971")) {
    cleaned = "+" + cleaned;
  } else if (cleaned.startsWith("0") && cleaned.length > 1) {
    // Remove leading 0 and add +971
    cleaned = "+971" + cleaned.slice(1);
  } else if (!cleaned.startsWith("+971") && cleaned.length > 0) {
    // If no prefix, add +971
    cleaned = "+971" + cleaned;
  }

  // Extract only digits after +971 and limit to 9 digits
  if (cleaned.startsWith("+971")) {
    const digits = cleaned.slice(4).replace(/\D/g, "").slice(0, PHONE_DIGITS_LENGTH);
    return digits ? "+971" + digits : "+971";
  }

  return cleaned;
};

/**
 * Formats phone number input to ensure +971 prefix and proper formatting
 * @param value - Raw input value from user
 * @returns Formatted phone number string (e.g., "+971501234567")
 */
export const formatPhoneNumber = (value: string): string => {
  return normalizePhoneNumber(value);
};

/**
 * Validates UAE phone number format using the new regex
 * @param phone - Phone number string to validate
 * @returns true if valid, error message string if invalid
 */
export const validateUAEPhone = (phone: string): boolean | string => {
  if (!phone) return "Phone is required";

  // Normalize the phone number first (converts to +971 format)
  const normalized = normalizePhoneNumber(phone);
  
  // The regex expects: optional prefix (+971|00971|0) + (50|51|52|55|56|2|3|4|6|7|9) + 7 digits
  // Since normalized format is +971XXXXXXXXX, test it directly
  // The regex should match +971501234567 format
  if (!UAE_PHONE_REGEX.test(normalized)) {
    return "Please enter a valid UAE phone number";
  }

  return true;
};

/**
 * Handler for React Hook Form onChange events
 * Formats phone number as user types with auto +971 formatting
 */
export const handlePhoneChange = (
  e: React.ChangeEvent<HTMLInputElement>
): void => {
  const input = e.target;
  const cursorPos = input.selectionStart || 0;
  const originalLength = input.value.length;

  let val = input.value;

  // Allow backspace down to empty string
  if (val === "") {
    input.value = "";
    return;
  }

  // Remove all non-digit characters except +
  val = val.replace(/[^\d+]/g, "");

  // Handle different prefix formats and convert to +971
  if (val.startsWith("00971")) {
    val = "+971" + val.slice(5);
  } else if (val.startsWith("971")) {
    val = "+" + val;
  } else if (val.startsWith("+971")) {
    // Already has +971, keep it
    val = "+971" + val.slice(4).replace(/\D/g, "");
  } else if (val.startsWith("+97")) {
    val = "+971";
  } else if (val.startsWith("+9") || val.startsWith("9")) {
    val = "+971";
  } else if (val.startsWith("0") && val.length > 1) {
    // Remove leading 0 and add +971
    val = "+971" + val.slice(1);
  } else if (!val.startsWith("+") && val.length > 0) {
    // Auto-add +971 if user starts typing digits
    val = "+971" + val;
  }

  // Extract only digits after +971 and limit to 9 digits
  if (val.startsWith("+971")) {
    const digits = val.slice(4).replace(/\D/g, "").slice(0, PHONE_DIGITS_LENGTH);
    val = digits ? "+971" + digits : "+971";
  }

  // Limit total length to +971 + 9 digits = 13 characters
  if (val.length > 13) val = val.slice(0, 13);

  input.value = val;

  // Adjust cursor position based on length change
  const newLength = val.length;
  const lengthDiff = newLength - originalLength;
  const newCursorPos = Math.max(0, Math.min(cursorPos + lengthDiff, val.length));

  // Restore cursor position
  setTimeout(() => {
    input.setSelectionRange(newCursorPos, newCursorPos);
  }, 0);
};

/**
 * Handler for React Hook Form onKeyDown events
 * Prevents deletion of "+971" prefix
 */
export const handlePhoneKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  fieldValue: string
): void => {
  const input = e.currentTarget;
  const cursorPos = input.selectionStart || 0;
  const hasSelection = input.selectionStart !== input.selectionEnd;

  if (
    (e.key === "Backspace" || e.key === "Delete") &&
    fieldValue.startsWith(PHONE_PREFIX) &&
    cursorPos <= PHONE_PREFIX.length &&
    !hasSelection
  ) {
    e.preventDefault();
  }
};
