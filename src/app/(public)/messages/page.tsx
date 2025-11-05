"use client";

import React, { useState } from "react";
import { useMessageContext } from "./context";
import ConversationListWhatsApp from "./components/conversation-list-whatsapp";
import MessagePaneWhatsApp from "./components/message-pane-whatsapp";
import CustomCard from "@/components/ui/custom-card";
import { MessageConversationGroupDto } from "@/types/dto/content/MessageConversationDto";

const Messages: React.FC = () => {
  const {
    messages,
    loading,
    error,
    handlers,
    selectedMessage,
    detailModal,
    infoModal,
    setSelectedMessage,
    // @ts-ignore
    conversationGroups,
  } = useMessageContext();

  const [selectedConversation, setSelectedConversation] =
    useState<MessageConversationGroupDto | null>(null);

  const stats = {
    total: messages.length,
    unread: messages.filter(
      (m) => m.status === "NEW" || m.status === "IN_PROGRESS"
    ).length,
    urgent: messages.filter(
      (m) => m.priority === "URGENT" || m.priority === "CRITICAL"
    ).length,
  };

  const handleConversationSelect = (groupId: number) => {
    const group = conversationGroups?.find(
      (g: MessageConversationGroupDto) => g.userId === groupId
    );
    if (group) {
      setSelectedConversation(group);
      if (group.conversations.length > 0) {
        setSelectedMessage(group.conversations[0]);
      }
    }
  };

  return (
    <div className="container py-40">
      <div className="d-flex gap-12 mb-20">
        <div className="flex-fill">
          <div className="d-flex align-items-center gap-8 bg-primary-50 rounded-8 px-12 py-8 border border-primary-200">
            <i className="ph ph-chat-circle-text text-primary-600 fs-18"></i>
            <div>
              <div className="text-primary-600 fw-semibold fs-16">
                {stats.total}
              </div>
              <div className="text-primary-500 fs-12">Toplam</div>
            </div>
          </div>
        </div>
        <div className="flex-fill">
          <div className="d-flex align-items-center gap-8 bg-warning-50 rounded-8 px-12 py-8 border border-warning-200">
            <i className="ph ph-envelope text-warning-600 fs-18"></i>
            <div>
              <div className="text-warning-600 fw-semibold fs-16">
                {stats.unread}
              </div>
              <div className="text-warning-500 fs-12">Okunmamış</div>
            </div>
          </div>
        </div>
        <div className="flex-fill">
          <div className="d-flex align-items-center gap-8 bg-danger-50 rounded-8 px-12 py-8 border border-danger-200">
            <i className="ph ph-warning text-danger-600 fs-18"></i>
            <div>
              <div className="text-danger-600 fw-semibold fs-16">
                {stats.urgent}
              </div>
              <div className="text-danger-500 fs-12">Acil</div>
            </div>
          </div>
        </div>
      </div>

      <CustomCard
        title="Mesajlarım"
        isLoading={loading}
        isError={error !== null}
        errorMessage={error || undefined}
      >
        {!error && (
          <div className="messages-container">
            <ConversationListWhatsApp
              groups={conversationGroups || []}
              selectedMessageId={selectedConversation?.userId || null}
              onSelectMessage={(m) => {
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

            <MessagePaneWhatsApp conversationGroup={selectedConversation} />
          </div>
        )}
      </CustomCard>
    </div>
  );
};

export default Messages;
