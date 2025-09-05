export interface AnalyticsAlertDto {
  id?: number;
  alertName?: string;
  alertDescription?: string;
  metricName?: string;
  condition?: 'GREATER_THAN' | 'LESS_THAN' | 'EQUALS' | 'CHANGE_PERCENTAGE';
  thresholdValue?: number;
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  isActive?: boolean;
  isTriggered?: boolean;
  lastTriggeredAt?: string;
  triggerCount?: number;
  notificationEmails?: string[];
  emailNotificationEnabled?: boolean;
  smsNotificationEnabled?: boolean;
  slackNotificationEnabled?: boolean;
  brandId?: number;
  campusId?: number;
  schoolId?: number;
  createdAt?: string;
  updatedAt?: string;
}
