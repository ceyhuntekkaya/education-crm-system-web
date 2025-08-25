export interface AppointmentIntegrationDto {
  appointmentId?: number;
  integrationType?: string;
  externalId?: string;
  externalUrl?: string;
  integrationStatus?: string;
  lastSyncAt?: string;
  syncError?: string;
  integrationData?: Record<string, string>;
  autoSync?: boolean;
  syncedFields?: string[];
}
