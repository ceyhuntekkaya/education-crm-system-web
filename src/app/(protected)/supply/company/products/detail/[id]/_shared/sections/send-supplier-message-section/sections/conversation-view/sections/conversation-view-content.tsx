"use client";

import React from "react";
import { useProductDetail } from "../../../../../context";
import { useForm } from "@/contexts/form-context";
import { useScroll } from "@/hooks";
import { MessageFormData } from "../types";

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
  const {
    sendMessage,
    isSendingMessage,
    refetchConversations,
    messages,
    isLoadingMessages,
    companyId,
  } = useProductDetail();

  // Scroll to bottom hook - mesaj sayısı değiştiğinde otomatik scroll
  const { ref: messagesEndRef } = useScroll({
    dependencies: [messages.length],
    behavior: "smooth",
    block: "end",
  });

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
      {/* Mesaj Listesi - Her zaman göster */}
      <div className="conversation-view__messages">
        {!conversationId ? (
          // Henüz konuşma başlatılmamış
          <div className="conversation-view__empty">
            <div className="text-center py-4">
              <i className="bi bi-chat-dots fs-1 text-muted mb-3 d-block"></i>
              <p className="text-muted mb-1">Henüz mesaj yok</p>
              <small className="text-muted">
                İlk mesajınızı göndererek konuşmayı başlatın
              </small>
            </div>
          </div>
        ) : isLoadingMessages ? (
          // Mesajlar yükleniyor
          <div className="conversation-view__loading">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Yükleniyor...</span>
            </div>
          </div>
        ) : messages.length === 0 ? (
          // Konuşma var ama henüz mesaj yok
          <div className="conversation-view__empty">
            <p className="text-muted">Henüz mesaj yok. İlk mesajı gönderin!</p>
          </div>
        ) : (
          // Mesajlar var, göster
          <div className="conversation-view__messages-list">
            {messages.map((message) => {
              const isOwnMessage = message.senderId === companyId;
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
                      {new Date(message.createdAt).toLocaleString("tr-TR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Mesaj Gönderme Formu */}
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
                isSendingMessage || !(values as MessageFormData).content?.trim()
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
  );
};
