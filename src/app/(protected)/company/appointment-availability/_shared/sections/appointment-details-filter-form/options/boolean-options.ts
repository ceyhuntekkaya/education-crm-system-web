import { BooleanOption } from "../types";

// Boolean options for yes/no selections
export const booleanOptions: BooleanOption[] = [
  { value: "true", label: "Evet" },
  { value: "false", label: "Hayır" },
];

// Helper function for boolean display
export const getBooleanLabel = (value: boolean | undefined): string => {
  if (value === true) return "Evet";
  if (value === false) return "Hayır";
  return "-";
};
