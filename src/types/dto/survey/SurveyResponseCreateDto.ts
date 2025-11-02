import { SurveyQuestionResponseCreateDto } from "./SurveyQuestionResponseCreateDto";

export interface SurveyResponseCreateDto {
  /** Format: int64 */
  surveyId?: number;
  /** Format: int64 */
  respondentUserId?: number;
  /** Format: int64 */
  schoolId?: number;
  /** Format: int64 */
  appointmentId?: number;
  respondentName?: string;
  respondentEmail?: string;
  respondentPhone?: string;
  ipAddress?: string;
  userAgent?: string;
  browserInfo?: string;
  deviceInfo?: string;
  generalFeedback?: string;
  suggestions?: string;
  complaints?: string;
  wouldRecommend?: boolean;
  /** Format: int32 */
  likelihoodToEnroll?: number;
  questionResponses?: SurveyQuestionResponseCreateDto[];
}
