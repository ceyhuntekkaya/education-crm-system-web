"use client";

import React, { useRef, useEffect } from "react";
import { useAuth } from "@/contexts";
import { useMessages } from "../../context/messages-context";
import { MessageBubble } from "./message-bubble";
import type { MessageDto } from "@/types/dto/supply";

/**
 * Message List Component
 * Displays the list of messages in the selected conversation
 */
export const MessageList: React.FC = () => {
  const { user } = useAuth();
  const { messages, isLoadingMessages, selectedConversation } = useMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  if (!selectedConversation) {
    return null;
  }

  if (isLoadingMessages) {
    return (
      <div className="messages-page__message-list">
        <div className="messages-page__message-list-loading">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="mt-2 text-muted">Mesajlar yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="messages-page__message-list">
        <div className="messages-page__message-list-empty">
          <div className="messages-page__message-list-empty-icon">
            <i className="ph-bold ph-chat-circle-dots"></i>
          </div>
          <h4>Henüz mesaj bulunmuyor</h4>
          <p className="text-muted">İlk mesajı göndererek konuşmayı başlatın</p>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-page__message-list">
      <div className="messages-page__message-list-content">
        {messages.map((message: MessageDto) => {
          const isOwnMessage = message.senderId === user?.id;
          return (
            <MessageBubble
              key={message.id}
              message={message}
              isOwnMessage={isOwnMessage}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
