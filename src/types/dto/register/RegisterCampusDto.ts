/**
 * Register Step 4: Campus DTO
 * Backend: RegisterCampusDto.java
 * 
 * @property userId - Step 1'den dönen user ID
 * @property brandId - Seçilen brand ID
 * @property name - Kampüs adı
 * @property email - Kampüs email adresi
 * @property phone - Kampüs telefon numarası
 * @property addressLine1 - Adres satırı 1
 * @property addressLine2 - Adres satırı 2
 * @property districtId - İlçe ID
 * @property postalCode - Posta kodu
 * @property countryId - Ülke ID
 * @property provinceId - İl ID
 */
export interface RegisterCampusDto {
  /** User ID */
  userId: number;
  
  /** Brand ID */
  brandId: number;
  
  /** Kampüs adı */
  name: string;
  
  /** Kampüs email */
  email: string;
  
  /** Kampüs telefon */
  phone: string;
  
  /** Adres satırı 1 */
  addressLine1: string;
  
  /** Adres satırı 2 */
  addressLine2: string;
  
  /** İlçe ID */
  districtId: number;
  
  /** Posta kodu */
  postalCode: string;
  
  /** Ülke ID */
  countryId: number;
  
  /** İl ID */
  provinceId: number;
}

