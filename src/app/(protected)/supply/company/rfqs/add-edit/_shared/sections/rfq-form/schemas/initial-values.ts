import { RFQFormData } from "../types/form-data";

/**
 * Initial values for RFQ form
 * RFQCreateDto'ya uygun
 */
export const initialValues: RFQFormData = {
  // Required fields
  companyId: "",
  title: "",
  submissionDeadline: "",

  // Optional fields
  description: "",
  rfqType: "OPEN", // Default type
  expectedDeliveryDate: "",
  paymentTerms: "",
  evaluationCriteria: "",
  technicalRequirements: "",
};
