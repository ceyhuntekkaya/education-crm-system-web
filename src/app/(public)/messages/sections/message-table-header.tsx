import React from "react";
import { Icon } from "@/components/ui/icon";

interface MessageTableHeaderProps {
  totalCount: number;
  onRefresh?: () => void;
  onCreateMessage?: () => void;
}

export const MessageTableHeader: React.FC<MessageTableHeaderProps> = ({
  totalCount,
  onRefresh,
  onCreateMessage,
}) => {
  return (
    <div className="message-table-header d-flex justify-content-between align-items-center mb-20">
      <div className="header-info">
        <h5 className="text-heading mb-4">Mesajlarım</h5>
        <p className="text-neutral-600 fs-14 mb-0">
          Toplam {totalCount} mesaj bulundu
        </p>
      </div>

      <div className="header-actions d-flex align-items-center gap-8">
        {onRefresh && (
          <button
            type="button"
            className="btn btn-outline-secondary d-flex align-items-center gap-8"
            onClick={onRefresh}
            title="Yenile"
          >
            <Icon icon="ph-arrow-clockwise" size="sm" />
            <span className="d-none d-sm-inline">Yenile</span>
          </button>
        )}

        {onCreateMessage && (
          <button
            type="button"
            className="btn btn-primary d-flex align-items-center gap-8"
            onClick={onCreateMessage}
          >
            <Icon icon="ph-plus" size="sm" />
            <span className="d-none d-sm-inline">Yeni Mesaj</span>
          </button>
        )}
      </div>
    </div>
  );
};
