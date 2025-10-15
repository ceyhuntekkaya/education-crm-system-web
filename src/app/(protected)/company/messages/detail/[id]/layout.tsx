"use client";

import React from "react";
import { useParams } from "next/navigation";
import { MessageDetailProvider } from "./_shared";
import { validateMessageId } from "./_shared/utils/message-detail.utils";

interface MessageDetailLayoutProps {
  children: React.ReactNode;
}

const MessageDetailLayout: React.FC<MessageDetailLayoutProps> = ({
  children,
}) => {
  const params = useParams();
  const id = params?.id as string;

  // ID'yi valide et
  const messageId = validateMessageId(id);

  if (!messageId) {
    return (
      <div className="text-center py-8">
        <i className="ph ph-warning-circle text-danger fs-2 mb-3"></i>
        <p className="text-danger mb-0">Geçersiz mesaj ID&apos;si: {id}</p>
      </div>
    );
  }

  return (
    <MessageDetailProvider messageId={messageId}>
      {children}
    </MessageDetailProvider>
  );
};

export default MessageDetailLayout;
