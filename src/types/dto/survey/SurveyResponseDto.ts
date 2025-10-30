import { SurveyQuestionResponseDto } from "./SurveyQuestionResponseDto";

export interface SurveyResponseDto {
  /** Format: int64 */
  id?: number;
  /** Format: int64 */
  surveyId?: number; // ******
  surveyTitle?: string;
  /** Format: int64 */
  respondentUserId?: number /* **************** veli
    respondentUserName?: string;
    /** Format: int64 */;
  schoolId?: number; // okul idi göndeirleicek
  schoolName?: string;
  /** Format: int64 */
  appointmentId?: number; // ****** randevu id
  responseToken?: string;
  /** @enum {string} */
  status?:
    | "INVITED"
    | "STARTED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "SUBMITTED"
    | "EXPIRED"
    | "ABANDONED"
    | "DELETED";
  /** Format: date-time */
  startedAt?: string;
  /** Format: date-time */
  completedAt?: string;
  /** Format: date-time */
  submittedAt?: string;
  /** Format: int32 */
  completionTimeSeconds?: number;
  respondentName?: string;
  respondentEmail?: string;
  respondentPhone?: string;
  ipAddress?: string;
  userAgent?: string;
  browserInfo?: string;
  deviceInfo?: string;
  /** Format: date-time */
  invitationSentAt?: string;
  /** Format: date-time */
  invitationOpenedAt?: string;
  /** Format: int32 */
  reminderCount?: number;
  /** Format: date-time */
  lastReminderSentAt?: string;
  /** Format: double */
  overallRating?: number;
  /** Format: double */
  cleanlinessRating?: number;
  /** Format: double */
  staffRating?: number;
  /** Format: double */
  facilitiesRating?: number;
  /** Format: double */
  communicationRating?: number;
  generalFeedback?: string;
  suggestions?: string;
  complaints?: string;
  wouldRecommend?: boolean;
  /** Format: int32 */
  likelihoodToEnroll?: number;
  formattedCompletionTime?: string;
  statusDisplayName?: string;
  /** Format: double */
  progressPercentage?: number;
  isComplete?: boolean;
  isExpired?: boolean;
  questionResponses?: SurveyQuestionResponseDto[];
  /** Format: date-time */
  createdAt?: string;
  /** Format: date-time */
  updatedAt?: string;
}
