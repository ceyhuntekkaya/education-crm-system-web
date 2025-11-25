import { MenuLink } from "@/components/layouts/header/types";

import { ParentSchoolListResponse } from "@/types";

export interface DataContextType {
  // Lists
  listMenuLinks: MenuLink[] | null;
  parentLists: ParentSchoolListResponse[];
  listsLoading: boolean;
  listsError: string | null;
  refetchLists: () => void;

  // Favorite Searches
  favoriteSearchMenuLinks: MenuLink[] | null;
  favoriteSearchesLoading: boolean;
  favoriteSearchesError: string | null;
  refetchFavoriteSearches: () => void;

  // Appointments
  appointmentSlots: any[]; // AppointmentSlotDto[]
  appointmentsLoading: boolean;
  appointmentsError: string | null;
  refetchAppointments: () => void;

  // Surveys
  surveys: any[]; // SurveyResponseDto[]
  surveysLoading: boolean;
  surveysError: string | null;
  refetchSurveys: () => void;

  // Messages
  conversationGroups: any[]; // MessageConversationGroupDto[]
  messagesLoading: boolean;
  messagesError: string | null;
  refetchMessages: () => void;

  // Counts for badges
  appointmentsCount: number;
  surveysCount: number;
  messagesCount: number;
}
