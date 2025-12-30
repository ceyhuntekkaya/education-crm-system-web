import { RFQFormData } from "../types/form-data";

/**
 * RFQ Form initial values
 */
export const initialValues: RFQFormData = {
  title: "",
  description: "",
  rfqType: "OPEN",
  submissionDeadline: "",
  expectedDeliveryDate: "",
  paymentTerms: "",
  evaluationCriteria: "",
  technicalRequirements: "",
  productIds: [],
};
