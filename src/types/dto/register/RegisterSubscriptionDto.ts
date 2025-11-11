/**
 * Register Step 5: Subscription DTO
 * Backend: RegisterSubscriptionDto.java
 * 
 * @property userId - Step 1'den dönen user ID
 * @property subscriptionId - Seçilen subscription plan ID
 */
export interface RegisterSubscriptionDto {
  /** User ID */
  userId: number;
  
  /** Subscription Plan ID */
  subscriptionId: number;
}

