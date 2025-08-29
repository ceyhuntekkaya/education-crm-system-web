export interface Token {
  id: number;
  token: string;
  tokenType: TokenType;
  revoked: boolean;
  expired: boolean;
  userId: number;
}

export enum TokenType {
  BEARER = "BEARER"
}
