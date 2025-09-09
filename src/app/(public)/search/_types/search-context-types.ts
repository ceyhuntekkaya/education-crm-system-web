import { SchoolSearchDto } from "@/types";
import { mockInstitutions } from "../_mock";

// Context'te tutulacak değerlerin tipi
export interface SearchContextValue {
  // Mock veriler (geliştirme aşamasında kullanılıyor)
  institutions: typeof mockInstitutions;

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
  searchLoading: boolean; // Arama yükleniyor durumu
  searchError: any; // Arama hata durumu
}

// Context Provider component'i için props tipi
export interface SearchProviderProps {
  children: React.ReactNode;
}
