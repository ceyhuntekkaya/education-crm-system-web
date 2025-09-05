import { ConditionType } from "../../../enums/ConditionType";
import { QuestionType } from "../../../enums/QuestionType";
import { RatingCategory } from "../../../enums/RatingCategory";

export interface SurveyQuestionCreateDto {
  questionText: string;
  description: string;
  questionType: QuestionType;
  ratingCategory: RatingCategory;
  isRequired: boolean;
  sortOrder: number;
  options: string;
  allowOtherOption: boolean;
  otherOptionLabel: string;
  ratingScaleMin: number;
  ratingScaleMax: number;
  ratingScaleStep: number;
  ratingLabels: string;
  textMinLength: number;
  textMaxLength: number;
  placeholderText: string;
  showIfQuestionId: number;
  showIfAnswer: string;
  showIfCondition: ConditionType;
  customCssClass: string;
  helpText: string;
  imageUrl: string;
}
