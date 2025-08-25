export interface AppointmentFeedbackDto {
  appointmentId?: number;
  parentUserId?: number;
  parentName?: string;
  overallRating?: number;
  staffRating?: number;
  facilityRating?: number;
  communicationRating?: number;
  timelinessRating?: number;
  informationQualityRating?: number;
  positiveAspects?: string;
  improvementSuggestions?: string;
  generalComments?: string;
  wouldRecommend?: boolean;
  likelihoodToEnroll?: number;
  submittedAt?: string;
  feedbackSource?: string;
}
