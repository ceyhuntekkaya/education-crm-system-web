import { CampusDto, CampusCreateDto } from "@/types";

export interface CampusAddEditContextType {
  // Current campus data
  campus: any | null;
  dataLoading: boolean; // Sadece data fetch için
  campusError: string | null;

  // Form operations
  formLoading: boolean; // Sadece form submit için

  // Edit mode state
  isEditing: boolean;
  campusId: string | null;

  // Brand summaries data
  brands: {
    data: Array<{ value: string; label: string }>;
    loading: boolean;
    error: string | null;
  };

  // Actions
  fetchCampus: () => void;
  postCampus: (data: CampusCreateDto) => Promise<CampusDto | null>;
  putCampus: (data: CampusCreateDto) => Promise<CampusDto | null>;
}
