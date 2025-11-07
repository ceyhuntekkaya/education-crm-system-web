"use client";

import React from "react";
import { useMessageContext } from "./context";
import { ConversationList, MessagePane, MessageStatsCards } from "./sections";
import CustomCard from "@/components/ui/custom-card";

const Messages: React.FC = () => {
  const { loading, error, customStats } = useMessageContext();

  return (
    <div className="container py-40">
      <MessageStatsCards stats={customStats} />

      <CustomCard
        title="Mesajlarım"
        isLoading={loading}
        isError={error !== null}
        errorMessage={error || undefined}
      >
        <div className="messages-container">
          <ConversationList />
          <MessagePane />
        </div>
      </CustomCard>
    </div>
  );
};

export default Messages;
