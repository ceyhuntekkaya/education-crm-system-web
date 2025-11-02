import { KeyDataUnknown } from "./SurveyQuestionDto";

export interface SurveyQuestionResponseDto {
  /** Format: int64 */
  id?: number;
  /** Format: int64 */
  surveyResponseId?: number;
  /** Format: int64 */
  questionId?: number;
  questionText?: string;
  /** @enum {string} */
  questionType?:
    | "SINGLE_CHOICE"
    | "MULTIPLE_CHOICE"
    | "DROPDOWN"
    | "TEXT_SHORT"
    | "TEXT_LONG"
    | "EMAIL"
    | "PHONE"
    | "NUMBER"
    | "DATE"
    | "TIME"
    | "RATING_STAR"
    | "RATING_SCALE"
    | "YES_NO"
    | "LIKERT_SCALE"
    | "MATRIX"
    | "FILE_UPLOAD"
    | "SIGNATURE"
    | "SECTION_HEADER";
  /** @enum {string} */
  ratingCategory?:
    | "OVERALL_SATISFACTION"
    | "CLEANLINESS"
    | "STAFF_FRIENDLINESS"
    | "FACILITIES"
    | "COMMUNICATION"
    | "PROFESSIONALISM"
    | "VALUE_FOR_MONEY"
    | "RECOMMENDATION"
    | "ACADEMIC_QUALITY"
    | "INFRASTRUCTURE"
    | "EXTRACURRICULAR"
    | "SAFETY"
    | "TRANSPORTATION"
    | "CAFETERIA"
    | "TECHNOLOGY"
    | "CUSTOM";
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
  responseOrder?: number;
  /** Format: int32 */
  revisionCount?: number;
  /** Format: int32 */
  confidenceLevel?: number;
  displayValue?: string;
  formattedResponse?: string;
  choiceResponsesList?: string[];
  matrixResponsesMap?: KeyDataUnknown;
}
