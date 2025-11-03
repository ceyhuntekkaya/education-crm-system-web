"use client";

import React, { useState } from "react";
import { useMessageContext } from "./context";
import ConversationListWhatsApp from "./components/conversation-list-whatsapp";
import MessagePaneWhatsApp from "./components/message-pane-whatsapp";
import { MessageTableError } from "@/app/(public)/messages/sections";
import CustomCard from "@/components/ui/custom-card";
import { MessageConversationGroupDto } from "@/types/dto/content/MessageConversationDto";

const Messages: React.FC = () => {
  const {
    // flat messages for legacy uses
    messages,
    loading,
    error,
    handlers,
    selectedMessage,
    detailModal,
    infoModal,
    setSelectedMessage,
    // @ts-ignore - optional extra exposed by provider
    conversationGroups,
  } = useMessageContext();

  // Track selected conversation group (not individual message)
  const [selectedConversation, setSelectedConversation] =
    useState<MessageConversationGroupDto | null>(null);

  // Calculate statistics
  const stats = {
    total: messages.length,
    unread: messages.filter(
      (m) => m.status === "NEW" || m.status === "IN_PROGRESS"
    ).length,
    urgent: messages.filter(
      (m) => m.priority === "URGENT" || m.priority === "CRITICAL"
    ).length,
  };

  // Handle conversation selection
  const handleConversationSelect = (groupId: number) => {
    const group = conversationGroups?.find(
      (g: MessageConversationGroupDto) => g.userId === groupId
    );
    if (group) {
      setSelectedConversation(group);
      // Also set the first message as selected for compatibility
      if (group.conversations.length > 0) {
        setSelectedMessage(group.conversations[0]);
      }
    }
  };

  return (
    <div className="container py-40">
      {/* Statistics Cards */}
      <div className="row mb-24">
        <div className="col-md-4">
          <div className="messages-stats-card bg-primary-50 rounded-12 p-20 border border-primary-200">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="text-primary-600 mb-4">{stats.total}</h3>
                <p className="text-primary-600 fs-14 mb-0">Toplam Mesaj</p>
              </div>
              <div className="messages-icon-box bg-primary-600 text-white rounded-circle p-12">
                <i className="ph ph-chat-circle-text fs-24"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="messages-stats-card bg-warning-50 rounded-12 p-20 border border-warning-200">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="text-warning-600 mb-4">{stats.unread}</h3>
                <p className="text-warning-600 fs-14 mb-0">Okunmamış</p>
              </div>
              <div className="messages-icon-box bg-warning-600 text-white rounded-circle p-12">
                <i className="ph ph-envelope fs-24"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="messages-stats-card bg-danger-50 rounded-12 p-20 border border-danger-200">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="text-danger-600 mb-4">{stats.urgent}</h3>
                <p className="text-danger-600 fs-14 mb-0">Acil</p>
              </div>
              <div className="messages-icon-box bg-danger-600 text-white rounded-circle p-12">
                <i className="ph ph-warning fs-24"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Messages Container with CustomCard */}
      <CustomCard
        title="Mesajlarım"
        subtitle="WhatsApp Web tarzı mesajlaşma arayüzü"
        isLoading={loading}
        isError={error !== null}
        errorMessage={error || undefined}
        padding="p-0"
        className="messages-card"
      >
        {!error && (
          <div className="messages-container">
            {/* Left: Conversation List */}
            <ConversationListWhatsApp
              groups={conversationGroups || []}
              selectedMessageId={selectedConversation?.userId || null}
              onSelectMessage={(m) => {
                // Find the conversation group for this message
                const group = conversationGroups?.find(
                  (g: MessageConversationGroupDto) =>
                    g.conversations.some((conv) => conv.id === m.id)
                );
                if (group) {
                  setSelectedConversation(group);
                }
                setSelectedMessage(m);
              }}
              loading={loading}
            />

            {/* Right: Message Pane */}
            <MessagePaneWhatsApp conversationGroup={selectedConversation} />
          </div>
        )}
      </CustomCard>
    </div>
  );
};

export default Messages;
