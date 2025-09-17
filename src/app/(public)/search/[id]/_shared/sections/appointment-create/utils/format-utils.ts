/**
 * Formatting utility functions for appointment creation
 */

/**
 * Formats phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("90")) {
    const number = cleaned.slice(2);
    return `+90 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(
      6,
      8
    )} ${number.slice(8)}`;
  }

  if (cleaned.startsWith("0")) {
    const number = cleaned.slice(1);
    return `0${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(
      6,
      8
    )} ${number.slice(8)}`;
  }

  return phone;
};

/**
 * Formats date for display
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

/**
 * Formats time for display
 */
export const formatTime = (time: string): string => {
  return time.slice(0, 5); // HH:MM format
};
