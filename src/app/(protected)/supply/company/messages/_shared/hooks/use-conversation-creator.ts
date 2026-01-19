"use client";

import { useState } from "react";
import { useCreateConversation } from "./api";

/**
 * Hook for creating new conversations
 */
export const useConversationCreator = (
  companyId: number,
  onConversationCreated?: (conversationId: number) => Promise<void>
) => {
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);
  const { mutateAsync: createConversationMutation } = useCreateConversation();

  /**
   * Create a new conversation
   */
  const createNewConversation = async (data: {
    supplierId: number;
    subject: string;
    messageType?: string;
    productId?: number;
  }): Promise<number | null> => {
    setIsCreatingConversation(true);

    try {
      console.log("📝 Yeni konuşma oluşturuluyor...", data);

      const response = await createConversationMutation({
        companyId,
        supplierId: data.supplierId,
        subject: data.subject,
        messageType: data.messageType as any,
        productId: data.productId,
      });

      const newConversationId = response.data?.id || null;

      if (newConversationId) {
        console.log("✅ Konuşma oluşturuldu:", newConversationId);

        // Notify parent
        if (onConversationCreated) {
          await onConversationCreated(newConversationId);
        }

        return newConversationId;
      }

      return null;
    } catch (error: any) {
      console.error("❌ Konuşma oluşturulamadı:", error);
      return null;
    } finally {
      setIsCreatingConversation(false);
    }
  };

  return {
    isCreatingConversation,
    createNewConversation,
  };
};
