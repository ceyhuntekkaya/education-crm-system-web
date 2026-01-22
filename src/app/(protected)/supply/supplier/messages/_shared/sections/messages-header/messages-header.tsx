"use client";

import React from "react";
import { useMessages } from "../../context/messages-context";
import type { ConversationDto } from "@/types/dto/supply";

/**
 * Messages Header Component
 * Header section matching DataCollectionLayout style
 * Similar to RFQs page header
 */
export const MessagesHeader: React.FC = () => {
  const { conversations, isLoadingConversations } = useMessages();

  const totalCount = conversations.length;
  const unreadCount = conversations.reduce(
    (sum: number, conv: ConversationDto) => sum + (conv.unreadCount || 0),
    0,
  );

  return (
    <div className="messages-header">
      {/* Title Section */}
      <div className="messages-header__top">
        <div className="messages-header__left">
          {/* Icon */}
          <div className="messages-header__icon-wrapper">
            <i className="ph-duotone ph-chats-circle messages-header__icon"></i>
          </div>

          {/* Title & Subtitle */}
          <div className="messages-header__text">
            <h2 className="messages-header__title">
              Mesajlar
              {!isLoadingConversations && totalCount > 0 && (
                <span className="messages-header__count">({totalCount})</span>
              )}
            </h2>
            <p className="messages-header__subtitle">
              Şirketlerle mesajlaşın ve iletişim kurun
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="messages-header__stats">
          {/* Total Conversations */}
          <div className="messages-header__stat-card">
            <div className="messages-header__stat-icon bg-primary-100 text-primary-700">
              <i className="ph-bold ph-chats-circle"></i>
            </div>
            <div className="messages-header__stat-content">
              <span className="messages-header__stat-value">
                {isLoadingConversations ? "-" : totalCount}
              </span>
              <span className="messages-header__stat-label">Konuşma</span>
            </div>
          </div>

          {/* Unread Messages */}
          <div className="messages-header__stat-card">
            <div className="messages-header__stat-icon bg-warning-100 text-warning-700">
              <i className="ph-bold ph-bell-ringing"></i>
            </div>
            <div className="messages-header__stat-content">
              <span className="messages-header__stat-value">
                {isLoadingConversations ? "-" : unreadCount}
              </span>
              <span className="messages-header__stat-label">Okunmamış</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
