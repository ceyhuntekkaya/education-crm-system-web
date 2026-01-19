import {
  SearchProductsParams,
  ProductResultDto,
  mapProductDtoToResult,
} from "@/types/dto/supply/product.dto";

// Re-export for convenience
export type { ProductResultDto };
export { mapProductDtoToResult };

/**
 * Products Search Context Type - Ürün arama context'inin tipi
 */
export interface ProductsSearchContextType {
  // Arama sonuçları
  searchResults: ProductResultDto[];

  // Kategori seçenekleri
  categories: {
    data: { value: string; label: string }[];
    loading: boolean;
    error: any;
  };

  // Supplier seçenekleri
  suppliers: {
    data: { value: string; label: string }[];
    loading: boolean;
    error: any;
  };

  // Gruplandırılmış seçenekler (component'lerde kolayca kullanım için)
  options: {
    categories: {
      data: { value: string; label: string }[];
      loading: boolean;
      error: any;
    };
    suppliers: {
      data: { value: string; label: string }[];
      loading: boolean;
      error: any;
    };
  };

  // Section değişiklik durumları (filter form'da yönetilecek)
  sectionChanges: Record<string, boolean>;

  // Arama fonksiyonalitesi
  search: (data: SearchProductsParams) => Promise<any>; // Arama fonksiyonu
  searchLoading: boolean; // Arama yükleniyor durumu
  searchError: any; // Arama hata durumu
  resetSearch: () => void; // Arama sıfırlama ve initial state dönüş
}

// Context Provider component'i için props tipi
export interface ProductsSearchProviderProps {
  children: React.ReactNode;
}

/**
 * Pagination parametreleri
 */
export interface ProductsUseSearchParams {
  defaultPageSize?: number;
  autoScrollTop?: boolean;
}

/**
 * Pagination Response (API'den dönen)
 */
export interface ProductsPaginationResponse {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

/**
 * Pagination Defaults
 */
export const PRODUCTS_PAGINATION_DEFAULTS = {
  page: 0,
  size: 20,
  maxPageNumbers: 5,
} as const;
