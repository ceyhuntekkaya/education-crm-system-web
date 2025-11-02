import { useMemo } from "react";

interface DurationOption {
  label: string;
  value: string;
}

/**
 * Randevu süre seçeneklerini döndüren hook
 */
export const useDurationOptions = (): DurationOption[] => {
  return useMemo(
    () => [
      { label: "15 dakika", value: "15" },
      { label: "30 dakika", value: "30" },
      { label: "45 dakika", value: "45" },
      { label: "60 dakika", value: "60" },
      { label: "90 dakika", value: "90" },
      { label: "120 dakika", value: "120" },
    ],
    []
  );
};
