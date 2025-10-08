// Company Context için tip tanımları
export interface CompanyState {
  selectedCompanyId: string | null;
  companyData: any | null;
  isLoading: boolean;
  sidebarCollapsed: boolean;
}

export interface CompanyContextType extends CompanyState {
  setSelectedCompanyId: (id: string | null) => void;
  setCompanyData: (data: any) => void;
  setIsLoading: (loading: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  refreshCompanyData: () => Promise<void>;
}

// Company Provider Props
export interface CompanyProviderProps {
  children: React.ReactNode;
}
