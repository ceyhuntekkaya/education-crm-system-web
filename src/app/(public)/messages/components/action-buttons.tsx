import React from "react";
import { Icon } from "@/components/ui/icon";
import { MessageDto } from "@/types/dto/content/MessageDto";

interface MessageActionButtonsProps {
  message: MessageDto;
  onViewDetails: (message: MessageDto) => void;
  onMarkAsRead: (message: MessageDto) => void;
  onReply: (message: MessageDto) => void;
  onForward?: (message: MessageDto) => void;
  onDelete?: (message: MessageDto) => void;
}

export const ActionButtons: React.FC<MessageActionButtonsProps> = ({
  message,
  onViewDetails,
  onMarkAsRead,
  onReply,
  onForward,
  onDelete,
}) => {
  return (
    <div className="d-flex align-items-center gap-8">
      {/* View Details Button */}
      <button
        type="button"
        className="btn btn-sm btn-outline-primary d-flex align-items-center gap-4"
        onClick={() => onViewDetails(message)}
        title="Detayları Görüntüle"
      >
        <Icon icon="ph-eye" size="sm" />
        <span className="d-none d-md-inline">Detay</span>
      </button>

      {/* Mark as Read/Unread Button */}
      {!message.readAt && (
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-4"
          onClick={() => onMarkAsRead(message)}
          title="Okundu Olarak İşaretle"
        >
          <Icon icon="ph-envelope-open" size="sm" />
          <span className="d-none d-lg-inline">Okundu</span>
        </button>
      )}

      {/* Reply Button */}
      <button
        type="button"
        className="btn btn-sm btn-outline-info d-flex align-items-center gap-4"
        onClick={() => onReply(message)}
        title="Yanıtla"
      >
        <Icon icon="ph-arrow-u-up-left" size="sm" />
        <span className="d-none d-lg-inline">Yanıtla</span>
      </button>

      {/* Forward Button */}
      {onForward && (
        <button
          type="button"
          className="btn btn-sm btn-outline-warning d-flex align-items-center gap-4"
          onClick={() => onForward(message)}
          title="İlet"
        >
          <Icon icon="ph-arrow-right" size="sm" />
          <span className="d-none d-lg-inline">İlet</span>
        </button>
      )}

      {/* Delete Button (Optional) */}
      {onDelete && (
        <button
          type="button"
          className="btn btn-sm btn-outline-danger d-flex align-items-center gap-4"
          onClick={() => onDelete(message)}
          title="Sil"
        >
          <Icon icon="ph-trash" size="sm" />
          <span className="d-none d-lg-inline">Sil</span>
        </button>
      )}
    </div>
  );
};
