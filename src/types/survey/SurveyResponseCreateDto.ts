import { SurveyQuestionResponseCreateDto } from './SurveyQuestionResponseCreateDto';

export interface SurveyResponseCreateDto {
  surveyId: number;
  respondentUserId: number;
  schoolId: number;
  appointmentId: number;
  respondentName: string;
  respondentEmail: string;
  respondentPhone: string;
  ipAddress: string;
  userAgent: string;
  browserInfo: string;
  deviceInfo: string;
  generalFeedback: string;
  suggestions: string;
  complaints: string;
  wouldRecommend: boolean;
  likelihoodToEnroll: number;
  questionResponses: SurveyQuestionResponseCreateDto[];
}
