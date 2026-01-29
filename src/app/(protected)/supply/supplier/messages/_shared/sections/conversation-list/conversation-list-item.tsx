"use client";

import React from "react";
import type { ConversationListItemProps } from "../../types/message-types";

/**
 * Conversation List Item Component
 * Displays a single conversation in the sidebar list
 */
export const ConversationListItem: React.FC<ConversationListItemProps> = ({
  conversationId,
  companyName,
  productName,
  subject,
  lastMessageAt,
  unreadCount = 0,
  messageCount = 0,
  isSelected,
  onClick,
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Şimdi";
    if (diffMins < 60) return `${diffMins}d`;
    if (diffHours < 24) return `${diffHours}s`;
    if (diffDays < 7) return `${diffDays}g`;

    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  return (
    <div
      className={`messages-page__conversation-item ${
        isSelected ? "messages-page__conversation-item--active" : ""
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <div className="messages-page__conversation-avatar">
        <i className="ph-fill ph-buildings"></i>
      </div>

      <div className="messages-page__conversation-content">
        <div className="messages-page__conversation-header">
          <h4 className="messages-page__conversation-name">{companyName}</h4>
          {lastMessageAt && (
            <span className="messages-page__conversation-time">
              {formatDate(lastMessageAt)}
            </span>
          )}
        </div>

        <div className="messages-page__conversation-details">
          <p className="messages-page__conversation-subject">
            {productName && (
              <span className="messages-page__conversation-product">
                {productName} •{" "}
              </span>
            )}
            <span className="messages-page__conversation-subject-text">
              {subject}
            </span>
          </p>

          <div className="messages-page__conversation-meta">
            {unreadCount > 0 && (
              <span className="messages-page__conversation-unread-badge">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        {messageCount > 0 && (
          <div className="messages-page__conversation-info">
            <span className="messages-page__conversation-message-count">
              <i className="ph ph-chat-circle"></i> {messageCount} mesaj
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
