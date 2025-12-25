// Mock API types for Products (MD dosyasından alınan bilgiler)

export type SearchProductsStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "OUT_OF_STOCK"
  | "DISCONTINUED";

export interface SearchProductsParams {
  searchTerm?: string;
  categoryId?: number;
  supplierId?: number;
  status?: SearchProductsStatus;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
}

export interface ProductDto {
  id?: number;
  name?: string;
  description?: string;
  sku?: string;
  categoryId?: number;
  categoryName?: string;
  supplierId?: number;
  supplierName?: string;
  unitPrice?: number;
  currency?: string;
  taxRate?: number;
  stockTrackingType?: string;
  currentStock?: number;
  minStockLevel?: number;
  maxStockLevel?: number;
  reorderLevel?: number;
  leadTimeDays?: number;
  imageUrl?: string;
  status?: SearchProductsStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface PageProductDto {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: ProductDto[];
  number?: number;
  page?: number;
  sort?: any;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: any;
  empty?: boolean;
}

export interface ApiResponsePageProductDto {
  success?: boolean;
  message?: string;
  data?: PageProductDto;
  timestamp?: string;
  path?: string;
}

// Mock hook function
export const useSearchProducts = {
  fetcher: (params: SearchProductsParams) => async () => {
    // Mock API call - gerçek implementasyonda bu axios veya fetch ile değiştirilecek
    console.log("🔍 Mock API Call - Search Products:", params);

    return {
      success: true,
      data: {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: params.size || 20,
        number: params.page || 0,
        page: params.page || 0,
        first: true,
        last: true,
        empty: true,
      },
      message: "Mock response",
    } as ApiResponsePageProductDto;
  },
};

// Export constants
export const SearchProductsStatus = {
  ACTIVE: "ACTIVE" as const,
  INACTIVE: "INACTIVE" as const,
  OUT_OF_STOCK: "OUT_OF_STOCK" as const,
  DISCONTINUED: "DISCONTINUED" as const,
};
