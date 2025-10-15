import { MessageDto } from "@/types/dto/content/MessageDto";

// Message detail context types
export interface MessageDetailContextValue {
  messageId: number;
  message: MessageDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface MessageDetailProviderProps {
  children: React.ReactNode;
  messageId: number;
}
