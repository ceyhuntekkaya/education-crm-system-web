/**
 * Get display text for message priority
 */
export const getPriorityDisplay = (priority?: string): string => {
  if (!priority) return "Belirsiz";

  switch (priority.toUpperCase()) {
    case "LOW":
      return "Düşük";
    case "NORMAL":
      return "Normal";
    case "HIGH":
      return "Yüksek";
    case "URGENT":
      return "Acil";
    case "CRITICAL":
      return "Kritik";
    default:
      return priority;
  }
};
