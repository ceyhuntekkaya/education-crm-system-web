export interface SurveyQuestionResponseCreateDto {
  /** Format: int64 */
  questionId?: number;
  textResponse?: string;
  /** Format: double */
  numberResponse?: number;
  /** Format: date */
  dateResponse?: string;
  timeResponse?: string;
  /** Format: date-time */
  datetimeResponse?: string;
  booleanResponse?: boolean;
  /** Format: int32 */
  ratingResponse?: number;
  choiceResponses?: string;
  matrixResponses?: string;
  fileUrl?: string;
  fileName?: string;
  /** Format: int64 */
  fileSize?: number;
  fileType?: string;
  otherText?: string;
  /** Format: int32 */
  responseTimeSeconds?: number;
  wasSkipped?: boolean;
  skipReason?: string;
  /** Format: int32 */
  confidenceLevel?: number;
  /** Format: int32 */
  revisionCount?: number;
}
