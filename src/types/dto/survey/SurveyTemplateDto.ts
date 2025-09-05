import { SurveyType } from "../../../enums/SurveyType";
import { SurveyQuestionDto } from "./SurveyQuestionDto";

export interface SurveyTemplateDto {
  id: number;
  templateName: string;
  templateDescription: string;
  surveyType: SurveyType;
  industry: string;
  category: string;
  isPublic: boolean;
  isRecommended: boolean;
  usageCount: number;
  averageRating: number;
  previewUrl: string;
  questions: SurveyQuestionDto[];
  createdByUserName: string;
  createdAt: string;
  updatedAt: string;
}
