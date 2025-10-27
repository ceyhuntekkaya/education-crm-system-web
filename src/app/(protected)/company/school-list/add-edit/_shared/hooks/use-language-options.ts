"use client";

import { useMemo } from "react";
import { LanguageType } from "@/enums";

interface UseLanguageOptionsReturn {
  languageOptions: { value: string; label: string }[];
}

/**
 * Dil seçeneklerini sağlayan hook
 * Eğitim dili ve yabancı dil seçimleri için kullanılır
 * @returns Dil seçenekleri array'i
 */
export const useLanguageOptions = (): UseLanguageOptionsReturn => {
  // Dil seçenekleri - LanguageType enum'ından oluşturuldu
  const languageOptions = useMemo(
    () => [
      { value: LanguageType.TURKISH, label: "Türkçe" },
      { value: LanguageType.ENGLISH, label: "İngilizce" },
      { value: LanguageType.GERMAN, label: "Almanca" },
      { value: LanguageType.FRENCH, label: "Fransızca" },
      { value: LanguageType.OTHER, label: "Diğer" },
    ],
    []
  );

  return {
    languageOptions,
  };
};
