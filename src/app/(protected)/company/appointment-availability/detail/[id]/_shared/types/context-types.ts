import { AppointmentDto, AppointmentNoteDto, SurveyDto } from "@/types";
import { AppointmentNoteCreateDto } from "@/types/dto/appointment/AppointmentNoteCreateDto";
import { SurveyAssignmentDto } from "@/types/dto/survey/SurveyAssignmentDto";
import { ApiResponseDto } from "@/types/dto/user/ApiResponseDto";
import { MutationOptions } from "@/hooks";

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
    data: AppointmentNoteCreateDto
  ) => Promise<AppointmentNoteDto | null>;
  noteAddLoading: boolean;
  noteAddError: string | null;
  // Notes listesi
  notes: AppointmentNoteDto[];
  appointmentNotesLoading: boolean;
  appointmentNotesError: string | null;
  refetchNotes: () => void;
  // Survey işlemleri
  surveys: SurveyDto[];
  appointmentSurveysLoading: boolean;
  appointmentSurveysError: string | null;
  refetchSurveys: () => void;
  selectedSurveyId: number | null;
  selectSurvey: (surveyId: number) => void;
  clearSelection: () => void;
  createSurvey: (
    data: SurveyAssignmentDto,
    mutationOptions?: MutationOptions<ApiResponseDto<any>, SurveyAssignmentDto>
  ) => Promise<ApiResponseDto<any> | null>;
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
