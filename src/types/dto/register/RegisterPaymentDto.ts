/**
 * Register Step 6: Payment DTO
 * Backend: RegisterPaymentDto.java
 * 
 * @property userId - Step 1'den dönen user ID
 * @property subscriptionId - Step 5'te seçilen subscription plan ID
 */
export interface RegisterPaymentDto {
  /** User ID */
  userId: number;
  
  /** Subscription Plan ID */
  subscriptionId: number;
}

