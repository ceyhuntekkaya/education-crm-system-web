/**
 * 📄 PAGINATION TYPES
 * Sayfalama için gerekli tip tanımlamaları
 */

/**
 * Sayfa boyutu seçenekleri
 */
export const PAGE_SIZE_OPTIONS = [6, 12, 24, 48] as const;
export type PageSizeOption = (typeof PAGE_SIZE_OPTIONS)[number];

/**
 * Varsayılan pagination değerleri
 */
export const PAGINATION_DEFAULTS = {
  page: 0,
  size: 12,
  totalElements: 0,
  totalPages: 0,
} as const;

/**
 * Pagination durumu için tip tanımı
 */
export interface PaginationState {
  /** Mevcut sayfa numarası (0-indexed) */
  page: number;
  /** Sayfa başına öğe sayısı */
  size: number;
  /** Toplam öğe sayısı */
  totalElements: number;
  /** Toplam sayfa sayısı */
  totalPages: number;
}

/**
 * Pagination aksiyonları için tip tanımı
 */
export interface PaginationActions {
  /** Belirli bir sayfaya git */
  goToPage: (page: number) => void;
  /** Sonraki sayfaya git */
  goToNextPage: () => void;
  /** Önceki sayfaya git */
  goToPreviousPage: () => void;
  /** İlk sayfaya git */
  goToFirstPage: () => void;
  /** Son sayfaya git */
  goToLastPage: () => void;
  /** Sayfa boyutunu değiştir */
  changePageSize: (size: number) => void;
  /** Pagination state'ini güncelle (API response sonrası) */
  updatePaginationFromResponse: (response: PaginationResponse) => void;
  /** Pagination'ı sıfırla */
  resetPagination: () => void;
}

/**
 * API'den dönen pagination bilgileri
 */
export interface PaginationResponse {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

/**
 * usePagination hook'unun döndürdüğü değerler
 */
export interface UsePaginationReturn
  extends PaginationState,
    PaginationActions {
  /** İlk sayfada mı? */
  isFirstPage: boolean;
  /** Son sayfada mı? */
  isLastPage: boolean;
  /** Gösterilecek sayfa numaraları */
  pageNumbers: number[];
  /** Mevcut sayfadaki başlangıç öğesi (1-indexed, kullanıcı gösterimi için) */
  startItem: number;
  /** Mevcut sayfadaki bitiş öğesi */
  endItem: number;
}

/**
 * Pagination bileşeni props
 */
export interface PaginationProps {
  /** Mevcut sayfa numarası (0-indexed) */
  currentPage: number;
  /** Toplam sayfa sayısı */
  totalPages: number;
  /** Toplam öğe sayısı */
  totalElements: number;
  /** Sayfa başına öğe sayısı */
  pageSize: number;
  /** Sayfa değişikliği callback'i */
  onPageChange: (page: number) => void;
  /** Sayfa boyutu değişikliği callback'i */
  onPageSizeChange?: (size: number) => void;
  /** Yükleniyor durumu */
  loading?: boolean;
  /** Sayfa boyutu seçenekleri */
  pageSizeOptions?: number[];
  /** Sayfa boyutu seçici gösterilsin mi? */
  showPageSizeSelector?: boolean;
  /** Sayfa bilgisi gösterilsin mi? */
  showPageInfo?: boolean;
  /** Compact mod */
  compact?: boolean;
  /** Ek CSS sınıfı */
  className?: string;
}

/**
 * Search API parametreleri için pagination kısmı
 */
export interface SearchPaginationParams {
  page: number;
  size: number;
}
