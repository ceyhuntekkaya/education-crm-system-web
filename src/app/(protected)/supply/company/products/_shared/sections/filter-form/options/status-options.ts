import { SearchProductsStatus } from "@/types/dto/supply/product.dto";

export const statusOptions = [
  { value: SearchProductsStatus.ACTIVE, label: "Aktif" },
  { value: SearchProductsStatus.INACTIVE, label: "Pasif" },
  { value: SearchProductsStatus.OUT_OF_STOCK, label: "Stokta Yok" },
  { value: SearchProductsStatus.DISCONTINUED, label: "Üretimi Durduruldu" },
];
