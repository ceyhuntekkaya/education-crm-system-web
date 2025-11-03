"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import { MessageConversationGroupDto } from "@/types/dto/content/MessageConversationDto";

interface MessagePaneWhatsAppProps {
  conversationGroup: MessageConversationGroupDto | null;
}

export const MessagePaneWhatsApp: React.FC<MessagePaneWhatsAppProps> = ({
  conversationGroup,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationGroup?.conversations]);

  // Handle send message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // TODO: Implement actual API call to send message
      console.log("Mesaj gönderiliyor:", newMessage);
      setNewMessage("");
    }
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  // Format date helper
  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Determine if message is sent by current user (outgoing) or received (incoming)
  const isOutgoingMessage = (message: MessageDto): boolean => {
    // If message has a response or internal notes, it's outgoing (from admin/staff)
    return !!(message.firstResponseAt || message.internalNotes);
  };

  // Group messages by date
  const groupMessagesByDate = (messages: MessageDto[]) => {
    const groups: { [key: string]: MessageDto[] } = {};
    messages.forEach((msg) => {
      const dateKey = formatDateTime(msg.createdAt).split(",")[0];
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(msg);
    });
    return groups;
  };

  if (!conversationGroup) {
    return (
      <div className="messages-chat-pane empty">
        <div className="messages-empty-state">
          <i className="ph ph-chat-circle-text ph-3x empty-icon"></i>
          <h5 className="empty-title">Mesajlarınızı Görüntüleyin</h5>
          <p className="empty-description">
            Bir konuşma seçerek mesajlaşmaya başlayın
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-chat-pane">
      {/* Chat Header */}
      <div className="messages-chat-header">
        <div className="d-flex align-items-center gap-12">
          <div className="header-avatar">
            <i className="ph ph-user"></i>
          </div>
          <div className="header-info">
            <h6>{conversationGroup.personName || "İsimsiz"}</h6>
            <p>{conversationGroup.conversations[0]?.senderEmail || ""}</p>
          </div>
        </div>
        <div className="d-flex align-items-center gap-12">
          <i className="ph ph-magnifying-glass"></i>
          <i className="ph ph-dots-three-vertical"></i>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="messages-chat-messages">
        <div className="messages-chat-inner">
          {Object.entries(
            groupMessagesByDate(conversationGroup.conversations)
          ).map(([date, messages]) => (
            <React.Fragment key={date}>
              {/* Date Divider */}
              <div className="messages-date-divider">
                <span className="messages-date-badge">{date}</span>
              </div>

              {/* Messages for this date */}
              {messages.map((message) => {
                const isOutgoing = isOutgoingMessage(message);
                const messageText = message.content || message.subject || "";

                // Skip empty messages
                if (!messageText.trim()) return null;

                return (
                  <div
                    key={message.id}
                    className={`messages-bubble ${
                      isOutgoing ? "outgoing" : "incoming"
                    }`}
                  >
                    <div className="messages-bubble-content">
                      <div
                        className="messages-bubble-text"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {messageText}
                      </div>
                      <div className="messages-bubble-time">
                        {formatTime(message.createdAt)}
                        {isOutgoing && (
                          <i className="ph ph-checks read-check ms-4"></i>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}

          {/* Auto scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Footer */}
      <div className="messages-chat-footer">
        <div className="messages-footer-actions">
          <i className="ph ph-smiley"></i>
          <i className="ph ph-paperclip"></i>
        </div>
        <div className="messages-footer-input">
          <input
            type="text"
            placeholder="Bir mesaj yazın"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="messages-footer-send" onClick={handleSendMessage}>
          <i className="ph ph-paper-plane-tilt"></i>
        </div>
      </div>
    </div>
  );
};

export default MessagePaneWhatsApp;
