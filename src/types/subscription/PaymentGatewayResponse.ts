export interface PaymentGatewayResponse {
  successful?: boolean;
  transactionId?: string;
  gatewayName?: string;
  errorMessage?: string;
  rawResponse?: string;
}
