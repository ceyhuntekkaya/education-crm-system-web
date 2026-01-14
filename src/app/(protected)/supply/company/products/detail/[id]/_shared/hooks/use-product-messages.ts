"use client";

import { useState, useMemo, useEffect } from "react";
import {
  useConversationsByCompany,
  useCreateConversation,
  useMessagesByConversation,
} from "./api";
import { apiClient } from "@/lib/api";
import type { ProductDto, SupplierDto } from "@/types";
import type { ConversationDto, MessageCreateDto } from "@/types/dto/supply";

// ============================================================================
// HOOK: useProductMessages
// ============================================================================
/**
 * Ürün detayında tedarikçi ile mesajlaşma yönetimi (Güncellenmiş)
 *
 * Özellikler:
 * - Şirket bazlı konuşmaları getirme
 * - Product ID ile eşleşen konuşmayı bulma
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
  // API HOOKS - Conversations (Şirkete göre)
  // --------------------------------------------------------------------------
  /**
   * Şirkete ait tüm konuşmaları getir ve product ID ile eşleşeni bul
   */
  const {
    data: conversationsData,
    loading: isLoadingConversations,
    error: conversationsError,
    refetch: refetchConversations,
  } = useConversationsByCompany(companyId, {
    onSuccess: (data) => {
      console.log("🔍 Şirkete ait konuşmalar yüklendi:", {
        total: data.data?.content?.length,
        supplierId: supplier?.id,
        companyId,
        productId,
      });
    },
    onError: (error) => {
      console.error("❌ Konuşmalar yüklenemedi:", error);
    },
  });

  // --------------------------------------------------------------------------
  // CONVERSATION FILTERING EFFECT
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!conversationsData?.data?.content || !supplier?.id) {
      console.log("❌ Filtreleme için gerekli veriler eksik:", {
        hasConversations: !!conversationsData?.data?.content,
        supplierId: supplier?.id,
        productId,
      });
      return;
    }

    // Product ID ile eşleşen konuşmayı bul
    const existingConv = conversationsData.data.content.find(
      (conv) =>
        conv.supplierId === supplier.id &&
        conv.companyId === companyId &&
        conv.productId === productId
    );

    console.log("🔄 Konuşma filtrelemesi:", {
      totalConversations: conversationsData.data.content.length,
      searchCriteria: {
        supplierId: supplier.id,
        companyId,
        productId,
      },
      existingConv,
    });

    if (existingConv?.id) {
      setConversationId(existingConv.id);
      console.log("✅ Mevcut konuşma bulundu:", {
        conversationId: existingConv.id,
        productId: existingConv.productId,
        supplierId: existingConv.supplierId,
      });
    } else {
      setConversationId(null);
      console.log("❌ Bu ürün için konuşma yok → Yeni oluşturulacak");
    }
  }, [conversationsData?.data?.content, supplier?.id, companyId, productId]);

  // --------------------------------------------------------------------------
  // COMPUTED VALUES
  // --------------------------------------------------------------------------
  /**
   * Mevcut konuşma verisi
   */
  const existingConversation = useMemo<ConversationDto | null>(() => {
    if (!conversationsData?.data?.content || !conversationId) return null;

    return (
      conversationsData.data.content.find(
        (conv) => conv.id === conversationId
      ) || null
    );
  }, [conversationsData, conversationId]);

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

  /**
   * Konuşma kontrol durumu
   */
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

      // Step 3: Mesaj gönder (Yeni API)
      console.log("📤 Mesaj gönderiliyor...", {
        conversationId: currentConversationId,
        length: trimmedContent.length,
      });

      const messageData: MessageCreateDto = {
        content: trimmedContent,
      };

      const messageResponse = await apiClient.post(
        `/supply/conversations/${currentConversationId}/messages`,
        messageData
      );

      console.log("✅ Mesaj gönderildi:", messageResponse.data);

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
