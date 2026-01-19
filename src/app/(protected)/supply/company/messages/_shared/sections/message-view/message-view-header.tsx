"use client";

import React from "react";
import { useMessages } from "../../context";

/**
 * Message View Header Component
 * Displays the header with conversation info
 */
export const MessageViewHeader: React.FC = () => {
  const { selectedConversation } = useMessages();

  if (!selectedConversation) {
    return null;
  }

  return (
    <div className="messages-page__message-view-header">
      <div className="messages-page__message-view-header-avatar">
        <i className="ph-fill ph-buildings"></i>
      </div>
      
      <div className="messages-page__message-view-header-info">
        <h3 className="messages-page__message-view-header-title">
          {selectedConversation.supplierCompanyName || "İsimsiz Tedarikçi"}
        </h3>
        
        <div className="messages-page__message-view-header-details">
          {selectedConversation.productName && (
            <span className="messages-page__message-view-header-product">
              <i className="ph ph-package me-1"></i>
              {selectedConversation.productName}
            </span>
          )}
          {selectedConversation.messageCount !== undefined && (
            <span className="messages-page__message-view-header-count">
              <i className="ph ph-chat-circle me-1"></i>
              {selectedConversation.messageCount} mesaj
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
