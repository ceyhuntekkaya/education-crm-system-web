import { School } from "./school.types";

// Company Context için tip tanımları
export interface CompanyState {
  // Sidebar için gerekli bilgiler
  selectedSchool: School | null;
  schools: School[];
  isInitialized: boolean; // localStorage'dan veri çekilip çekilmediğini kontrol etmek için
}

export interface CompanyContextType extends CompanyState {
  // Sidebar için metodlar
  setSelectedSchool: (school: School) => void;
}

// Company Provider Props
export interface CompanyProviderProps {
  children: React.ReactNode;
}
