import { SchoolSearchDto, SchoolSearchResultDto } from "@/types";

/**
 * Pagination state tipi (context için)
 */
export interface SearchPaginationState {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  pageNumbers: number[];
  startItem: number;
  endItem: number;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  changePageSize: (size: number) => void;
  resetPagination: () => void;
}

// Context'te tutulacak değerlerin tipi
export interface SearchContextValue {
  // Form values (search form'unun mevcut değerleri)
  formValues: Record<string, any>;

  // API'den gelen veriler
  institutions: SchoolSearchResultDto[];
  totalElements: number;
  hasSearched: boolean; // İlk arama yapıldı mı?

  // Kurum türleri ham verisi
  institutionTypes: any[];

  // Lokasyon verileri (ayrı ayrı erişim için)
  countries: {
    data: { value: string; label: string }[];
    loading: boolean;
    error: any;
  };
  provinces: {
    data: { value: string; label: string }[];
    loading: boolean;
    error: any;
  };
  districts: {
    data: { value: string; label: string }[];
    loading: boolean;
    error: any;
  };
  neighborhoods: {
    data: { value: string; label: string }[];
    loading: boolean;
    error: any;
  };

  // Gruplandırılmış seçenekler (component'lerde kolayca kullanım için)
  options: {
    institution: {
      data: {
        value: string;
        label: string;
        groupId?: number;
        groupName?: string;
      }[];
      loading: boolean;
      error: any;
    };
    institutionGroups: {
      data: { value: string; label: string }[];
      loading: boolean;
      error: any;
    };
    location: {
      countries: {
        data: { value: string; label: string }[];
        loading: boolean;
        error: any;
      };
      provinces: {
        data: { value: string; label: string }[];
        loading: boolean;
        error: any;
      };
      districts: {
        data: { value: string; label: string }[];
        loading: boolean;
        error: any;
      };
      neighborhoods: {
        data: { value: string; label: string }[];
        loading: boolean;
        error: any;
      };
    };
  };

  // Section değişiklik durumları (filter form'da yönetilecek)
  sectionChanges: Record<string, boolean>;

  // Arama fonksiyonalitesi
  search: (data: SchoolSearchDto) => Promise<any>; // Arama fonksiyonu
  searchWithPagination: (page: number, size: number) => Promise<any>; // Sayfa ile arama
  searchLoading: boolean; // Arama yükleniyor durumu
  searchError: any; // Arama hata durumu
  resetSearch: () => void; // Arama'yı sıfırla ve initial state'e dön

  // Pagination
  pagination: SearchPaginationState;
}

// Context Provider component'i için props tipi
export interface SearchProviderProps {
  children: React.ReactNode;
}
