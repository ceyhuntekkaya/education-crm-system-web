import { ProductDto } from "@/types";

/**
 * API'den gelen Product verisini form verilerine dönüştürür
 * @param product API'den gelen product verisi
 * @returns Form için hazırlanmış veri
 */
export const transformProductToFormData = (product: ProductDto | null): any => {
  if (!product) return null;

  return {
    supplierId: product.supplierId,
    categoryId: product.categoryId?.toString() || "", // String'e çevir - FormAutocomplete için
    name: product.name || "",
    sku: product.sku || "",
    description: product.description || "",
    technicalSpecs: product.technicalSpecs || "",
    status: product.status || "ACTIVE",
    stockTrackingType: product.stockTrackingType || "UNLIMITED",
    stockQuantity: product.stockQuantity || 0,
    minStockLevel: product.minStockLevel || 0,
    basePrice: product.basePrice || 0,
    currency: product.currency || "TRY",
    taxRate: product.taxRate || 0,
    minOrderQuantity: product.minOrderQuantity || 1,
    deliveryDays: product.deliveryDays || 0,
    mainImageUrl: product.mainImageUrl || "",
  };
};
