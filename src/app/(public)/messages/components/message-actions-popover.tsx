import React from "react";
import { Icon } from "@/components/ui/icon";
import { Popover } from "@/components/ui/popover";
import { MessageDto } from "@/types/dto/content/MessageDto";

interface MessageActionsPopoverProps {
  message: MessageDto;
  onViewDetails: (message: MessageDto) => void;
  onMarkAsRead: (message: MessageDto) => void;
  onReply: (message: MessageDto) => void;
  onForward?: (message: MessageDto) => void;
  onDelete?: (message: MessageDto) => void;
}

export const MessageActionsPopover: React.FC<MessageActionsPopoverProps> = ({
  message,
  onViewDetails,
  onMarkAsRead,
  onReply,
  onForward,
  onDelete,
}) => {
  const actions = [
    {
      key: "details",
      label: "Detayları Görüntüle",
      icon: "ph-eye",
      onClick: () => onViewDetails(message),
      className: "text-primary",
    },
    {
      key: "markAsRead",
      label: !message.readAt
        ? "Okundu Olarak İşaretle"
        : "Okunmadı Olarak İşaretle",
      icon: !message.readAt ? "ph-envelope-open" : "ph-envelope",
      onClick: () => onMarkAsRead(message),
      className: "text-info",
    },
    {
      key: "reply",
      label: "Yanıtla",
      icon: "ph-arrow-u-up-left",
      onClick: () => onReply(message),
      className: "text-success",
    },
  ];

  if (onForward) {
    actions.push({
      key: "forward",
      label: "İlet",
      icon: "ph-arrow-right",
      onClick: () => onForward(message),
      className: "text-warning",
    });
  }

  if (onDelete) {
    actions.push({
      key: "delete",
      label: "Sil",
      icon: "ph-trash",
      onClick: () => onDelete(message),
      className: "text-danger",
    });
  }

  const handleAction = (actionFn: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    actionFn();
  };

  return (
    <div className="w-50 d-flex align-items-center justify-content-center">
      <Popover
        content={
          <div className="dropdown-menu-container">
            <div
              className="dropdown-menu-item"
              onClick={handleAction(() => onViewDetails(message))}
            >
              <Icon icon="ph-eye" size="sm" className="text-primary" />
              <span className="text-sm">Detayları Görüntüle</span>
            </div>

            <div
              className="dropdown-menu-item"
              onClick={handleAction(() => onMarkAsRead(message))}
            >
              <Icon
                icon={!message.readAt ? "ph-envelope-open" : "ph-envelope"}
                size="sm"
                className="text-info"
              />
              <span className="text-sm">
                {!message.readAt
                  ? "Okundu Olarak İşaretle"
                  : "Okunmadı Olarak İşaretle"}
              </span>
            </div>

            <div
              className="dropdown-menu-item"
              onClick={handleAction(() => onReply(message))}
            >
              <Icon
                icon="ph-arrow-u-up-left"
                size="sm"
                className="text-success"
              />
              <span className="text-sm">Yanıtla</span>
            </div>

            {onForward && (
              <div
                className="dropdown-menu-item"
                onClick={handleAction(() => onForward(message))}
              >
                <Icon
                  icon="ph-arrow-right"
                  size="sm"
                  className="text-warning"
                />
                <span className="text-sm">İlet</span>
              </div>
            )}

            {onDelete && (
              <>
                <hr className="dropdown-divider" />
                <div
                  className="dropdown-menu-item"
                  onClick={handleAction(() => onDelete(message))}
                >
                  <Icon icon="ph-trash" size="sm" className="text-danger" />
                  <span className="text-sm">Sil</span>
                </div>
              </>
            )}
          </div>
        }
        trigger="click"
        placement="bottom-end"
      >
        <div className="action-button-wrapper">
          <Icon icon="ph-dots-three-vertical" size="sm" />
        </div>
      </Popover>
    </div>
  );
};
