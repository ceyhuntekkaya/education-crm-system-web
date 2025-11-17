import { SchoolDto } from "@/types";

// Company Context için tip tanımları
export interface CompanyState {
  // Sidebar için gerekli bilgiler
  selectedSchool: SchoolDto | null;
  schools: SchoolDto[];
  isInitialized: boolean; // localStorage'dan veri çekilip çekilmediğini kontrol etmek için
}

export interface CompanyContextType extends CompanyState {
  // Sidebar için metodlar
  setSelectedSchool: (school: SchoolDto) => void;
}

// Company Provider Props
export interface CompanyProviderProps {
  children: React.ReactNode;
}
