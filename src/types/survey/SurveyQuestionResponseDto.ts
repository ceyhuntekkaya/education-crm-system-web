import { QuestionType } from '../../enums/QuestionType';
import { RatingCategory } from '../../enums/RatingCategory';

export interface SurveyQuestionResponseDto {
  id: number;
  surveyResponseId: number;
  questionId: number;
  questionText: string;
  questionType: QuestionType;
  ratingCategory: RatingCategory;
  textResponse: string;
  numberResponse: number;
  dateResponse: string;
  timeResponse: string;
  datetimeResponse: string;
  booleanResponse: boolean;
  ratingResponse: number;
  choiceResponses: string;
  matrixResponses: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  otherText: string;
  responseTimeSeconds: number;
  wasSkipped: boolean;
  skipReason: string;
  responseOrder: number;
  revisionCount: number;
  confidenceLevel: number;
  displayValue: string;
  formattedResponse: string;
  choiceResponsesList: string[];
  matrixResponsesMap: Record<string, string>;
}
