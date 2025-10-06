import { GridColDef } from "@/components/ui/data-grid";
import { MessageDto } from "@/types/dto/content/MessageDto";
import { Popover } from "@/components/ui/popover";
import {
  Avatar,
  Badge,
  MessageActionsPopover,
  MessageQuickActions,
} from "@/app/(public)/messages/components";
import {
  formatDateTime,
  getStatusBadgeVariant,
  getStatusDisplay,
  getPriorityBadgeVariant,
  getPriorityDisplay,
  getMessageTypeDisplay,
} from "@/app/(public)/messages/utils";

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
  // {
  //   field: "referenceNumber",
  //   headerName: "Referans No",
  //   width: 160,
  //   renderCell: (params) => (
  //     <div className="fw-medium">{params.value || "-"}</div>
  //   ),
  // },
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
  // {
  //   field: "messageType",
  //   headerName: "Mesaj Türü",
  //   width: 175,
  //   renderCell: (params) => (
  //     <div
  //       className="text-truncate"
  //       title={getMessageTypeDisplay(params.value)}
  //     >
  //       {getMessageTypeDisplay(params.value)}
  //     </div>
  //   ),
  // },
  // {
  //   field: "priority",
  //   headerName: "Öncelik",
  //   width: 120,
  //   renderCell: (params) => (
  //     <div className="d-flex justify-content-center align-items-center h-100">
  //       <Badge variant={getPriorityBadgeVariant(params.value)}>
  //         {getPriorityDisplay(params.value)}
  //       </Badge>
  //     </div>
  //   ),
  // },
  // {
  //   field: "status",
  //   headerName: "Mesaj Durumu",
  //   width: 175,
  //   renderCell: (params) => (
  //     <div className="d-flex justify-content-center align-items-center h-100">
  //       <Badge variant={getStatusBadgeVariant(params.value)}>
  //         {getStatusDisplay(params.value)}
  //       </Badge>
  //     </div>
  //   ),
  // },
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
  //   {
  //     field: "quickActions",
  //     headerName: "Detay",
  //     width: 140,
  //     sortable: false,
  //     renderCell: (params) => (
  //       <MessageQuickActions
  //         message={params.row}
  //         onViewDetails={handlers.onViewDetails}
  //         onMarkAsRead={handlers.onMarkAsRead}
  //       />
  //     ),
  //   },
  // {
  //   field: "actions",
  //   headerName: "İşlemler",
  //   width: 120,
  //   sortable: false,
  //   renderCell: (params) => (
  //     <div className="d-flex justify-content-center">
  //       <MessageActionsPopover
  //         message={params.row}
  //         onViewDetails={handlers.onViewDetails}
  //         onMarkAsRead={handlers.onMarkAsRead}
  //         onReply={handlers.onReply}
  //         onForward={handlers.onForward}
  //         onDelete={handlers.onDelete}
  //       />
  //     </div>
  //   ),
  // },
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
            {/* <span>{messageAge}</span> */}
            {isFresh && <span className="message-fresh-indicator">✨</span>}
          </div>
        </div>
      );
    },
  },
];
