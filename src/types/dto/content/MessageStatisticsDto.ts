export interface MessageStatisticsDto {
  totalMessages?: number;
  newMessages?: number;
  inProgressMessages?: number;
  resolvedMessages?: number;
  overdueMessages?: number;
  averageResponseTimeHours?: number;
  averageResolutionTimeHours?: number;
  satisfactionRating?: number;
  messagesRequiringFollowUp?: number;
  inquiryMessages?: number;
  complaintMessages?: number;
  appointmentRequests?: number;
  callbackRequests?: number;
  urgentMessages?: number;
  highPriorityMessages?: number;
  normalPriorityMessages?: number;
  lowPriorityMessages?: number;
}
