"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { createMessageColumns } from "@/app/(public)/messages/config";
import {
  MessageTableError,
  // MessageDetail,
  MessageInfoModal,
  MessageStatistics,
} from "@/app/(public)/messages/sections";
import { useMessageContext } from "@/contexts";
import { getMessageRowClasses } from "./utils/message-row-utils";

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
  } = useMessageContext();

  // Row styling state - fixed to 'strong'
  const rowStyle = "strong";

  // Kolonları oluştur
  const columns = createMessageColumns(handlers);

  return (
    <div>
      {/* Main Content Section */}
      <section className="messages-section py-40 bg-neutral-10">
        <div className="container">
          {/* Statistics Overview */}
          {/* <MessageStatistics /> */}

          {/* Messages Table */}
          <div className="data-grid-message-container">
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
              onRowClick={(params) => {
                setSelectedMessage(params.row);
                infoModal.open();
              }}
              rowClassName={(row) => {
                return getMessageRowClasses(row, {
                  style: rowStyle,
                  clickable: true,
                });
              }}
            />
          </div>
        </div>
      </section>

      {/* Enhanced Message Detail Modal - Commented Out */}
      {/* <MessageDetail
        isOpen={detailModal.isOpen}
        onClose={() => {
          detailModal.close();
          setSelectedMessage(null);
        }}
        message={selectedMessage}
      /> */}

      {/* Message Info Modal */}
      <MessageInfoModal
        isOpen={infoModal.isOpen}
        onClose={() => {
          infoModal.close();
          setSelectedMessage(null);
        }}
        message={selectedMessage}
      />
    </div>
  );
};

export default Messages;
