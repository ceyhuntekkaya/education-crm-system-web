import { AppointmentDto, AppointmentNoteDto, SurveyTemplateDto } from "@/types";
import { AppointmentNoteCreateDto } from "@/types/dto/appointment/AppointmentNoteCreateDto";
import { SurveyResponseCreateDto } from "@/types/dto/survey/SurveyResponseCreateDto";
import { SurveyResponseDto } from "@/types/dto/survey/SurveyResponseDto";

/**
 * Appointment detail context değeri
 */
export interface AppointmentDetailContextValue {
  appointmentId: number;
  appointment: AppointmentDto | null;
  appointmentDetailLoading: boolean;
  appointmentDetailError: string | null;
  refetchAppointment: () => void;
  allSections: any[];
  // Note işlemleri
  addNote: (
    noteData: Omit<AppointmentNoteCreateDto, "appointmentId" | "authorUserId">
  ) => Promise<boolean>;
  noteAddLoading: boolean;
  noteAddError: string | null;
  // Notes listesi
  notes: AppointmentNoteDto[];
  appointmentNotesLoading: boolean;
  appointmentNotesError: string | null;
  refetchNotes: () => void;
  // Survey işlemleri
  surveys: SurveyTemplateDto[];
  appointmentSurveysLoading: boolean;
  appointmentSurveysError: Error | null;
  refetchSurveys: () => void;
  selectedSurveyId: number | null;
  selectSurvey: (surveyId: number) => void;
  createSurvey: (
    data: SurveyResponseCreateDto
  ) => Promise<SurveyResponseDto | null>;
  surveyCreateLoading: boolean;
  surveyCreateError: string | null;
}

/**
 * Appointment detail provider props
 */
export interface AppointmentDetailProviderProps {
  children: React.ReactNode;
  appointmentId: number;
}
