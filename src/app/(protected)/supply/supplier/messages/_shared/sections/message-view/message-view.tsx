"use client";

import React from "react";
import { useMessages } from "../../context/messages-context";
import { MessageViewHeader } from "./message-view-header";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";

/**
 * Message View Component
 * Main component for displaying messages and chat interface (right side)
 */
export const MessageView: React.FC = () => {
  const { selectedConversation } = useMessages();

  // No conversation selected - show empty state
  if (!selectedConversation) {
    return (
      <div className="messages-page__message-view">
        <div className="messages-page__message-view-empty">
          <div className="messages-page__message-view-empty-icon">
            <i className="ph-duotone ph-chats-circle"></i>
          </div>
          <h3>Mesajlaşmaya Başlayın</h3>
          <p>
            Sol taraftaki listeden bir konuşma seçerek şirketlerle mesajlaşmaya
            başlayabilirsiniz.
          </p>
          <div className="messages-page__message-view-empty-hint">
            <i className="ph-bold ph-arrow-left"></i>
            <span>Bir konuşma seçin</span>
          </div>
        </div>
      </div>
    );
  }

  // Conversation selected - show messages
  return (
    <div className="messages-page__message-view">
      <MessageViewHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
};
