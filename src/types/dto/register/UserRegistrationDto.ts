/**
 * User Registration DTO
 * Teacher ve Instructor kayıt işlemleri için kullanılır
 * Backend: UserRegistrationDto.java
 *
 * API Endpoints:
 * - POST /users/register/teacher
 * - POST /users/register/instructor
 */

export interface UserRegistrationDto {
  // Zorunlu alanlar
  /** Email adresi */
  email: string;

  /** Ad */
  firstName: string;

  /** Soyad */
  lastName: string;

  /** Şifre (min 6 karakter) */
  password: string;

  /** Şifre onayı */
  confirmPassword: string;

  // Opsiyonel alanlar
  /** Telefon numarası */
  phone?: string;

  /** Kullanıcı tipi - Gönderilmezse backend INSTITUTION_USER atar */
  userType?: string;

  // Konum bilgileri (opsiyonel)
  /** Ülke ID */
  countryId?: number;

  /** İl ID */
  provinceId?: number;

  /** İlçe ID */
  districtId?: number;

  /** Mahalle ID */
  neighborhoodId?: number;

  /** Adres satır 1 */
  addressLine1?: string;

  /** Adres satır 2 */
  addressLine2?: string;

  /** Posta kodu */
  postalCode?: string;

  // KVKK / Onaylar (opsiyonel)
  /** Kullanım koşulları onayı */
  acceptTerms?: boolean;

  /** Gizlilik politikası onayı */
  acceptPrivacy?: boolean;

  /** Pazarlama onayı */
  acceptMarketing?: boolean;
}
