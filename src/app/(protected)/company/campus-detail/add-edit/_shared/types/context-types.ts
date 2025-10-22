import { CampusDto, CampusCreateDto } from "@/types";

export interface CampusAddEditContextType {
  // Current campus data
  campus: any | null;
  campusLoading: boolean;
  campusError: string | null;

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
