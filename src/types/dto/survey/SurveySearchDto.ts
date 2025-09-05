import { SurveyType } from "../../../enums/SurveyType";
import { SurveyTriggerEvent } from "../../../enums/SurveyTriggerEvent";

export interface SurveySearchDto {
  searchTerm: string;
  surveyTypes: SurveyType[];
  triggerEvents: SurveyTriggerEvent[];
  isActive: boolean;
  isAnonymous: boolean;
  isMandatory: boolean;
  showResultsToPublic: boolean;
  createdFrom: string;
  createdTo: string;
  minResponses: number;
  maxResponses: number;
  minCompletionRate: number;
  maxCompletionRate: number;
  minAverageRating: number;
  maxAverageRating: number;
  sortBy:
    | "CREATED_DATE"
    | "TITLE"
    | "RESPONSE_COUNT"
    | "COMPLETION_RATE"
    | "AVERAGE_RATING"
    | string;
  sortDirection: string;
  page: number;
}
