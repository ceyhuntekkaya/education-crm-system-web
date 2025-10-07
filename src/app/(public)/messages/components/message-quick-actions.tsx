import React from "react";
import { Icon } from "@/components/ui/icon";
import { MessageDto } from "@/types/dto/content/MessageDto";

interface MessageQuickActionsProps {
  message: MessageDto;
  onViewDetails: (message: MessageDto) => void;
  onMarkAsRead: (message: MessageDto) => void;
}

export const MessageQuickActions: React.FC<MessageQuickActionsProps> = ({
  message,
  onViewDetails,
  onMarkAsRead,
}) => {
  return (
    <div className="d-flex align-items-center gap-4">
      {/* Detay Butonu */}
      <button
        type="button"
        className="btn btn-sm btn-outline-primary d-flex align-items-center gap-6 px-12 py-6"
        onClick={() => onViewDetails(message)}
        title="Detayları Görüntüle"
      >
        <Icon icon="ph-eye" size="sm" />
        <span className="fs-13 fw-medium">Detay</span>
      </button>

      {/* Okundu/Okunmadı Quick Toggle */}
      {!message.readAt && (
        <button
          type="button"
          className="btn btn-sm btn-ghost text-info d-flex align-items-center justify-content-center p-6"
          onClick={() => onMarkAsRead(message)}
          title="Okundu Olarak İşaretle"
        >
          <Icon icon="ph-envelope-open" size="sm" />
        </button>
      )}
    </div>
  );
};
