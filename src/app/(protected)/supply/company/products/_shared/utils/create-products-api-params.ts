import { SearchProductsParams } from "../api";
import { FormValues } from "@/types";

/**
 * Form değerlerini API search parametrelerine dönüştürür
 *
 * @param values - Form değerleri
 * @returns API search parametreleri
 */
export const createProductsApiParams = (
  values: FormValues
): SearchProductsParams => {
  // Parse number values
  const parseNumber = (value: any): number | undefined => {
    if (!value || value === "" || value === "0") return undefined;
    const numValue = Number(value);
    return !isNaN(numValue) && numValue > 0 ? numValue : undefined;
  };

  // FormRange'den gelen [min, max] array'ini parse et
  let minPrice: number | undefined;
  let maxPrice: number | undefined;

  if (Array.isArray(values.priceRange) && values.priceRange.length === 2) {
    const [min, max] = values.priceRange;
    minPrice = parseNumber(min);
    maxPrice = parseNumber(max);
  }

  const apiParams: SearchProductsParams = {
    searchTerm: values.searchTerm || undefined,
    categoryId: parseNumber(values.categoryId),
    supplierId: parseNumber(values.supplierId),
    status: values.status || undefined,
    minPrice,
    maxPrice,
    page: 0,
    size: 20,
  };

  return apiParams;
};

/**
 * Undefined değerleri API parametrelerinden temizler
 */
export const cleanProductsApiParams = (
  params: SearchProductsParams
): SearchProductsParams => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined)
  ) as SearchProductsParams;
};
