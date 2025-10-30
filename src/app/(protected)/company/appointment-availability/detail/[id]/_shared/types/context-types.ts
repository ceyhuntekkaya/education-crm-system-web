import { AppointmentDto, AppointmentNoteDto, SurveyTemplateDto } from "@/types";
import { AppointmentNoteCreateDto } from "@/types/dto/appointment/AppointmentNoteCreateDto";
import { SurveyResponseCreateDto } from "@/types/dto/survey/SurveyResponseCreateDto";
import { SurveyResponseDto } from "@/types/dto/survey/SurveyResponseDto";
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
  surveys: SurveyTemplateDto[];
  appointmentSurveysLoading: boolean;
  appointmentSurveysError: Error | null;
  refetchSurveys: () => void;
  selectedSurveyId: number | null;
  selectSurvey: (surveyId: number) => void;
  createSurvey: (
    data: SurveyResponseCreateDto,
    mutationOptions?: MutationOptions<
      ApiResponseDto<SurveyResponseDto>,
      SurveyResponseCreateDto
    >
  ) => Promise<ApiResponseDto<SurveyResponseDto> | null>;
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
