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
      setSelectedMessage(message);
      detailModal.open();
    },
    [setSelectedMessage, detailModal]
  );

  const onMarkAsRead = useCallback(
    async (message: MessageDto) => {
      console.log("Mark as read:", message);

      // Eğer mesaj zaten okunmuşsa işlem yapma
      if (message.readAt) {
        return;
      }

      try {
        // TODO: API call to mark message as read
        // await updateMessageStatus(message.id, {
        //   status: 'READ',
        //   readAt: new Date().toISOString()
        // });

        // Şimdilik console log ile simüle edelim
        console.log(
          `Message ${message.id} marked as read at ${new Date().toISOString()}`
        );

        // Mesajın readAt özelliğini güncelle (yerel state için)
        if (message.id) {
          message.readAt = new Date().toISOString();
          message.status = "READ";
        }

        // Tabloyu yenile
        // refreshMessages();
      } catch (error) {
        console.error("Error marking message as read:", error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refreshMessages]
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
