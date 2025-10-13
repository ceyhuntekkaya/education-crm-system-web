import { GridColDef } from "@/components/ui/data-grid";
import { MessageDto } from "@/types/dto/content/MessageDto";
import { formatDate, formatDateTime } from "@/utils";
import {
  getMessageStatusDisplay,
  getMessagePriorityDisplay,
  getMessageTypeDisplay,
  getMessageStatusBadgeVariant,
  getMessagePriorityBadgeVariant,
  getMessageTypeBadgeVariant,
  getTimeAgo,
  formatResponseTime,
} from "../utils/messages-utils";
import { Badge, Popover } from "@/components";

// Main column definitions
export const createMessagesColumns = (): GridColDef<MessageDto>[] => [
  // Basic Information Columns
  {
    field: "referenceNumber",
    headerName: "Referans No",
    width: 170,
    renderCell: (params: any) => (
      <div
        className="fw-semibold text-primary"
        title={params.row.referenceNumber}
      >
        {params.row.referenceNumber || "-"}
      </div>
    ),
  },
  {
    field: "subject",
    headerName: "Konu",
    width: 300,
    renderCell: (params: any) => (
      <div className="fw-semibold text-truncate" title={params.row.subject}>
        {params.row.subject || "-"}
      </div>
    ),
  },
  {
    field: "school",
    headerName: "Okul",
    width: 300,
    renderCell: (params: any) => (
      <div className="text-truncate" title={params.row.school?.name}>
        {params.row.school?.name || "-"}
      </div>
    ),
  },
  {
    field: "senderName",
    headerName: "Gönderen Adı",
    width: 200,
    renderCell: (params: any) => (
      <div className="fw-medium text-truncate" title={params.row.senderName}>
        {params.row.senderName || "-"}
      </div>
    ),
  },
  {
    field: "senderEmail",
    headerName: "Gönderen Email",
    width: 300,
    renderCell: (params: any) => (
      <div className="text-truncate" title={params.row.senderEmail}>
        {params.row.senderEmail || "-"}
      </div>
    ),
  },

  {
    field: "messageType",
    headerName: "Tür",
    width: 140,
    renderCell: (params: any) => (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Badge variant={getMessageTypeBadgeVariant(params.row.messageType)}>
          {getMessageTypeDisplay(params.row.messageType)}
        </Badge>
      </div>
    ),
  },
  {
    field: "priority",
    headerName: "Öncelik",
    width: 120,
    align: "center",
    renderCell: (params: any) => (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Badge variant={getMessagePriorityBadgeVariant(params.row.priority)}>
          {getMessagePriorityDisplay(params.row.priority)}
        </Badge>
      </div>
    ),
  },
  {
    field: "status",
    headerName: "Durum",
    width: 140,
    align: "center",
    renderCell: (params: any) => (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Badge variant={getMessageStatusBadgeVariant(params.row.status)}>
          {getMessageStatusDisplay(params.row.status)}
        </Badge>
      </div>
    ),
  },

  // Contact Information
  {
    field: "senderPhone",
    headerName: "Telefon",
    width: 180,
    renderCell: (params: any) => (
      <div className="text-truncate" title={params.row.senderPhone}>
        {params.row.senderPhone || "-"}
      </div>
    ),
  },

  // Student Information
  {
    field: "studentName",
    headerName: "Öğrenci Adı",
    width: 200,
    renderCell: (params: any) => (
      <div className="fw-medium text-truncate" title={params.row.studentName}>
        {params.row.studentName || "-"}
      </div>
    ),
  },
  {
    field: "studentAge",
    headerName: "Yaş",
    width: 100,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        {params.row.studentAge ? (
          <span className="fw-medium">{params.row.studentAge}</span>
        ) : (
          <span className="text-muted">-</span>
        )}
      </div>
    ),
  },
  {
    field: "gradeInterested",
    headerName: "Sınıf",
    width: 110,
    renderCell: (params: any) => (
      <div className="text-truncate" title={params.row.gradeInterested}>
        {params.row.gradeInterested || "-"}
      </div>
    ),
  },

  // Response Information
  {
    field: "assignedToUser",
    headerName: "Atanan Kişi",
    width: 160,
    renderCell: (params: any) => (
      <div
        className="text-truncate"
        title={params.row.assignedToUser?.fullName}
      >
        {params.row.assignedToUser?.fullName || "-"}
      </div>
    ),
  },
  {
    field: "responseTime",
    headerName: "Yanıt Süresi",
    width: 160,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        {params.row.responseTimeHours ? (
          <span className="fw-semibold text-info">
            {formatResponseTime(params.row.responseTimeHours)}
          </span>
        ) : (
          <span className="text-muted">-</span>
        )}
      </div>
    ),
  },

  // Flags and Indicators
  {
    field: "flags",
    headerName: "Bildirimler",
    width: 150,
    renderCell: (params: any) => (
      <div className="d-flex justify-content-center gap-4">
        {params.row.requestCallback && (
          <Popover
            content="Geri arama talep edildi"
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="cursor-pointer">
              <i
                className="ph ph-phone text-warning"
                style={{ fontSize: "14px" }}
              />
            </div>
          </Popover>
        )}
        {params.row.requestAppointment && (
          <Popover
            content="Randevu talep edildi"
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="cursor-pointer">
              <i
                className="ph ph-calendar text-info"
                style={{ fontSize: "14px" }}
              />
            </div>
          </Popover>
        )}
        {params.row.followUpRequired && (
          <Popover
            content="Takip gerekli"
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="cursor-pointer">
              <i
                className="ph ph-clock text-danger"
                style={{ fontSize: "14px" }}
              />
            </div>
          </Popover>
        )}
        {params.row.hasAttachments && (
          <Popover
            content="Eklenti mevcut"
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="cursor-pointer">
              <i
                className="ph ph-paperclip text-success"
                style={{ fontSize: "14px" }}
              />
            </div>
          </Popover>
        )}
        {params.row.satisfactionRating && (
          <Popover
            content={`Memnuniyet: ${params.row.satisfactionRating}/5`}
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="cursor-pointer">
              <i
                className="ph-fill ph-star text-warning"
                style={{ fontSize: "14px" }}
              />
            </div>
          </Popover>
        )}
        {!params.row.requestCallback &&
          !params.row.requestAppointment &&
          !params.row.followUpRequired &&
          !params.row.hasAttachments &&
          !params.row.satisfactionRating && (
            <span className="text-muted">-</span>
          )}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Oluşturulma Tarihi",
    width: 230,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        {params.row.createdAt ? (
          <div className="fw-semibold" style={{ fontSize: "0.85rem" }}>
            {formatDateTime(params.row.createdAt)}
          </div>
        ) : (
          <span className="text-muted">-</span>
        )}
      </div>
    ),
  },
  {
    field: "timeAgo",
    headerName: "Geçen Süre",
    width: 160,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        {params.row.createdAt ? (
          <small className="text-muted" style={{ fontSize: "0.75rem" }}>
            {getTimeAgo(params.row.createdAt)}
          </small>
        ) : (
          <span className="text-muted">-</span>
        )}
      </div>
    ),
  },
  //   {
  //     field: "actions",
  //     headerName: "",
  //     width: 120,
  //     sortable: false,
  //     renderCell: (params: any) => (
  //       <MessagesActionButtons
  //         message={params.row}
  //         onViewDetails={handlers.onViewDetails}
  //         onEdit={handlers.onEdit}
  //         onToggleStatus={handlers.onToggleStatus}
  //         onDelete={handlers.onDelete}
  //         onReply={handlers.onReply}
  //         onForward={handlers.onForward}
  //         onMarkAsRead={handlers.onMarkAsRead}
  //         onMarkAsResolved={handlers.onMarkAsResolved}
  //         onAssign={handlers.onAssign}
  //       />
  //     ),
  //   },
];
