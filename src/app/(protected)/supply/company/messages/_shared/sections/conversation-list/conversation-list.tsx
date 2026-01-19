"use client";

import React from "react";
import { useMessages } from "../../context";
import { ConversationListItem } from "./conversation-list-item";

/**
 * Conversation List Component
 * Displays all conversations in a scrollable sidebar (WhatsApp-style)
 */
export const ConversationList: React.FC = () => {
  const {
    conversations,
    isLoadingConversations,
    conversationsError,
    selectedConversationId,
    selectConversation,
  } = useMessages();

  // Loading state
  if (isLoadingConversations) {
    return (
      <div className="messages-page__conversation-list">
        <div className="messages-page__conversation-list-header">
          <h3 className="messages-page__conversation-list-title">
            <i className="ph-bold ph-chats-circle"></i>
            Konuşmalar
          </h3>
        </div>
        <div className="messages-page__conversation-list-loading">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="mt-2 text-muted">Konuşmalar yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (conversationsError) {
    return (
      <div className="messages-page__conversation-list">
        <div className="messages-page__conversation-list-header">
          <h3 className="messages-page__conversation-list-title">
            <i className="ph-bold ph-chats-circle"></i>
            Konuşmalar
          </h3>
        </div>
        <div className="messages-page__conversation-list-error">
          <i className="ph-bold ph-warning-circle"></i>
          <p>Konuşmalar yüklenirken bir hata oluştu</p>
          <small className="text-muted">{conversationsError}</small>
        </div>
      </div>
    );
  }

  // Empty state
  if (conversations.length === 0) {
    return (
      <div className="messages-page__conversation-list">
        <div className="messages-page__conversation-list-header">
          <h3 className="messages-page__conversation-list-title">
            <i className="ph-bold ph-chats-circle"></i>
            Konuşmalar
          </h3>
        </div>
        <div className="messages-page__conversation-list-empty">
          <div className="messages-page__conversation-list-empty-icon">
            <i className="ph-bold ph-chat-circle-dots"></i>
          </div>
          <h4>Henüz Mesajınız Yok</h4>
          <p>
            Tedarikçilerle mesajlaşmaya başlamak için ürün sayfalarından
            &quot;Tedarikçiye Mesaj Gönder&quot; butonunu kullanabilirsiniz.
          </p>
        </div>
      </div>
    );
  }

  // Conversations list
  return (
    <div className="messages-page__conversation-list">
      <div className="messages-page__conversation-list-header">
        <h3 className="messages-page__conversation-list-title">
          <i className="ph-bold ph-chats-circle"></i>
          Konuşmalar
        </h3>
        <span className="messages-page__conversation-count">
          {conversations.length}
        </span>
      </div>

      <div className="messages-page__conversation-list-items">
        {conversations.map((conversation) => (
          <ConversationListItem
            key={conversation.id}
            conversationId={conversation.id!}
            supplierName={
              conversation.supplierCompanyName || "İsimsiz Tedarikçi"
            }
            productName={conversation.productName}
            subject={conversation.subject || "Konu yok"}
            lastMessageAt={conversation.lastMessageAt}
            unreadCount={conversation.unreadCount}
            messageCount={conversation.messageCount}
            isSelected={selectedConversationId === conversation.id}
            onClick={() => selectConversation(conversation.id!)}
          />
        ))}
      </div>
    </div>
  );
};
