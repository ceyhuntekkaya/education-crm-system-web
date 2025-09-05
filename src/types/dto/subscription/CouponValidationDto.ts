export interface CouponValidationDto {
  couponCode?: string;
  subscriptionPlanId?: number;
  orderAmount?: number;
  currency?: string;
  isValid?: boolean;
  validationMessage?: string;
  discountAmount?: number;
  finalAmount?: number;
}
