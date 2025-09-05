export interface SubscriptionNotificationDto {
  notificationType?: string;
  subscriptionId?: number;
  recipientEmail?: string;
  recipientName?: string;
  subject?: string;
  message?: string;
  templateData?: Record<string, unknown>;
  deliveryMethod?: string;
  scheduledAt?: string;
  sentAt?: string;
  wasDelivered?: boolean;
  deliveryStatus?: string;
  failureReason?: string;
  wasOpened?: boolean;
  wasClicked?: boolean;
  openedAt?: string;
  clickedAt?: string;
}
