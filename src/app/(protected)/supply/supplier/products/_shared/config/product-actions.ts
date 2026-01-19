import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { ActionButton } from "@/components/layouts/data-collection-layout";

type EmptyStateAction = {
  label: string;
  icon: string;
  onClick: () => void;
};

/**
 * 🎬 PRODUCT ACTION BUTTONS
 * Header action buttons konfigürasyonu
 */
export const createProductActionButtons = (
  router: AppRouterInstance
): ActionButton[] => [
  {
    label: "Yeni Ürün Ekle",
    icon: "ph-plus",
    variant: "primary",
    onClick: () => router.push("/supply/supplier/products/add-edit/new"),
  },
];

/**
 * 🎬 PRODUCT EMPTY STATE ACTION
 * Empty state action button konfigürasyonu
 */
export const createProductEmptyStateAction = (
  router: AppRouterInstance
): EmptyStateAction => ({
  label: "İlk Ürünü Ekle",
  icon: "ph-plus",
  onClick: () => router.push("/supply/supplier/products/add-edit/new"),
});
