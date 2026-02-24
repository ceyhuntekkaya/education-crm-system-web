export interface HrNotificationDto {
  id: number;
  userId: number;
  applicationId: number | null;
  title: string;
  message: string;
  type:
    | "APPLICATION_RECEIVED"
    | "STATUS_UPDATED"
    | "NEW_JOB_POSTED"
    | "APPLICATION_WITHDRAWN";
  isRead: boolean;
  createdAt: string;
}
