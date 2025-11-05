import { GridColDef } from "@/components/ui/data-grid";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { Avatar } from "../components/avatar";
import { Badge } from "../components/badge";
import {
  formatDateTime,
  formatTime,
  getStatusBadgeVariant,
  getStatusDisplay,
  getOutcomeBadgeVariant,
  getParticipantTypeBadgeVariant,
  getAppointmentTypeDisplay,
} from "../utils";

export const createAppointmentColumns = (): GridColDef<AppointmentDto>[] => [
  {
    field: "schoolName",
    headerName: "Okul",
    width: 300,
    renderCell: (params) => (
      <div className="overflow-hidden">
        <div className="fw-medium text-truncate">
          {params.row.schoolName || "-"}
        </div>
        {params.row.campusName && (
          <small className="text-muted text-truncate d-block">
            {params.row.campusName}
          </small>
        )}
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
    field: "status",
    headerName: "Durum",
    width: 150,
    renderCell: (params) => (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Badge variant={getStatusBadgeVariant(params.value)}>
          {getStatusDisplay(params.value)}
        </Badge>
      </div>
    ),
  },

  {
    field: "studentInfo",
    headerName: "Öğrenci Bilgileri",
    width: 280,
    renderCell: (params) => (
      <div className="d-flex align-items-center">
        <div className="overflow-hidden">
          <div className="fw-medium text-truncate">
            {params.row.studentName || "-"}
          </div>
          <small className="text-muted text-truncate d-block">
            {params.row.gradeInterested ? `${params.row.gradeInterested}` : ""}
            {params.row.studentAge ? ` • ${params.row.studentAge} yaş` : ""}
          </small>
        </div>
      </div>
    ),
  },
  {
    field: "parentInfo",
    headerName: "Veli Bilgileri",
    width: 250,
    renderCell: (params) => (
      <div className="d-flex align-items-center">
        <div className="overflow-hidden">
          <div className="fw-medium text-truncate">
            {params.row.parentName || params.row.parentUserName || "-"}
          </div>
          <small className="text-muted text-truncate d-block">
            {params.row.parentPhone || params.row.parentEmail || "-"}
          </small>
        </div>
      </div>
    ),
  },
  {
    field: "staff",
    headerName: "Personel",
    width: 200,
    renderCell: (params) => (
      <div className="d-flex align-items-center overflow-hidden">
        <span className="text-truncate">
          {params.row.staffUserName || "Atanmadı"}
        </span>
      </div>
    ),
  },
  {
    field: "appointmentNumber",
    headerName: "Randevu No",
    width: 160,
    renderCell: (params) => (
      <div className="fw-medium">{params.value || "-"}</div>
    ),
  },
];
