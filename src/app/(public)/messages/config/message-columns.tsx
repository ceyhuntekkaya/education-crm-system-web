import { GridColDef } from "@/components/ui/data-grid";
import { MessageDto } from "@/types/dto/content/MessageDto";
import { formatDateTime } from "@/app/(public)/messages/utils";

export interface MessageColumnHandlers {
  onViewDetails: (message: MessageDto) => void;
  onMarkAsRead: (message: MessageDto) => void;
  onReply: (message: MessageDto) => void;
  onForward?: (message: MessageDto) => void;
  onDelete?: (message: MessageDto) => void;
}

export const createMessageColumns = (
  handlers: MessageColumnHandlers
): GridColDef<MessageDto>[] => [
  {
    field: "school",
    headerName: "Okul",
    width: 200,
    renderCell: (params) => {
      const schoolName = params.row.school?.name || "";

      if (!schoolName) {
        return <div className="text-muted">Bilinmeyen Okul</div>;
      }

      return (
        <div
          className="text-neutral-700 school-name message-school-text"
          title={schoolName}
        >
          {schoolName}
        </div>
      );
    },
  },

  {
    field: "subject",
    headerName: "Konu",
    width: 230,
    renderCell: (params) => {
      const subject = params.value || "";

      if (!subject) {
        return <div className="text-muted">-</div>;
      }

      return (
        <div
          className="text-neutral-700 subject-text message-subject-text"
          title={subject}
        >
          {subject}
        </div>
      );
    },
  },
  {
    field: "content",
    headerName: "İçerik",
    width: 250,
    renderCell: (params) => {
      const content = params.value || "";

      if (!content) {
        return <div className="text-muted">-</div>;
      }

      return (
        <div
          className="text-neutral-700 subject-text message-content-text"
          title={content}
        >
          {content}
        </div>
      );
    },
  },
  {
    field: "readAt",
    headerName: "Durum",
    width: 100,
    sortable: true,
    renderCell: (params) => {
      const isRead = !!params.row.readAt;

      return (
        <div className="d-flex align-items-center justify-content-center h-100">
          {isRead ? (
            <span className="message-read-badge">Okundu</span>
          ) : (
            <span className="message-unread-badge">Yeni</span>
          )}
        </div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Tarih",
    width: 160,
    renderCell: (params) => {
      if (!params.value) return <div className="text-muted">-</div>;

      // Import here to avoid circular dependency
      const getMessageAge = (message: any): string => {
        if (!message.createdAt) return "";

        const created = new Date(message.createdAt);
        const now = new Date();
        const diffMs = now.getTime() - created.getTime();

        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMinutes < 60) {
          return `${diffMinutes}dk önce`;
        } else if (diffHours < 24) {
          return `${diffHours}sa önce`;
        } else if (diffDays < 7) {
          return `${diffDays}g önce`;
        } else {
          return created.toLocaleDateString("tr-TR");
        }
      };

      const isMessageFresh = (message: any): boolean => {
        if (!message.createdAt) return false;

        const created = new Date(message.createdAt);
        const now = new Date();
        const diffMs = now.getTime() - created.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        return diffHours <= 1;
      };

      const messageAge = getMessageAge(params.row);
      const isFresh = isMessageFresh(params.row);
      const fullDate = formatDateTime(params.value);

      return (
        <div className="text-neutral-700 message-date-column">
          <div className="fw-medium message-date-main">{fullDate}</div>
          <div className="text-muted small d-flex align-items-center gap-1 message-date-relative">
            {isFresh && <span className="message-fresh-indicator">✨</span>}
          </div>
        </div>
      );
    },
  },
];
