import { ConditionType } from "../../../enums/ConditionType";
import { QuestionType } from "../../../enums/QuestionType";
import { RatingCategory } from "../../../enums/RatingCategory";

export interface SurveyQuestionDto {
  /** Format: int64 */
  id?: number;
  /** Format: int64 */
  surveyId?: number;
  questionText?: string;
  description?: string;
  /** @enum {string} */
  questionType?: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "DROPDOWN" | "TEXT_SHORT" | "TEXT_LONG" | "EMAIL" | "PHONE" | "NUMBER" | "DATE" | "TIME" | "RATING_STAR" | "RATING_SCALE" | "YES_NO" | "LIKERT_SCALE" | "MATRIX" | "FILE_UPLOAD" | "SIGNATURE" | "SECTION_HEADER";
  /** @enum {string} */
  ratingCategory?: "OVERALL_SATISFACTION" | "CLEANLINESS" | "STAFF_FRIENDLINESS" | "FACILITIES" | "COMMUNICATION" | "PROFESSIONALISM" | "VALUE_FOR_MONEY" | "RECOMMENDATION" | "ACADEMIC_QUALITY" | "INFRASTRUCTURE" | "EXTRACURRICULAR" | "SAFETY" | "TRANSPORTATION" | "CAFETERIA" | "TECHNOLOGY" | "CUSTOM";
  isRequired?: boolean;
  /** Format: int32 */
  sortOrder?: number;
  isActive?: boolean;
  options?: string;
  allowOtherOption?: boolean;
  otherOptionLabel?: string;
  /** Format: int32 */
  ratingScaleMin?: number;
  /** Format: int32 */
  ratingScaleMax?: number;
  /** Format: int32 */
  ratingScaleStep?: number;
  ratingLabels?: string;
  /** Format: int32 */
  textMinLength?: number;
  /** Format: int32 */
  textMaxLength?: number;
  placeholderText?: string;
  /** Format: int64 */
  showIfQuestionId?: number;
  showIfAnswer?: string;
  /** @enum {string} */
  showIfCondition?: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_CONTAINS" | "GREATER_THAN" | "LESS_THAN" | "GREATER_THAN_EQUAL" | "LESS_THAN_EQUAL" | "IS_EMPTY" | "IS_NOT_EMPTY";
  customCssClass?: string;
  helpText?: string;
  imageUrl?: string;
  /** Format: int64 */
  totalResponses?: number;
  /** Format: double */
  averageRating?: number;
  /** Format: int64 */
  skipCount?: number;
  questionTypeDisplayName?: string;
  ratingCategoryDisplayName?: string;
  optionsList?: string[];
  ratingLabelsMap?: KeyDataUnknown;
  /** Format: double */
  responseRate?: number;
  /** Format: double */
  skipRate?: number;
};


export interface KeyDataUnknown {
  [key: string]: unknown;
}
