export interface FeeChangeDto {
  fieldName?: string;
  displayName?: string;
  fromAmount?: number;
  toAmount?: number;
  changeAmount?: number;
  changePercentage?: number;
  changeType?: string;
  formattedFromAmount?: string;
  formattedToAmount?: string;
  formattedChangeAmount?: string;
}
