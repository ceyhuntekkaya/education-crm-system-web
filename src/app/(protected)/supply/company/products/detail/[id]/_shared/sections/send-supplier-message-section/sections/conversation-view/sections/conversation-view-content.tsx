"use client";

import React, { useState } from "react";
import { useProductDetail } from "../../../../../context";
import { useForm } from "@/contexts/form-context";
import { useAuth } from "@/contexts/auth-context";
import { useScroll } from "@/hooks";
import { MessageFormData } from "../types";
import { useCreateConversation } from "../../../../../hooks/api";

interface ConversationViewContentProps {
  conversationId: number | null;
}

/**
 * Conversation view content component
 * Context'ten tüm değerleri alır
 */
export const ConversationViewContent: React.FC<
  ConversationViewContentProps
> = ({ conversationId }) => {
  const { values, setValue, validate, reset } = useForm();
  const { user } = useAuth();
  const {
    sendMessage,
    isSendingMessage,
    refetchConversations,
    messages,
    isLoadingMessages,
    companyId,
    product,
    supplier,
  } = useProductDetail();

  const [isStartingConversation, setIsStartingConversation] = useState(false);
  const { mutateAsync: createConversation } = useCreateConversation();

  // Scroll to bottom hook - mesaj sayısı değiştiğinde otomatik scroll
  const { ref: messagesEndRef } = useScroll({
    dependencies: [messages.length],
    behavior: "smooth",
    block: "end",
  });

  // Konuşma başlatma handler'ı
  const handleStartConversation = async () => {
    if (!supplier?.id || !product) {
      console.error("❌ Supplier veya Product bilgisi eksik");
      return;
    }

    setIsStartingConversation(true);

    try {
      const response = await createConversation({
        companyId,
        supplierId: supplier.id,
        productId: product.id,
        messageType: "PRODUCT_INQUIRY",
        subject: `${product.name} hakkında soru`,
      });

      if (response.data?.id) {
        console.log("✅ Konuşma başlatıldı:", response.data.id);
        // Context'teki conversations listesini yenile
        await refetchConversations();
      }
    } catch (error) {
      console.error("❌ Konuşma başlatılamadı:", error);
    } finally {
      setIsStartingConversation(false);
    }
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validate();
    if (!isValid) return;

    const formValues = values as MessageFormData;
    const success = await sendMessage(formValues.content);

    if (success) {
      await refetchConversations();
      reset();
    }
  };

  return (
    <>
      {!conversationId ? (
        // Konuşma yok - Başlatma ekranı
        <div className="conversation-view__start-screen">
          <div className="conversation-view__start-screen-content">
            <div className="conversation-view__start-screen-icon">
              <i className="ph-bold ph-chat-circle-dots"></i>
            </div>
            <div className="conversation-view__start-screen-text">
              <h4 className="conversation-view__start-screen-title">
                Henüz Bir Konuşma Yok
              </h4>
              <p className="conversation-view__start-screen-description">
                <span className="conversation-view__start-screen-highlight">
                  {supplier?.companyName}
                </span>{" "}
                firması ile{" "}
                <span className="conversation-view__start-screen-highlight">
                  {product?.name}
                </span>{" "}
                ürünü hakkında konuşma başlatın
              </p>
            </div>
            <button
              type="button"
              className="conversation-view__start-button"
              onClick={handleStartConversation}
              disabled={isStartingConversation}
            >
              {isStartingConversation ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Konuşma Başlatılıyor...
                </>
              ) : (
                <>Konuşmayı Başlat</>
              )}
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Mesaj Listesi - Konuşma var */}
          <div className="conversation-view__messages">
            {isLoadingMessages ? (
              // Mesajlar yükleniyor
              <div className="conversation-view__loading">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Yükleniyor...</span>
                </div>
              </div>
            ) : messages.length === 0 ? (
              // Konuşma var ama henüz mesaj yok
              <div className="conversation-view__empty">
                <div
                  className="d-flex flex-column align-items-center justify-content-center text-center"
                  style={{ minHeight: "200px", padding: "1.5rem" }}
                >
                  <div
                    className="bg-light rounded-circle p-3 mb-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="bi bi-chat-square-dots text-muted"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </div>
                  <h6 className="text-muted mb-2">Henüz mesaj bulunmuyor</h6>
                  <p
                    className="text-muted small mb-0"
                    style={{ opacity: "0.7" }}
                  >
                    İlk mesajı göndererek konuşmayı başlatın
                  </p>
                </div>
              </div>
            ) : (
              // Mesajlar var, göster
              <div className="conversation-view__messages-list">
                {messages.map((message) => {
                  // senderId ile user.id karşılaştırarak kendi mesajlarımızı belirliyoruz
                  const isOwnMessage = message.senderId === user?.id;
                  return (
                    <div
                      key={message.id}
                      className={`conversation-view__message ${
                        isOwnMessage
                          ? "conversation-view__message--own"
                          : "conversation-view__message--other"
                      }`}
                    >
                      <div className="conversation-view__message-bubble">
                        <p className="conversation-view__message-content">
                          {message.content}
                        </p>
                        <span className="conversation-view__message-time">
                          {message.createdAt &&
                            new Date(message.createdAt).toLocaleString(
                              "tr-TR",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Mesaj Gönderme Formu - Sadece konuşma varsa */}
          <div className="conversation-view__form">
            <form
              onSubmit={handleSubmit}
              className="conversation-view__form-container"
            >
              <div className="conversation-view__input-group">
                <textarea
                  name="content"
                  value={(values as MessageFormData).content || ""}
                  onChange={(e) => setValue("content", e.target.value)}
                  placeholder="Mesajınızı yazın..."
                  className="conversation-view__textarea"
                  rows={2}
                  disabled={isSendingMessage}
                />
                <button
                  type="submit"
                  disabled={
                    isSendingMessage ||
                    !(values as MessageFormData).content?.trim()
                  }
                  className="conversation-view__send-button"
                >
                  {isSendingMessage ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send-fill me-2"></i>
                      Gönder
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};
