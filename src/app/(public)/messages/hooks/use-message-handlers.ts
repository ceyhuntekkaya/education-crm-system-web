import { useCallback } from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";

export interface MessageHandlers {
  onViewDetails: (message: MessageDto) => void;
  onMarkAsRead: (message: MessageDto) => void;
  onReply: (message: MessageDto) => void;
  onForward?: (message: MessageDto) => void;
  onDelete?: (message: MessageDto) => void;
}

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
}: UseMessageHandlersProps): MessageHandlers => {
  const onViewDetails = useCallback(
    (message: MessageDto) => {
      console.log("View message details:", message);
      setSelectedMessage(message);
      detailModal.open();
    },
    [setSelectedMessage, detailModal]
  );

  const onMarkAsRead = useCallback(
    async (message: MessageDto) => {
      console.log("Mark as read:", message);
      setSelectedMessage(message);
    },
    [setSelectedMessage]
  );

  const onReply = useCallback((message: MessageDto) => {
    console.log("Reply to message:", message);
  }, []);

  const onForward = useCallback((message: MessageDto) => {
    console.log("Forward message:", message);
  }, []);

  const onDelete = useCallback((message: MessageDto) => {
    console.log("Delete message:", message);
  }, []);

  return {
    onViewDetails,
    onMarkAsRead,
    onReply,
    onForward,
    onDelete,
  };
};
