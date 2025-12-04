import { ContactFormData } from "../types/form-data";

export const initialValues: ContactFormData = {
  // Zorunlu alanlar
  provinceId: "",
  institutionName: "",
  contactName: "",
  phone: "",
  email: "",

  // Opsiyonel alanlar
  message: "",
};
