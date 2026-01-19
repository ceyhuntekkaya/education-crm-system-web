import type { PopoverFilterConfig } from "@/components/layouts/data-collection-layout";

/**
 * 🔍 RFQ ITEM POPOVER FILTERS
 * Popover filter konfigürasyonları
 *
 * NOT: Kategori filtresi dinamik olduğu için burada tanımlanmaz.
 * Bunun yerine page.tsx'de uniqueCategories kullanılarak oluşturulur.
 */

// Dinamik kategori filtresi oluşturucu
export const createCategoryFilter = (
  categories: { id: number; name: string }[]
): PopoverFilterConfig => ({
  id: "categoryId",
  fieldName: "categoryId",
  label: "Kategori",
  activeColor: "#8b5cf6",
  activeBackground: "rgba(139, 92, 246, 0.1)",
  options: [
    { value: "ALL", label: "Tüm Kategoriler", icon: "ph-stack" },
    ...categories.map((cat) => ({
      value: String(cat.id),
      label: cat.name,
      icon: "ph-tag",
    })),
  ],
  defaultValue: "ALL",
});

// Statik filtreler (gelecekte eklenebilir)
export const ITEM_POPOVER_FILTERS: PopoverFilterConfig[] = [];

// Backward compatibility için function export et
export const createItemPopoverFilters = (): PopoverFilterConfig[] =>
  ITEM_POPOVER_FILTERS;
