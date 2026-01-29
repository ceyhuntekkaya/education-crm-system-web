export * from "./api";
// _shared/hooks'tan sadece ihtiyaç duyulan export'lar
export {
  useProductSections,
  useSupplierSections,
} from "../../../../_shared/hooks";
// Local hook'lar (context'ten veri alan versiyonlar)
export * from "./use-product-image-gallery";
