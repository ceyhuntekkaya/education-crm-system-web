import type { ApplicationDto } from "../../../../_shared/types";

/**
 * ================================================================================
 * APPLICATION DETAIL CONTEXT TYPES
 * ================================================================================
 */

export interface ApplicationDetailContextValue {
  application: ApplicationDto | null;
  isLoading: boolean;
  error: any;
  applicationId: number;
  refetch: () => void;
}
