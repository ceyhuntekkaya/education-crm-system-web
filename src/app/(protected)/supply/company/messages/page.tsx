"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { MessagesHeader, ConversationList, MessageView } from "./_shared";

/**
 * Messages Page Component
 * WhatsApp-style messaging interface with conversation list and message view
 * Designed to match the DataCollectionLayout style used in RFQs page
 */
const MessagesPage: React.FC = () => {
  usePageTitle("Mesajlar");

  return (
    <div className="messages-page-wrapper">
      {/* Header Section - Matches DataCollectionLayout style */}
      <MessagesHeader />

      {/* Main Content - WhatsApp-style Layout */}
      <div className="messages-page">
        <div className="messages-page__container">
          {/* Left Sidebar - Conversation List */}
          <div className="messages-page__sidebar">
            <ConversationList />
          </div>

          {/* Right Content - Message View */}
          <div className="messages-page__content">
            <MessageView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
