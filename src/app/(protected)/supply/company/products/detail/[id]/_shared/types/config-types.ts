import { ProductDto, SupplierDto } from "@/types";

/**
 * Config item için temel tip
 */
export interface BaseConfigItem {
  label: string;
  value: (product: ProductDto | null) => React.ReactNode;
  isShowing: (product: ProductDto | null) => boolean;
}

/**
 * Supplier config item için tip
 */
export interface SupplierConfigItem {
  label: string;
  value: (supplier: SupplierDto | null) => React.ReactNode;
  isShowing: (supplier: SupplierDto | null) => boolean;
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
 * Tedarikçi özet bilgileri config tipi (supplier objesi kullanır)
 */
export type SupplierInfoItemConfig = SupplierConfigItem;

/**
 * Ek bilgiler config tipi
 */
export type AdditionalInfoItemConfig = BaseConfigItem;
