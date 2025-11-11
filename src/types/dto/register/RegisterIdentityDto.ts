/**
 * Register Step 2: Identity DTO
 * Backend: RegisterIdentityDto.java
 * 
 * @property userId - Step 1'den dönen user ID
 * @property firstName - Kullanıcının adı
 * @property lastName - Kullanıcının soyadı
 * @property phone - Telefon numarası
 */
export interface RegisterIdentityDto {
  /** Step 1'den dönen user ID */
  userId: number;
  
  /** Ad */
  firstName: string;
  
  /** Soyad */
  lastName: string;
  
  /** Telefon numarası */
  phone: string;
}

