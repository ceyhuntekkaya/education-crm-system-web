import type { RFQDto } from "@/types";

/**
 * Form data type for RFQ form
 * String types kullanıyoruz çünkü form input'ları string olarak gelir
 */
export interface RFQFormData {
  // Required fields
  companyId: string | number;
  title: string;
  submissionDeadline: string;

  // Optional fields
  description?: string;
  rfqType?: "OPEN" | "INVITED";
  expectedDeliveryDate?: string;
  paymentTerms?: string;
  evaluationCriteria?: string;
  technicalRequirements?: string;
}

/**
 * Props type for RFQ form
 */
export interface RFQFormProps {
  className?: string;
  initialData?: RFQDto;
}
