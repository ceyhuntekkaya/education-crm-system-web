/**
 * Register Step 1: Credential DTO
 * Backend: RegisterCredentialDto.java
 * 
 * @property email - Kullanıcının email adresi (giriş için kullanılacak)
 * @property password - Kullanıcının şifresi
 * @property passwordControl - Şifre onayı (confirmation)
 */
export interface RegisterCredentialDto {
  /** Email adresi */
  email: string;
  
  /** Şifre */
  password: string;
  
  /** Şifre onayı */
  passwordControl: string;
}

