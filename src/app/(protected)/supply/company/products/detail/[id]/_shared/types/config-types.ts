import { ProductDto } from "@/types";

/**
 * Config item için temel tip
 */
export interface BaseConfigItem {
  label: string;
  value: (product: ProductDto | null) => React.ReactNode;
  isShowing: (product: ProductDto | null) => boolean;
}

/**
 * Temel bilgiler config tipi
 */
export type BasicInfoItemConfig = BaseConfigItem;

/**
 * Stok bilgileri config tipi
 */
export type StockInfoItemConfig = BaseConfigItem;

/**
 * Fiyat bilgileri config tipi
 */
export type PriceInfoItemConfig = BaseConfigItem;

/**
 * Tedarik bilgileri config tipi
 */
export type SupplierInfoItemConfig = BaseConfigItem;

/**
 * Ek bilgiler config tipi
 */
export type AdditionalInfoItemConfig = BaseConfigItem;
