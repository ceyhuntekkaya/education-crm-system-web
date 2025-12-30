"use client";

import { useState, useMemo } from "react";
import {
  useConversationsByProduct,
  useCreateConversation,
  useMessagesByConversation,
} from "./api";
import { apiClient } from "@/lib/api";
import type { ProductDto, SupplierDto } from "@/types";

// ============================================================================
// HOOK: useProductMessages
// ============================================================================
/**
 * Ürün detayında tedarikçi ile mesajlaşma yönetimi
 *
 * Özellikler:
 * - Mevcut konuşma kontrolü (otomatik)
 * - Yeni konuşma oluşturma (gerekirse)
 * - Mesaj gönderme
 * - Mesaj geçmişi
 *
 * NOT: product ve supplier context'ten geçilir (duplicate API isteği önlenir)
 *
 * @param productId - Ürün ID'si
 * @param product - Product verisi (context'ten)
 * @param supplier - Supplier verisi (context'ten)
 * @returns Mesajlaşma state ve fonksiyonları
 */
export const useProductMessages = (
  productId: number,
  product?: ProductDto | null,
  supplier?: SupplierDto | null
) => {
  // --------------------------------------------------------------------------
  // CONFIGURATION
  // --------------------------------------------------------------------------
  const companyId = 1; // TODO: Auth context'ten al

  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // --------------------------------------------------------------------------
  // API HOOKS - Conversations
  // --------------------------------------------------------------------------
  /**
   * Konuşmaları yükle ve mevcut konuşmayı otomatik bul
   * onSuccess: Konuşma bulunduğunda conversationId'yi set et
   */
  const {
    data: conversationsData,
    loading: isLoadingConversations,
    error: conversationsError,
    refetch: refetchConversations,
  } = useConversationsByProduct(productId, {
    onSuccess: (data) => {
      console.log("🔍 Konuşmalar yüklendi:", {
        total: data.data?.content?.length,
        supplierId: supplier?.id,
        companyId,
        productId,
      });

      const existingConv = data.data?.content?.find(
        (conv) =>
          conv.supplierId === supplier?.id &&
          conv.companyId === companyId &&
          conv.productId === productId
      );

      if (existingConv?.id) {
        setConversationId(existingConv.id);
        console.log("✅ Mevcut konuşma:", existingConv.id);
      } else {
        setConversationId(null);
        console.log("❌ Konuşma yok → Yeni oluşturulacak");
      }
    },
    onError: (error) => {
      console.error("❌ Konuşmalar yüklenemedi:", error);
    },
  });

  // --------------------------------------------------------------------------
  // API HOOKS - Create Conversation
  // --------------------------------------------------------------------------
  const { mutateAsync: createConversation } = useCreateConversation();

  // --------------------------------------------------------------------------
  // API HOOKS - Messages
  // --------------------------------------------------------------------------
  /**
   * Mesajları yükle (sadece conversationId varsa)
   */
  const {
    data: messagesData,
    loading: isLoadingMessages,
    refetch: refetchMessages,
  } = useMessagesByConversation(conversationId || undefined);

  // --------------------------------------------------------------------------
  // COMPUTED VALUES - Performance optimized with useMemo
  // --------------------------------------------------------------------------
  const messages = useMemo(
    () => messagesData?.data?.content || [],
    [messagesData]
  );

  const existingConversation = useMemo(
    () =>
      conversationsData?.data?.content?.find(
        (conv) =>
          conv.supplierId === supplier?.id &&
          conv.companyId === companyId &&
          conv.productId === productId
      ) || null,
    [conversationsData, supplier?.id, companyId, productId]
  );

  const isCheckingConversation = isLoadingConversations;

  // --------------------------------------------------------------------------
  // MESSAGE SENDING FUNCTION
  // --------------------------------------------------------------------------
  /**
   * Mesaj gönderme - Async/await ile sıralı işlem
   *
   * Akış:
   * 1. Validation (boşluk, karakter limiti, gerekli veriler)
   * 2. ConversationId yoksa → Yeni konuşma oluştur
   * 3. Mesaj gönder (POST request)
   * 4. Refetch (Konuşmaları ve mesajları güncelle)
   *
   * @param content - Mesaj içeriği (1-1000 karakter)
   * @returns Promise<boolean> - Başarılı: true, Hatalı: false
   */
  const sendMessage = async (content: string): Promise<boolean> => {
    const trimmedContent = content.trim();

    // Step 1: Validation
    if (!trimmedContent) {
      console.error("❌ Mesaj boş");
      return false;
    }

    if (trimmedContent.length < 1 || trimmedContent.length > 1000) {
      console.error("❌ Mesaj 1-1000 karakter olmalı");
      return false;
    }

    if (!supplier?.id || !companyId) {
      console.error("❌ Supplier veya Company bilgisi eksik");
      return false;
    }

    setIsSendingMessage(true);

    try {
      let currentConversationId = conversationId;

      // Step 2: ConversationId yoksa oluştur
      if (!currentConversationId) {
        console.log("📝 Yeni conversation oluşturuluyor...");

        const response = await createConversation({
          supplierId: supplier.id,
          companyId,
          productId,
          subject: `${product?.name || "Ürün"} hakkında soru`,
          messageType: "PRODUCT_INQUIRY",
        });

        currentConversationId = response.data?.id || null;

        if (!currentConversationId) {
          throw new Error("Conversation oluşturulamadı");
        }

        console.log("✅ Conversation oluşturuldu:", currentConversationId);
        setConversationId(currentConversationId);

        // KRITIK: Yeni conversation oluşturulduktan HEMEN sonra refetch
        // Böylece existingConversation güncellenip bir daha yeni conversation oluşturulmaz
        await refetchConversations();
        console.log("🔄 Conversations listesi güncellendi");
      }

      // Step 3: Mesaj gönder
      console.log("📤 Mesaj gönderiliyor...", {
        conversationId: currentConversationId,
        length: trimmedContent.length,
      });

      await apiClient.post(
        `/supply/conversations/${currentConversationId}/messages`,
        {
          content: trimmedContent,
          subject: `${product?.name || "Ürün"} hakkında`,
          messageType: "PRODUCT_INQUIRY" as const,
          priority: "NORMAL" as const,
          status: "NEW" as const,
        }
      );

      console.log("✅ Mesaj gönderildi");

      // Step 4: Refetch messages only (conversations already refetched after creation)
      await refetchMessages();

      return true;
    } catch (error: any) {
      console.error("❌ Mesaj gönderilemedi:", {
        message: error?.message,
        status: error?.response?.status,
        data: error?.response?.data,
      });
      return false;
    } finally {
      setIsSendingMessage(false);
    }
  };

  // --------------------------------------------------------------------------
  // RETURN - Public API
  // --------------------------------------------------------------------------
  return {
    // IDs
    conversationId,
    companyId,

    // Data
    messages,
    existingConversation,

    // Loading States
    isCheckingConversation,
    isLoadingMessages,
    isSendingMessage,

    // Errors
    conversationsError,

    // Functions
    sendMessage,
    refetchConversations,
  };
};
