import { GridColDef } from "@/components/ui/data-grid";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { Avatar } from "../components/avatar";
import { Badge } from "../components/badge";
import { ActionButtons } from "../components/action-buttons";
import {
  formatDateTime,
  formatTime,
  getStatusBadgeVariant,
  getOutcomeBadgeVariant,
  getParticipantTypeBadgeVariant,
} from "../utils";

export interface ColumnHandlers {
  onViewDetails: (appointment: AppointmentDto) => void;
  onEdit: (appointment: AppointmentDto) => void;
  onCancel: (appointment: AppointmentDto) => void;
  onComplete?: (appointment: AppointmentDto) => void;
  onReschedule?: (appointment: AppointmentDto) => void;
}

export const createAppointmentColumns = (
  handlers: ColumnHandlers
): GridColDef<AppointmentDto>[] => [
  {
    field: "appointmentNumber",
    headerName: "Randevu No",
    width: 130,
    renderCell: (params) => (
      <div className="fw-medium">{params.value || "-"}</div>
    ),
  },
  {
    field: "student",
    headerName: "Öğrenci/Veli",
    width: 200,
    renderCell: (params) => (
      <div className="d-flex align-items-center">
        <Avatar
          src={undefined}
          alt={params.row.parentName || params.row.parentUserName}
          className="me-2"
          size="sm"
        />
        <div className="overflow-hidden">
          <div className="fw-medium text-truncate">
            {params.row.studentName || "-"}
          </div>
          <small className="text-muted text-truncate d-block">
            {params.row.parentName || params.row.parentUserName || "-"}
          </small>
        </div>
      </div>
    ),
  },
  {
    field: "appointmentDate",
    headerName: "Tarih & Saat",
    width: 140,
    renderCell: (params) => (
      <div>
        <div className="fw-medium">
          {params.row.formattedDate || formatDateTime(params.value)}
        </div>
        <small className="text-muted">
          {params.row.formattedTime ||
            `${params.row.startTime} - ${params.row.endTime}`}
        </small>
      </div>
    ),
  },
  {
    field: "staff",
    headerName: "Personel",
    width: 160,
    renderCell: (params) => (
      <div className="d-flex align-items-center overflow-hidden">
        <Avatar
          src={undefined}
          alt={params.row.staffUserName}
          className="me-2 flex-shrink-0"
          size="sm"
        />
        <span className="text-truncate">{params.row.staffUserName || "-"}</span>
      </div>
    ),
  },
  {
    field: "appointmentType",
    headerName: "Tür",
    width: 120,
    renderCell: (params) => (
      <div className="text-truncate">
        {params.value === "INFORMATION_MEETING" && "Bilgi Toplantısı"}
        {params.value === "SCHOOL_TOUR" && "Okul Gezisi"}
        {params.value === "ENROLLMENT_INTERVIEW" && "Kayıt Görüşmesi"}
        {params.value === "PARENT_MEETING" && "Veli Görüşmesi"}
        {params.value === "CONSULTATION" && "Danışmanlık"}
        {params.value === "ASSESSMENT" && "Değerlendirme"}
        {params.value === "ORIENTATION" && "Oryantasyon"}
        {params.value === "ONLINE_MEETING" && "Online Görüşme"}
        {params.value === "PHONE_CALL" && "Telefon Görüşmesi"}
        {params.value === "GROUP_MEETING" && "Grup Toplantısı"}
        {params.value === "OTHER" && "Diğer"}
        {!params.value && "-"}
      </div>
    ),
  },
  {
    field: "location",
    headerName: "Konum",
    width: 120,
    renderCell: (params) => (
      <div className="d-flex align-items-center">
        {params.row.isOnline ? (
          <>
            <Badge variant="info" className="me-1">
              Online
            </Badge>
            <span className="text-truncate small">
              {params.value === "Online" ? "Online" : params.value || "-"}
            </span>
          </>
        ) : (
          <span className="text-truncate">{params.value || "-"}</span>
        )}
      </div>
    ),
  },
  {
    field: "status",
    headerName: "Durum",
    width: 110,
    renderCell: (params) => (
      <Badge variant={getStatusBadgeVariant(params.value)}>
        {params.row.statusDisplayName || params.value || "-"}
      </Badge>
    ),
  },
  {
    field: "outcome",
    headerName: "Sonuç",
    width: 120,
    renderCell: (params) => {
      if (!params.value) return <span className="text-muted">-</span>;
      return (
        <Badge variant={getOutcomeBadgeVariant(params.value)}>
          {params.row.outcomeDisplayName || params.value}
        </Badge>
      );
    },
  },
  {
    field: "enrollmentLikelihood",
    headerName: "Kayıt İhtimali",
    width: 120,
    renderCell: (params) => {
      if (!params.value) return <span className="text-muted">-</span>;
      let variant: "success" | "warning" | "danger" | "info" = "info";
      if (params.value >= 80) variant = "success";
      else if (params.value >= 60) variant = "info";
      else if (params.value >= 40) variant = "warning";
      else variant = "danger";

      return <Badge variant={variant}>%{params.value}</Badge>;
    },
  },
  {
    field: "participantCount",
    headerName: "Katılımcılar",
    width: 100,
    renderCell: (params) => {
      const count = params.row.participants?.length || 0;
      return (
        <div className="d-flex align-items-center">
          <Badge variant="secondary" className="me-1">
            {count}
          </Badge>
          <small className="text-muted">kişi</small>
        </div>
      );
    },
  },
  {
    field: "noteCount",
    headerName: "Notlar",
    width: 80,
    renderCell: (params) => {
      const count = params.row.appointmentNotes?.length || 0;
      return count > 0 ? (
        <Badge variant="info">{count}</Badge>
      ) : (
        <span className="text-muted">-</span>
      );
    },
  },
  {
    field: "followUpRequired",
    headerName: "Takip",
    width: 80,
    renderCell: (params) =>
      params.value ? (
        <Badge variant="warning">Gerekli</Badge>
      ) : (
        <span className="text-muted">-</span>
      ),
  },
  {
    field: "actions",
    headerName: "İşlemler",
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <ActionButtons
        appointment={params.row}
        onViewDetails={handlers.onViewDetails}
        onEdit={handlers.onEdit}
        onCancel={handlers.onCancel}
        onComplete={handlers.onComplete}
        onReschedule={handlers.onReschedule}
      />
    ),
  },
];
