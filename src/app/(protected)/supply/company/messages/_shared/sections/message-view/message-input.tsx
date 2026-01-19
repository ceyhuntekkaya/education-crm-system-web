"use client";

import React, { useState, useRef, useEffect } from "react";
import { useMessages } from "../../context";
import { useMessageForm } from "../../hooks";

/**
 * Message Input Component
 * Input form for sending messages
 */
export const MessageInput: React.FC = () => {
  const { sendMessage, isSendingMessage, selectedConversation } = useMessages();
  const { content, setContent, reset, isValid } = useMessageForm();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid() || isSendingMessage) return;

    const success = await sendMessage(content);
    
    if (success) {
      reset();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!selectedConversation) {
    return null;
  }

  return (
    <div className="messages-page__message-input">
      <form onSubmit={handleSubmit} className="messages-page__message-input-form">
        <div className="messages-page__message-input-container">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Mesajınızı yazın... (Enter ile gönder, Shift+Enter ile yeni satır)"
            className="messages-page__message-textarea"
            rows={1}
            disabled={isSendingMessage}
            maxLength={1000}
          />
          
          <button
            type="submit"
            disabled={isSendingMessage || !isValid()}
            className="messages-page__message-send-button"
            title="Gönder"
          >
            {isSendingMessage ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <i className="ph-fill ph-paper-plane-tilt"></i>
            )}
          </button>
        </div>
        
        <div className="messages-page__message-input-info">
          <small className="text-muted">
            {content.length}/1000 karakter
          </small>
        </div>
      </form>
    </div>
  );
};
