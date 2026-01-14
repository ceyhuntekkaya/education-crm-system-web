import { SearchProductsParams, ProductDto } from "@/types/dto/supply/product.dto";
import { ProductDtoStatus } from "@/types";

/**
 * Ürün sonucu DTO tipi (UI için optimize edilmiş)
 * ProductDto'dan map edilir
 */
export interface ProductResultDto {
  id?: number;
  name?: string;
  description?: string;
  sku?: string;
  categoryId?: number;
  categoryName?: string;
  supplierId?: number;
  supplierName?: string; // ProductDto'da supplierCompanyName
  unitPrice?: number; // ProductDto'da basePrice
  currency?: string;
  taxRate?: number;
  stockTrackingType?: string;
  currentStock?: number; // ProductDto'da stockQuantity
  minStockLevel?: number;
  mainImageUrl?: string; // ProductDto'da mainImageUrl
  status?: ProductDtoStatus;
  deliveryDays?: number; // ProductDto'da deliveryDays
  createdAt?: string;
  updatedAt?: string;
}

/**
 * ProductDto'yu ProductResultDto'ya map eder (Backend response'una uygun)
 */
export function mapProductDtoToResult(dto: ProductDto): ProductResultDto {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    sku: dto.sku,
    categoryId: dto.categoryId,
    categoryName: dto.categoryName,
    supplierId: dto.supplierId,
    supplierName: dto.supplierCompanyName, // Backend field name
    unitPrice: dto.basePrice, // Backend field name
    currency: dto.currency,
    taxRate: dto.taxRate,
    stockTrackingType: dto.stockTrackingType,
    currentStock: dto.stockQuantity, // Backend field name
    minStockLevel: dto.minStockLevel,
    mainImageUrl: dto.mainImageUrl, // Backend field name
    status: dto.status,
    deliveryDays: dto.deliveryDays,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}
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
  resetSearch: () => void; // Arama'yı sıfırla ve initial state'e dön
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
