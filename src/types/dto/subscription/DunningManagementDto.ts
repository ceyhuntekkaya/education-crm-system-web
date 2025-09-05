export interface DunningManagementDto {
  subscriptionId?: number;
  campaignName?: string;
  daysPastDue?: number;
  dunningStage?: string;
  nextActionDate?: string;
  nextActionType?: string;
  isActive?: boolean;
  communicationLog?: string[];
  lastCommunication?: string;
  lastCommunicationType?: string;
  paymentPromiseDate?: string;
  promisedAmount?: number;
  promiseKept?: boolean;
}
