import type { QuotationDto } from "@/types";

export interface QuotationsContextValue {
  // View
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;

  // API State
  quotationsListLoading: boolean;
  quotationsListError: Error | null;
  quotationsListRefetch: () => void;

  // Data
  quotations: QuotationDto[];
  totalElements: number;
  quotationsListIsEmpty: boolean;
}

export interface QuotationsProviderProps {
  children: React.ReactNode;
  companyId: number;
}
