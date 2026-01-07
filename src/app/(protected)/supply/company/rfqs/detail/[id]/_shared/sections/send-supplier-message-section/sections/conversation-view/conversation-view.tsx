"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { initialValues, validationSchema } from "./schemas";
import { ConversationViewContent } from "./sections";

interface ConversationViewProps {
  conversationId: number | null;
}

/**
 * Conversation view wrapper component
 * FormProvider ile sarmalanmış content component
 */
export const ConversationView: React.FC<ConversationViewProps> = ({
  conversationId,
}) => {
  return (
    <div className="conversation-view">
      <FormProvider
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <ConversationViewContent conversationId={conversationId} />
      </FormProvider>
    </div>
  );
};
