import { RatingCategory } from "../../../enums/RatingCategory";

export interface SurveyRatingDto {
  id: number;
  schoolId: number;
  schoolName: string;
  surveyResponseId: number;
  ratingCategory: RatingCategory;
  ratingValue: number;
  ratingText: string;
  weight: number;
  isVerified: boolean;
  verifiedByUserName: string;
  verifiedAt: string;
  isFlagged: boolean;
  flagReason: string;
  flaggedByUserName: string;
  flaggedAt: string;
  isPublic: boolean;
  moderatorNotes: string;
  ratingCategoryDisplayName: string;
  ratingDisplayText: string;
  starDisplay: string;
  createdAt: string;
  updatedAt: string;
}
