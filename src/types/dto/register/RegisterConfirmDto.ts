/**
 * Register Step 3: Confirm DTO
 * Backend: RegisterConfirmDto.java
 * 
 * @property userId - Step 1'den dönen user ID
 * @property code - 4 haneli doğrulama kodu
 */
export interface RegisterConfirmDto {
  /** User ID */
  userId: number;
  
  /** Doğrulama kodu (4 haneli) */
  code: string;
}

