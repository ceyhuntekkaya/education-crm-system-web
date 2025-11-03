import { useCallback } from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import { MessageColumnHandlers } from "@/app/(public)/messages/config";

interface UseMessageHandlersProps {
  setSelectedMessage: (message: MessageDto) => void;
  detailModal: {
    open: () => void;
    close: () => void;
    isOpen: boolean;
  };
  refreshMessages: () => void;
}

export const useMessageHandlers = ({
  setSelectedMessage,
  detailModal,
  refreshMessages,
}: UseMessageHandlersProps): MessageColumnHandlers => {
  const onViewDetails = useCallback(
    (message: MessageDto) => {
      console.log("View message details:", message);
      // setSelectedMessage otomatik olarak mesajı okundu işaretleyecek
      setSelectedMessage(message);
      detailModal.open();
    },
    [setSelectedMessage, detailModal]
  );

  const onMarkAsRead = useCallback(
    async (message: MessageDto) => {
      console.log("Mark as read:", message);
      // setSelectedMessage otomatik olarak mesajı okundu işaretleyecek
      setSelectedMessage(message);
    },
    [setSelectedMessage]
  );

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
