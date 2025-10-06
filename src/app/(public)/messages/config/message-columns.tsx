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
  {
    field: "referenceNumber",
    headerName: "Referans No",
    width: 160,
    renderCell: (params) => (
      <div className="fw-medium">{params.value || "-"}</div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Tarih",
    width: 140,
    renderCell: (params) => (
      <div className="text-neutral-700">
        {params.value ? formatDateTime(params.value) : "-"}
      </div>
    ),
  },
  {
    field: "school",
    headerName: "Okul",
    width: 180,
    sortable: false,
    renderCell: (params) => {
      const schoolName = params.row.school?.name || "";
      const truncatedSchoolName =
        schoolName.length > 20
          ? schoolName.substring(0, 20) + "..."
          : schoolName;

      if (!schoolName) {
        return <div className="text-muted">Bilinmeyen Okul</div>;
      }

      return (
        <Popover
          content={
            <div className="p-8" style={{ maxWidth: "300px" }}>
              <div className="fw-medium text-heading mb-6">Okul Bilgisi</div>
              <div className="text-neutral-700 lh-lg">{schoolName}</div>
            </div>
          }
          trigger="hover"
          placement="bottom"
        >
          <div
            className="text-truncate text-neutral-700"
            style={{ cursor: "pointer", maxWidth: "160px" }}
            title="Tüm okul adını görmek için üzerine gelin"
          >
            {truncatedSchoolName}
          </div>
        </Popover>
      );
    },
  },
  {
    field: "subject",
    headerName: "Konu",
    width: 200,
    sortable: false,
    renderCell: (params) => {
      const subject = params.value || "";
      const truncatedSubject =
        subject.length > 40 ? subject.substring(0, 40) + "..." : subject;

      if (!subject) {
        return <div className="text-muted">-</div>;
      }

      return (
        <Popover
          content={
            <div className="p-8" style={{ maxWidth: "350px" }}>
              <div className="fw-medium text-heading mb-6">Mesaj Konusu</div>
              <div className="text-neutral-700 lh-lg">{subject}</div>
            </div>
          }
          trigger="hover"
          placement="bottom"
        >
          <div
            className="text-truncate text-neutral-700"
            style={{ maxWidth: "160px", cursor: "pointer" }}
            // title="Tüm konuyu görmek için üzerine gelin"
          >
            {truncatedSubject}
          </div>
        </Popover>
      );
    },
  },
  {
    field: "content",
    headerName: "İçerik",
    width: 200,
    sortable: false,
    renderCell: (params) => {
      const content = params.value || "";
      const truncatedContent =
        content.length > 50 ? content.substring(0, 50) + "..." : content;

      if (!content) {
        return <div className="text-muted">-</div>;
      }

      return (
        <Popover
          content={
            <div className="p-8" style={{ maxWidth: "400px" }}>
              <div className="fw-medium text-heading mb-6">Mesaj İçeriği</div>
              <div
                className="text-neutral-700 lh-lg"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {content}
              </div>
            </div>
          }
          trigger="hover"
          placement="bottom"
        >
          <div
            className="text-truncate text-neutral-700"
            style={{ maxWidth: "180px", cursor: "pointer" }}
            // title="Tüm içeriği görmek için üzerine gelin"
          >
            {truncatedContent}
          </div>
        </Popover>
      );
    },
  },
  {
    field: "messageType",
    headerName: "Tür",
    width: 175,
    renderCell: (params) => (
      <div
        className="text-truncate"
        title={getMessageTypeDisplay(params.value)}
      >
        {getMessageTypeDisplay(params.value)}
      </div>
    ),
  },
  {
    field: "priority",
    headerName: "Öncelik",
    width: 120,
    renderCell: (params) => (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Badge variant={getPriorityBadgeVariant(params.value)}>
          {getPriorityDisplay(params.value)}
        </Badge>
      </div>
    ),
  },
  {
    field: "status",
    headerName: "Durum",
    width: 110,
    renderCell: (params) => (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Badge variant={getStatusBadgeVariant(params.value)}>
          {getStatusDisplay(params.value)}
        </Badge>
      </div>
    ),
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
  {
    field: "actions",
    headerName: "İşlemler",
    width: 80,
    sortable: false,
    renderCell: (params) => (
      <div className="d-flex justify-content-center">
        <MessageActionsPopover
          message={params.row}
          onViewDetails={handlers.onViewDetails}
          onMarkAsRead={handlers.onMarkAsRead}
          onReply={handlers.onReply}
          onForward={handlers.onForward}
          onDelete={handlers.onDelete}
        />
      </div>
    ),
  },
];
