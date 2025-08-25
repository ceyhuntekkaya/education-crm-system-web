export interface SurveyQuestionResponseCreateDto {
  questionId: number;
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
  confidenceLevel: number;
  revisionCount: number;
}
