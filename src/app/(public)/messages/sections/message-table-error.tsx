import React from "react";
import { Icon } from "@/components/ui/icon";

interface MessageTableErrorProps {
  error: string;
  onRetry?: () => void;
}

export const MessageTableError: React.FC<MessageTableErrorProps> = ({
  error,
  onRetry,
}) => {
  return (
    <div className="message-table-error text-center py-40">
      <div className="mb-16">
        <Icon icon="ph-warning-circle" size="lg" className="text-danger-500" />
      </div>
      <h5 className="text-danger-600 mb-8">Hata Oluştu</h5>
      <p className="text-neutral-600 mb-16">{error}</p>
      {onRetry && (
        <button
          type="button"
          className="btn btn-outline-primary d-flex align-items-center gap-8 mx-auto"
          onClick={onRetry}
        >
          <Icon icon="ph-arrow-clockwise" size="sm" />
          Tekrar Dene
        </button>
      )}
    </div>
  );
};
