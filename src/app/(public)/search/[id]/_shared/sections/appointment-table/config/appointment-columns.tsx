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
  getAppointmentTypeDisplay,
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
    width: 160,
    renderCell: (params) => (
      <div className="fw-medium">{params.value || "-"}</div>
    ),
  },
  {
    field: "status",
    headerName: "Durum",
    width: 150,
    renderCell: (params) => (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Badge variant={getStatusBadgeVariant(params.value)}>
          {params.row.statusDisplayName || params.value || "-"}
        </Badge>
      </div>
    ),
  },
  {
    field: "appointmentDate",
    headerName: "Tarih & Saat",
    width: 180,
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
    field: "student",
    headerName: "Öğrenci/Veli",
    width: 250,
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
    field: "staff",
    headerName: "Personel",
    width: 230,
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
    width: 170,
    renderCell: (params) => (
      <div className="text-truncate">
        {getAppointmentTypeDisplay(params.value)}
      </div>
    ),
  },

  {
    field: "actions",
    headerName: "İşlemler",
    width: 180,
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
