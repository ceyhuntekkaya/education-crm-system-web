import type { PopoverFilterConfig } from "@/components/layouts/data-collection-layout";

/**
 * 🔍 QUOTATION ITEM POPOVER FILTERS
 * Popover filter konfigürasyonları
 */

// Statik filtreler (şu an için boş, gelecekte eklenebilir)
export const ITEM_POPOVER_FILTERS: PopoverFilterConfig[] = [];

// Backward compatibility için function export et
export const createItemPopoverFilters = (): PopoverFilterConfig[] =>
  ITEM_POPOVER_FILTERS;
