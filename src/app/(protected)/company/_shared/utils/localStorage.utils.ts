import { SchoolDto } from "@/types";

// localStorage utility fonksiyonları
// Company context için localStorage işlemleri

// localStorage keys
export const STORAGE_KEYS = {
  SELECTED_SCHOOL: "company_selected_school",
} as const;

/**
 * localStorage'dan seçili Kurumu güvenli bir şekilde çeker
 * @returns School object veya null
 */
export const getStoredSelectedSchool = (): SchoolDto | null => {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SELECTED_SCHOOL);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("localStorage'dan seçili Kurum çekilirken hata:", error);
    return null;
  }
};

/**
 * Seçili Kurumu localStorage'a güvenli bir şekilde kaydeder
 * @param school - Kaydedilecek Kurum objesi
 */
export const setStoredSelectedSchool = (school: SchoolDto): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEYS.SELECTED_SCHOOL, JSON.stringify(school));
  } catch (error) {
    console.error("localStorage'a seçili Kurum kaydedilirken hata:", error);
  }
};

/**
 * localStorage'dan seçili Kurum verisini siler
 */
export const removeStoredSelectedSchool = (): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEYS.SELECTED_SCHOOL);
  } catch (error) {
    console.error("localStorage'dan seçili Kurum silinirken hata:", error);
  }
};

/**
 * localStorage'da seçili Kurum verisi var mı kontrol eder
 * @returns boolean
 */
export const hasStoredSelectedSchool = (): boolean => {
  if (typeof window === "undefined") return false;

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SELECTED_SCHOOL);
    return stored !== null;
  } catch (error) {
    console.error("localStorage kontrol edilirken hata:", error);
    return false;
  }
};
