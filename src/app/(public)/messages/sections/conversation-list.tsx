"use client";

import React from "react";
import { useMessageContext } from "../context";
import { formatConversationDate, getUnreadCount } from "../utils";

export const ConversationList: React.FC = () => {
  const { conversationGroups, selectedMessageId, handleSelectMessage } =
    useMessageContext();

  if (!conversationGroups || conversationGroups.length === 0) {
    return (
      <div className="messages-sidebar">
        <div className="messages-sidebar-header">
          <h5>Mesajlar</h5>
          <div className="sidebar-actions">
            <i className="ph ph-magnifying-glass"></i>
            <i className="ph ph-dots-three-vertical"></i>
          </div>
        </div>

        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "500px" }}
        >
          <div className="text-center p-32">
            <i className="ph ph-chat-circle-dots ph-3x text-neutral-400 mb-16"></i>
            <p className="text-neutral-500 fs-14 mb-0">Mesaj bulunamadı</p>
          </div>
        </div>
      </div>
    );
  }

  // Flatten all conversations for easier rendering
  // Each group represents one person, show them as one conversation item
  const conversationItems = conversationGroups.map((group) => {
    // Get the latest message from this group
    const latestMessage = group.conversations.reduce((latest, current) => {
      return new Date(current.createdAt || 0) > new Date(latest.createdAt || 0)
        ? current
        : latest;
    }, group.conversations[0]);

    const unreadCount = getUnreadCount(group.conversations);

    return {
      group,
      latestMessage,
      unreadCount,
      isUnread: unreadCount > 0,
    };
  });

  return (
    <div className="messages-sidebar">
      {/* Search Bar */}
      <div className="messages-search-bar">
        <div className="messages-search-wrapper">
          <i className="ph ph-magnifying-glass search-icon"></i>
          <input
            type="text"
            placeholder="Ara veya yeni sohbet başlat"
            className="search-input"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="messages-conversations-list">
        {conversationItems.map(
          ({ group, latestMessage, unreadCount, isUnread }) => {
            const isSelected = selectedMessageId === group.userId;

            return (
              <div
                key={group.userId}
                onClick={() => handleSelectMessage(latestMessage)}
                className={`messages-conversation-item ${
                  isSelected ? "selected" : ""
                }`}
              >
                {/* Content */}
                <div className="messages-conversation-content">
                  <div className="messages-conversation-header">
                    <h6
                      className={`messages-conversation-name ${
                        isUnread ? "unread" : ""
                      }`}
                    >
                      {latestMessage.school?.name || "Kurum Belirtilmemiş"}
                    </h6>
                    <span className="messages-conversation-time">
                      {formatConversationDate(group.lastMessageDate)}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="text-neutral-600 fs-13">
                      {group.personName || "İsimsiz"}
                    </span>
                  </div>

                  <div className="messages-conversation-preview">
                    <div className="messages-preview-text">
                      {latestMessage.priority &&
                        (latestMessage.priority === "URGENT" ||
                          latestMessage.priority === "CRITICAL") && (
                          <i className="ph ph-warning text-danger-600 me-4"></i>
                        )}
                      <span className={isUnread ? "unread-text" : ""}>
                        {latestMessage.content?.substring(0, 50) ||
                          "Mesaj içeriği yok"}
                        {(latestMessage.content?.length || 0) > 50 ? "..." : ""}
                      </span>
                    </div>

                    {unreadCount > 0 && (
                      <div className="messages-unread-badge">{unreadCount}</div>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default ConversationList;
