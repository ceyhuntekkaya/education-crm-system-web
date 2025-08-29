export interface CouponDto {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  discountType?: string;
  discountValue?: number;
  maxDiscountAmount?: number;
  minOrderAmount?: number;
  usageLimit?: number;
  usageCount?: number;
  userUsageLimit?: number;
  validFrom?: string;
  validUntil?: string;
  isActive?: boolean;
  applicablePlanIds?: number[];
  applicablePlans?: string;
}
