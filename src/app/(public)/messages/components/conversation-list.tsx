"use client";

import React from "react";
import { MessageConversationGroupDto } from "@/types/dto/content/MessageConversationDto";
import { MessageDto } from "@/types/dto/content/MessageDto";
import { Icon } from "@/components/ui/icon";
import { Badge } from "./badge";

interface ConversationListProps {
  groups: MessageConversationGroupDto[];
  selectedMessageId?: number | null;
  onSelectMessage: (message: MessageDto) => void;
  loading?: boolean;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  groups,
  selectedMessageId,
  onSelectMessage,
  loading = false,
}) => {
  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 48) {
      return "Dün";
    } else {
      return date.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "short",
      });
    }
  };

  // Get priority icon and color
  const getPriorityBadgeVariant = (
    priority?: string
  ): "danger" | "warning" | "info" | "success" | "neutral" => {
    switch (priority) {
      case "CRITICAL":
      case "URGENT":
        return "danger";
      case "HIGH":
        return "warning";
      case "NORMAL":
        return "info";
      case "LOW":
        return "success";
      default:
        return "neutral";
    }
  };

  if (loading) {
    return (
      <div className="conversation-list-container bg-white border-end border-neutral-30 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <Icon icon="ph-spinner" size="lg" className="text-primary-600 mb-8" />
          <p className="text-neutral-500 fs-14">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!groups || groups.length === 0) {
    return (
      <div className="conversation-list-container bg-white border-end border-neutral-30 d-flex align-items-center justify-content-center">
        <div className="text-center p-32">
          <Icon
            icon="ph-chat-circle-dots"
            size="lg"
            className="text-neutral-400 mb-12"
          />
          <p className="text-neutral-500 fs-14 mb-0">Mesaj bulunamadı</p>
        </div>
      </div>
    );
  }

  return (
    <div className="conversation-list-container bg-white border-end border-neutral-30">
      {/* Header */}
      <div className="conversation-list-header p-20 border-bottom border-neutral-30 bg-neutral-25">
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="mb-0 text-heading">Mesajlar</h5>
          <Icon
            icon="ph-magnifying-glass"
            size="sm"
            className="text-neutral-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Conversation Groups */}
      <div className="conversation-list-body overflow-auto">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="conversation-group">
            {/* Group Header */}
            <div className="group-header px-20 py-12 bg-neutral-50 border-bottom border-neutral-30">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-8">
                  <Icon
                    icon="ph-user-circle"
                    size="sm"
                    className="text-neutral-600"
                  />
                  <span className="fs-14 fw-medium text-heading">
                    {group.personName}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-8">
                  <Badge variant="neutral" size="sm">
                    {group.totalConversations}
                  </Badge>
                  <span className="fs-12 text-neutral-500">
                    {formatDate(group.lastMessageDate)}
                  </span>
                </div>
              </div>
            </div>

            {/* Conversations */}
            <div className="conversations-list">
              {group.conversations.map((conversation) => {
                const isSelected = selectedMessageId === conversation.id;
                const isUnread =
                  conversation.status === "NEW" ||
                  conversation.status === "IN_PROGRESS";

                return (
                  <div
                    key={conversation.id}
                    onClick={() => onSelectMessage(conversation)}
                    className={`conversation-item p-16 px-20 border-bottom border-neutral-30 cursor-pointer transition-all ${
                      isSelected
                        ? "bg-primary-50 border-start border-primary-600 border-start-width-3"
                        : "hover-bg-neutral-25"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-start gap-12">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div
                          className={`avatar avatar-md rounded-circle ${
                            isUnread ? "bg-primary-100" : "bg-neutral-100"
                          } d-flex align-items-center justify-content-center`}
                        >
                          <Icon
                            icon="ph-user"
                            size="sm"
                            className={
                              isUnread ? "text-primary-600" : "text-neutral-600"
                            }
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-fill overflow-hidden">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                          <h6
                            className={`mb-0 text-truncate ${
                              isUnread ? "fw-bold" : "fw-medium"
                            }`}
                          >
                            {conversation.senderName ||
                              conversation.senderUser?.fullName ||
                              "İsimsiz"}
                          </h6>
                          <span className="fs-12 text-neutral-500 flex-shrink-0 ms-8">
                            {formatDate(
                              conversation.createdAt || new Date().toISOString()
                            )}
                          </span>
                        </div>

                        <div className="d-flex align-items-center justify-content-between gap-8 mb-4">
                          <p
                            className={`fs-14 mb-0 text-truncate ${
                              isUnread
                                ? "text-heading fw-medium"
                                : "text-neutral-600"
                            }`}
                          >
                            {conversation.subject || "Konu yok"}
                          </p>
                          {conversation.priority && (
                            <Badge
                              variant={getPriorityBadgeVariant(
                                conversation.priority
                              )}
                              size="sm"
                              className="flex-shrink-0"
                            >
                              {conversation.priority}
                            </Badge>
                          )}
                        </div>

                        <div className="d-flex align-items-center justify-content-between">
                          <p className="fs-13 text-neutral-500 mb-0 text-truncate">
                            {conversation.content
                              ? conversation.content.length > 60
                                ? conversation.content.substring(0, 60) + "..."
                                : conversation.content
                              : "İçerik yok"}
                          </p>
                          {isUnread && (
                            <div className="flex-shrink-0 ms-8">
                              <span className="badge-dot bg-primary-600"></span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
