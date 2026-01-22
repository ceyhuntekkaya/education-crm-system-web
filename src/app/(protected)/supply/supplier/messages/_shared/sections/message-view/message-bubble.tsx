"use client";

import React from "react";
import type { MessageBubbleProps } from "../../types/message-types";

/**
 * Message Bubble Component
 * Displays a single message bubble (sent or received)
 */
export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
}) => {
  const formatTime = (dateString?: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div
      className={`messages-page__message ${
        isOwnMessage
          ? "messages-page__message--own"
          : "messages-page__message--other"
      }`}
    >
      {!isOwnMessage && message.senderName && (
        <div className="messages-page__message-sender-name">
          {message.senderName}
        </div>
      )}

      <div className="messages-page__message-bubble">
        <p className="messages-page__message-content">{message.content}</p>
        <span className="messages-page__message-time">
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
};
