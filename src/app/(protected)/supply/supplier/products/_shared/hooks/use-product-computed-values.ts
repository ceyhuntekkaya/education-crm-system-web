import { useMemo } from "react";
import {
  ProductDto,
  ProductDtoStatus,
  ProductDtoStockTrackingType,
} from "@/types";
import { getStatusInfo, getStockInfo, calculatePriceWithTax } from "../utils";
import { StatusInfo, StockInfo } from "../utils/product-helpers";
import { useProductsContext } from "../contexts";

interface UseProductComputedValuesReturn {
  statusInfo: StatusInfo;
  stockInfo: StockInfo;
  priceWithTax: number | undefined;
  isLowStock: boolean;
  isOutOfStock: boolean;
  hasValidId: boolean;
}

/**
 * Product için hesaplanan değerleri döndüren hook
 * Context'ten currentProduct ve currentProductId'yi alır
 */
export const useProductComputedValues = (): UseProductComputedValuesReturn => {
  const { currentProduct: product, currentProductId: productId } =
    useProductsContext();
  const statusInfo = useMemo(
    () => getStatusInfo(product?.status),
    [product?.status],
  );

  const stockInfo = useMemo(
    () =>
      getStockInfo(
        product?.stockTrackingType,
        product?.stockQuantity,
        product?.minStockLevel,
      ),
    [
      product?.stockTrackingType,
      product?.stockQuantity,
      product?.minStockLevel,
    ],
  );

  const priceWithTax = useMemo(
    () => calculatePriceWithTax(product?.basePrice, product?.taxRate),
    [product?.basePrice, product?.taxRate],
  );

  const isLowStock = useMemo(
    () =>
      product?.stockTrackingType === ProductDtoStockTrackingType.LIMITED &&
      product?.stockQuantity !== undefined &&
      product?.minStockLevel !== undefined &&
      product?.stockQuantity <= product?.minStockLevel &&
      product?.stockQuantity > 0,
    [
      product?.stockTrackingType,
      product?.stockQuantity,
      product?.minStockLevel,
    ],
  );

  const isOutOfStock = useMemo(
    () =>
      product?.status === ProductDtoStatus.OUT_OF_STOCK ||
      (product?.stockQuantity !== undefined && product?.stockQuantity === 0),
    [product?.status, product?.stockQuantity],
  );

  const hasValidId = useMemo(() => !!(productId && productId > 0), [productId]);

  return {
    statusInfo,
    stockInfo,
    priceWithTax,
    isLowStock,
    isOutOfStock,
    hasValidId,
  };
};
