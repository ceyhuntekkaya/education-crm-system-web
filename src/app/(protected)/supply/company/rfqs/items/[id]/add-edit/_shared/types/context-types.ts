import { RFQItemDto, ApiResponsePageCategoryDto } from "@/types";

/**
 * RFQ Item Add/Edit Context Type
 */
export interface RFQItemAddEditContextType {
  // RFQ ID
  rfqId: number;

  // Current item data
  item: RFQItemDto | null;
  itemDetailLoading: boolean; // Sadece veri çekerken
  itemSubmitLoading: boolean; // Form submit edilirken
  itemError: string | null;

  // Edit mode state
  isEditing: boolean;
  itemId: string | null;

  // Actions
  fetchItem: () => void;
  postItem: (data: any) => Promise<any>;
  putItem: (data: any) => Promise<any>;

  // Categories data
  categoriesResponse: ApiResponsePageCategoryDto | null;
  categoriesLoading: boolean;
}
