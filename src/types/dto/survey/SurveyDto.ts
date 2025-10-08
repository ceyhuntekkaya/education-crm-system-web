import { SurveyTriggerEvent } from "../../../enums/SurveyTriggerEvent";
import { SurveyType } from "../../../enums/SurveyType";
import { SurveyQuestionDto } from "./SurveyQuestionDto";

export interface SurveyDto {
  /** Format: int64 */
  id?: number;
  title?: string;
  description?: string;
  /** @enum {string} */
  surveyType?: "APPOINTMENT_FEEDBACK" | "SCHOOL_RATING" | "SERVICE_QUALITY" | "ENROLLMENT_FEEDBACK" | "GENERAL_FEEDBACK" | "CUSTOM";
  /** @enum {string} */
  triggerEvent?: "APPOINTMENT_COMPLETED" | "ENROLLMENT_COMPLETED" | "MANUAL_SEND" | "PERIODIC" | "EVENT_BASED";
  isActive?: boolean;
  isAnonymous?: boolean;
  isMandatory?: boolean;
  showResultsToPublic?: boolean;
  /** Format: int32 */
  sendDelayHours?: number;
  /** Format: int32 */
  reminderDelayHours?: number;
  /** Format: int32 */
  maxReminders?: number;
  /** Format: int32 */
  expiresAfterDays?: number;
  primaryColor?: string;
  logoUrl?: string;
  headerImageUrl?: string;
  customCss?: string;
  welcomeMessage?: string;
  thankYouMessage?: string;
  completionRedirectUrl?: string;
  emailSubject?: string;
  emailBody?: string;
  emailTemplateId?: string;
  /** Format: int64 */
  totalSent?: number;
  /** Format: int64 */
  totalStarted?: number;
  /** Format: int64 */
  totalCompleted?: number;
  /** Format: int32 */
  averageCompletionTimeSeconds?: number;
  /** Format: double */
  averageRating?: number;
  /** Format: double */
  startRate?: number;
  /** Format: double */
  completionRate?: number;
  /** Format: int32 */
  questionCount?: number;
  estimatedDuration?: string;
  hasRatingQuestions?: boolean;
  questions?: SurveyQuestionDto[];
  /** Format: date-time */
  createdAt?: string;
  /** Format: date-time */
  updatedAt?: string;
};

