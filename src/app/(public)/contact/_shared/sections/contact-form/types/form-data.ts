/**
 * Contact form data interface
 * Kurum bilgi talebi için kullanılacak form verileri
 */
export interface ContactFormData {
  // Zorunlu alanlar
  provinceId: string;
  institutionName: string;
  contactName: string;
  phone: string;
  email: string;

  // Opsiyonel alanlar
  message?: string;
}
