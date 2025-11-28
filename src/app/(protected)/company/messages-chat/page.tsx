"use client";

import React from "react";
import { useMessageContext } from "./context";
import { ConversationList, MessagePane, MessageStatsCards } from "./sections";
import CustomCard from "@/components/ui/custom-card";
import { usePageTitle } from "@/hooks";

const Messages: React.FC = () => {
  usePageTitle("Mesaj Sohbeti");
  const { loading, error, customStats } = useMessageContext();

  return (
    <div>
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
