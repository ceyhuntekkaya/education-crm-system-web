import { useCallback } from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";

export interface MessageHandlers {
  onMarkAsRead: (message: MessageDto) => void;
  onReply: (message: MessageDto) => void;
}

interface UseMessageHandlersProps {
  setSelectedMessage: (message: MessageDto) => void;
  refreshMessages: () => void;
}

export const useMessageHandlers = ({
  setSelectedMessage,
  refreshMessages,
}: UseMessageHandlersProps): MessageHandlers => {
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

  return {
    onMarkAsRead,
    onReply,
  };
};
