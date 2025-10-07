import { useState, useEffect, useCallback } from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import { mockMessages } from "@/app/(public)/messages/mock";

interface UseMessagesProps {
  status?: string;
  messageType?: string;
  priority?: string;
  limit?: number;
}

interface UseMessagesReturn {
  messages: MessageDto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useMessages = ({
  status,
  messageType,
  priority,
  limit = 50,
}: UseMessagesProps = {}): UseMessagesReturn => {
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Filter mock data based on parameters
      let filteredMessages = mockMessages;

      if (status) {
        filteredMessages = filteredMessages.filter(
          (msg: MessageDto) => msg.status === status
        );
      }

      if (messageType) {
        filteredMessages = filteredMessages.filter(
          (msg: MessageDto) => msg.messageType === messageType
        );
      }

      if (priority) {
        filteredMessages = filteredMessages.filter(
          (msg: MessageDto) => msg.priority === priority
        );
      }

      if (limit) {
        filteredMessages = filteredMessages.slice(0, limit);
      }

      setMessages(filteredMessages);
    } catch (err) {
      setError("Mesajlar yüklenirken bir hata oluştu");
      console.error("Messages fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [status, messageType, priority, limit]);

  const refetch = () => {
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return {
    messages,
    loading,
    error,
    refetch,
  };
};
