"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { createMessageColumns } from "@/app/(public)/messages/config";
import {
  MessageTableError,
  MessageDetail,
  MessageStatistics,
} from "@/app/(public)/messages/sections";
import { useMessageContext } from "@/contexts";

const Messages: React.FC = () => {
  const {
    messages,
    loading,
    error,
    handlers,
    selectedMessage,
    detailModal,
    setSelectedMessage,
  } = useMessageContext();

  // Kolonları oluştur
  const columns = createMessageColumns(handlers);

  return (
    <div>
      {/* Main Content Section */}
      <section className="messages-section py-60 bg-neutral-10">
        <div className="container">
          {/* Statistics Overview */}
          <MessageStatistics />

          {/* Messages Table */}
          <div>
            {/* Error Display */}
            {error && (
              <div className="p-24 border-bottom border-neutral-30">
                <MessageTableError error={error} />
              </div>
            )}

            <DataGrid
              rows={messages}
              columns={columns}
              loading={loading}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 25, 50]}
              disableRowSelectionOnClick
            />
          </div>
        </div>
      </section>

      {/* Enhanced Message Detail Modal */}
      <MessageDetail
        isOpen={detailModal.isOpen}
        onClose={() => {
          detailModal.close();
          setSelectedMessage(null);
        }}
        message={selectedMessage}
      />
    </div>
  );
};

export default Messages;
