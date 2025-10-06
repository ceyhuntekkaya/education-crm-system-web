import { useCallback } from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import { MessageColumnHandlers } from "@/app/(public)/messages/config";

interface UseMessageHandlersProps {
  setSelectedMessage: (message: MessageDto | null) => void;
  detailModal: {
    open: () => void;
    close: () => void;
    isOpen: boolean;
  };
}

export const useMessageHandlers = ({
  setSelectedMessage,
  detailModal,
}: UseMessageHandlersProps): MessageColumnHandlers => {
  const onViewDetails = useCallback(
    (message: MessageDto) => {
      console.log("View message details:", message);
      setSelectedMessage(message);
      detailModal.open();
    },
    [setSelectedMessage, detailModal]
  );

  const onMarkAsRead = useCallback((message: MessageDto) => {
    console.log("Mark as read:", message);
    // TODO: API call to mark message as read
    // updateMessageStatus(message.id, { readAt: new Date() });
  }, []);

  const onReply = useCallback((message: MessageDto) => {
    console.log("Reply to message:", message);
    // TODO: Open reply modal or navigate to reply page
  }, []);

  const onForward = useCallback((message: MessageDto) => {
    console.log("Forward message:", message);
    // TODO: Open forward modal
  }, []);

  const onDelete = useCallback((message: MessageDto) => {
    console.log("Delete message:", message);
    // TODO: Show confirmation dialog and delete message
    // if (confirm("Bu mesajı silmek istediğinize emin misiniz?")) {
    //   deleteMessage(message.id);
    // }
  }, []);

  return {
    onViewDetails,
    onMarkAsRead,
    onReply,
    onForward,
    onDelete,
  };
};
