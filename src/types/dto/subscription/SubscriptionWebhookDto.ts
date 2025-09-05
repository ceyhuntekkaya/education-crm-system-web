export interface SubscriptionWebhookDto {
  eventType?: string;
  subscriptionId?: number;
  webhookUrl?: string;
  payload?: Record<string, unknown>;
  triggeredAt?: string;
  deliveredAt?: string;
  attemptCount?: number;
  wasSuccessful?: boolean;
  responseCode?: number;
  responseBody?: string;
  failureReason?: string;
  nextRetryAt?: string;
  maxRetryAttempts?: number;
  retryEnabled?: boolean;
}
