/**
 * Filter utility functions for cleaning and processing filter values
 */

/**
 * Filter value types that are supported
 */
export type FilterValue =
  | string
  | number
  | boolean
  | Array<any>
  | null
  | undefined;

/**
 * Generic filter object type
 */
export type FilterObject = Record<string, FilterValue>;

/**
 * Options for cleaning filters
 */
export interface CleanFiltersOptions {
  trimStrings?: boolean;
  removeEmptyArrays?: boolean;
  removeEmptyStrings?: boolean;
  removeNullish?: boolean;
}

/**
 * Boş ve geçersiz değerleri filtreden temizler
 * Genel amaçlı kullanım için optimize edilmiş
 *
 * @param filters - Temizlenecek filter objesi
 * @param options - Temizleme seçenekleri
 * @returns Temizlenmiş filter objesi
 */
export const cleanFilters = (
  filters: FilterObject,
  options: CleanFiltersOptions = {}
): FilterObject => {
  const {
    trimStrings = true,
    removeEmptyArrays = true,
    removeEmptyStrings = true,
    removeNullish = true,
  } = options;

  return Object.entries(filters).reduce((acc, [key, value]) => {
    // Null, undefined kontrolü
    if (removeNullish && (value === null || value === undefined)) {
      return acc;
    }

    // Empty string kontrolü
    if (removeEmptyStrings && value === "") {
      return acc;
    }

    // Array kontrolü
    if (Array.isArray(value)) {
      if (removeEmptyArrays && value.length === 0) {
        return acc;
      }
      acc[key] = value;
      return acc;
    }

    // String kontrolü
    if (typeof value === "string") {
      const trimmedValue = trimStrings ? value.trim() : value;
      if (removeEmptyStrings && trimmedValue === "") {
        return acc;
      }
      acc[key] = trimmedValue;
      return acc;
    }

    // Boolean kontrolü - her zaman ekle
    if (typeof value === "boolean") {
      acc[key] = value;
      return acc;
    }

    // Number kontrolü - NaN değilse ekle
    if (typeof value === "number" && !isNaN(value)) {
      acc[key] = value;
      return acc;
    }

    // Diğer geçerli değerler
    if (value !== null && value !== undefined) {
      acc[key] = value;
    }

    return acc;
  }, {} as FilterObject);
};

/**
 * Filtrelerin boş olup olmadığını kontrol eder
 *
 * @param filters - Kontrol edilecek filter objesi
 * @returns Filtreler boşsa true, değilse false
 */
export const isEmptyFilters = (
  filters: FilterObject | null | undefined
): boolean => {
  if (!filters) return true;
  const cleanedFilters = cleanFilters(filters);
  return Object.keys(cleanedFilters).length === 0;
};

/**
 * İki filter objesinin eşit olup olmadığını kontrol eder
 *
 * @param filters1 - İlk filter objesi
 * @param filters2 - İkinci filter objesi
 * @returns Eşitse true, değilse false
 */
export const areFiltersEqual = (
  filters1: FilterObject | null | undefined,
  filters2: FilterObject | null | undefined
): boolean => {
  const clean1 = cleanFilters(filters1 || {});
  const clean2 = cleanFilters(filters2 || {});

  const keys1 = Object.keys(clean1);
  const keys2 = Object.keys(clean2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => {
    const value1 = clean1[key];
    const value2 = clean2[key];

    // Array karşılaştırması
    if (Array.isArray(value1) && Array.isArray(value2)) {
      return (
        value1.length === value2.length &&
        value1.every((item, index) => item === value2[index])
      );
    }

    return value1 === value2;
  });
};

/**
 * Filter objesindeki aktif filtrelerin sayısını döndürür
 *
 * @param filters - Sayılacak filter objesi
 * @returns Aktif filtre sayısı
 */
export const getActiveFilterCount = (
  filters: FilterObject | null | undefined
): number => {
  if (!filters) return 0;
  const cleanedFilters = cleanFilters(filters);
  return Object.keys(cleanedFilters).length;
};

/**
 * Belirli bir anahtarı filtrelerden kaldırır
 *
 * @param filters - Mevcut filter objesi
 * @param key - Kaldırılacak anahtar
 * @returns Yeni filter objesi
 */
export const removeFilterKey = (
  filters: FilterObject,
  key: string
): FilterObject => {
  const newFilters = { ...filters };
  delete newFilters[key];
  return cleanFilters(newFilters);
};

/**
 * Filtreleri reset eder (boş obje döndürür)
 *
 * @returns Boş filter objesi
 */
export const resetFilters = (): FilterObject => ({});
