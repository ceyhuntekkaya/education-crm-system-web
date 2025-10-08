import { GridColDef } from "@/components/ui/data-grid";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { formatDate } from "@/utils";
import {
  getStatusBadgeVariant,
  getAppointmentTypeDisplay,
  formatAppointmentTime,
  getOutcomeDisplay,
} from "../utils";
import { AppointmentColumnHandlers } from "../types";
import { AppointmentActionButtons } from "../components/appointment-action-buttons";
import { Badge } from "@/components";

// Column render helper functions
const renderAppointmentInfo = (params: any) => (
  <div className="d-flex align-items-center">
    <div className="overflow-hidden">
      <div className="fw-medium text-truncate" title={params.row.title}>
        {params.row.title || "-"}
      </div>
      {params.row.appointmentNumber && (
        <small
          className="text-muted text-truncate d-block"
          title={params.row.appointmentNumber}
        >
          {params.row.appointmentNumber}
        </small>
      )}
    </div>
  </div>
);

const renderSchoolInfo = (params: any) => (
  <div>
    <div className="fw-medium text-truncate" title={params.row.schoolName}>
      {params.row.schoolName || "-"}
    </div>
    {params.row.campusName && (
      <small
        className="text-muted d-block text-truncate"
        title={params.row.campusName}
      >
        {params.row.campusName}
      </small>
    )}
  </div>
);

const renderParentInfo = (params: any) => (
  <div>
    <div className="fw-medium text-truncate" title={params.row.parentName}>
      {params.row.parentName || "-"}
    </div>
    {params.row.studentName && (
      <small
        className="text-muted d-block text-truncate"
        title={params.row.studentName}
      >
        Öğrenci: {params.row.studentName}
      </small>
    )}
  </div>
);

const renderAppointmentType = (params: any) => (
  <div className="text-truncate">
    {getAppointmentTypeDisplay(params.row.appointmentType)}
  </div>
);

const renderAppointmentStatus = (params: any) => (
  <div className="d-flex justify-content-center align-items-center h-100">
    <Badge variant={getStatusBadgeVariant(params.row.status)}>
      {params.row.statusDisplayName || params.row.status}
    </Badge>
  </div>
);

const renderAppointmentDateTime = (params: any) => (
  <div>
    <div className="fw-medium">{params.row.formattedDate || "-"}</div>
    {params.row.formattedTime && (
      <small className="text-muted d-block">{params.row.formattedTime}</small>
    )}
  </div>
);

const renderLocation = (params: any) => (
  <div className="d-flex align-items-center gap-1">
    {params.row.isOnline ? (
      <>
        <i className="ph ph-video-camera text-info text-sm" />
        <span className="text-sm">Online</span>
      </>
    ) : (
      <>
        <i className="ph ph-map-pin text-muted text-sm" />
        <span className="text-sm text-truncate" title={params.row.location}>
          {params.row.location || "Belirtilmemiş"}
        </span>
      </>
    )}
  </div>
);

const renderStaffInfo = (params: any) => (
  <div className="text-truncate" title={params.row.staffUserName}>
    {params.row.staffUserName || "-"}
  </div>
);

const renderOutcome = (params: any) => (
  <div className="text-center">
    {params.row.outcome ? (
      <>
        <div className="fw-medium">{getOutcomeDisplay(params.row.outcome)}</div>
        {params.row.enrollmentLikelihood && (
          <small className="text-info d-block">
            %{params.row.enrollmentLikelihood} olasılık
          </small>
        )}
      </>
    ) : (
      <div className="text-muted">-</div>
    )}
  </div>
);

const renderFollowUp = (params: any) => (
  <div className="d-flex justify-content-center">
    {params.row.followUpRequired ? (
      <div className="text-center">
        <i
          className="ph-fill ph-bell text-warning"
          style={{ fontSize: "16px" }}
        />
        {params.row.followUpDate && (
          <small className="text-muted d-block">
            {formatDate(params.row.followUpDate)}
          </small>
        )}
      </div>
    ) : (
      <span className="text-muted">-</span>
    )}
  </div>
);

const renderNotes = (params: any) => (
  <div className="d-flex justify-content-center">
    {params.row.appointmentNotes && params.row.appointmentNotes.length > 0 ? (
      <div className="text-center">
        <i className="ph-fill ph-note text-info" style={{ fontSize: "16px" }} />
        <small className="text-muted d-block">
          {params.row.appointmentNotes.length} not
        </small>
      </div>
    ) : (
      <span className="text-muted">-</span>
    )}
  </div>
);

const renderActionButtons = (
  params: any,
  handlers: AppointmentColumnHandlers
) => (
  <AppointmentActionButtons
    appointment={params.row}
    onViewDetails={handlers.onViewDetails}
    onEdit={handlers.onEdit}
    onComplete={handlers.onComplete}
    onCancel={handlers.onCancel}
    onReschedule={handlers.onReschedule}
    onAddNote={handlers.onAddNote}
  />
);

// Main column definitions
export const createAppointmentColumns = (
  handlers: AppointmentColumnHandlers
): GridColDef<AppointmentDto>[] => [
  // Basic Information Columns
  {
    field: "title",
    headerName: "Randevu Bilgileri",
    width: 250,
    renderCell: renderAppointmentInfo,
  },
  {
    field: "schoolName",
    headerName: "Okul",
    width: 200,
    renderCell: renderSchoolInfo,
  },
  {
    field: "parentName",
    headerName: "Veli/Öğrenci",
    width: 180,
    renderCell: renderParentInfo,
  },
  {
    field: "appointmentType",
    headerName: "Tür",
    width: 160,
    renderCell: renderAppointmentType,
  },
  {
    field: "status",
    headerName: "Durum",
    width: 120,
    renderCell: renderAppointmentStatus,
  },

  // Date & Time Columns
  {
    field: "appointmentDate",
    headerName: "Tarih & Saat",
    width: 160,
    renderCell: renderAppointmentDateTime,
  },
  {
    field: "location",
    headerName: "Konum",
    width: 200,
    renderCell: renderLocation,
  },

  // Staff & Outcome Columns
  {
    field: "staffUserName",
    headerName: "Personel",
    width: 150,
    renderCell: renderStaffInfo,
  },
  {
    field: "outcome",
    headerName: "Sonuç",
    width: 120,
    renderCell: renderOutcome,
  },

  // Additional Info & Actions
  {
    field: "followUpRequired",
    headerName: "Takip",
    width: 120,
    renderCell: renderFollowUp,
  },
  {
    field: "appointmentNotes",
    headerName: "Notlar",
    width: 100,
    renderCell: renderNotes,
  },
  //   {
  //     field: "actions",
  //     headerName: "",
  //     width: 70,
  //     sortable: false,
  //     renderCell: (params) => renderActionButtons(params, handlers),
  //   },
];
