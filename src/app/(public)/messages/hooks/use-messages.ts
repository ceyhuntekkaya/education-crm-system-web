"use client";

import { useData } from "@/contexts";
import { MessageConversationGroupDto } from "@/types/dto/content/MessageConversationDto";

interface UseMessagesProps {
  userId?: string | number;
  enabled?: boolean;
}

interface UseMessagesReturn {
  conversationGroups: MessageConversationGroupDto[];
  messageLoading: boolean;
  messageError: string | null;
  refetchMessages: () => void;
}

/**
 * Kullanıcıya ait mesaj konuşmalarını getiren hook
 * Global context'ten veri çeker
 * @param userId - Kullanıcı ID'si (artık kullanılmıyor, global context'ten geliyor)
 * @param enabled - Hook'un aktif olup olmadığı (artık kullanılmıyor)
 * @returns Mesaj konuşma grupları ve yönetim fonksiyonları
 */
export const useMessages = ({
  userId,
  enabled = true,
}: UseMessagesProps = {}): UseMessagesReturn => {
  const {
    conversationGroups,
    messagesLoading: messageLoading,
    messagesError: messageError,
    refetchMessages,
  } = useData();

  return {
    conversationGroups,
    messageLoading,
    messageError,
    refetchMessages,
  };
};
