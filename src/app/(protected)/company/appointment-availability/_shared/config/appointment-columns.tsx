import { GridColDef } from "@/components/ui/data-grid";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { formatDate } from "@/utils";
import {
  getStatusBadgeVariant,
  getStatusDisplay,
  getAppointmentTypeDisplay,
  formatAppointmentTime,
  getOutcomeDisplay,
} from "../utils";
import { Badge } from "@/components";

// Column render helper functions
const renderAppointmentTitle = (params: any) => (
  <div className="text-truncate" title={params.row.title}>
    {params.row.title || "-"}
  </div>
);

const renderAppointmentNumber = (params: any) => (
  <div className="text-truncate" title={params.row.appointmentNumber}>
    {params.row.appointmentNumber || "-"}
  </div>
);

const renderParentInfo = (params: any) => (
  <div className="text-truncate" title={params.row.parentName}>
    {params.row.parentName || "-"}
  </div>
);

const renderStudentInfo = (params: any) => (
  <div className="text-truncate" title={params.row.studentName}>
    {params.row.studentName || "-"}
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
      {getStatusDisplay(params.row.status)}
    </Badge>
  </div>
);

const renderAppointmentDate = (params: any) => (
  <div className="text-truncate">{params.row.formattedDate || "-"}</div>
);

const renderAppointmentTime = (params: any) => (
  <div className="text-truncate">{params.row.formattedTime || "-"}</div>
);

const renderLocation = (params: any) => (
  <div className="d-flex align-items-center gap-4">
    {params.row.isOnline === true ? (
      <>
        <i className="ph ph-video-camera text-info text-sm" />
        <span className="text-sm">Online</span>
      </>
    ) : params.row.isOnline === false ? (
      <>
        <i className="ph ph-map-pin text-muted text-sm" />
        <span className="text-sm text-truncate" title={params.row.location}>
          {params.row.location || "Fiziksel Konum"}
        </span>
      </>
    ) : (
      <>
        <i className="ph ph-question text-muted text-sm" />
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
      <div className="fw-medium">{getOutcomeDisplay(params.row.outcome)}</div>
    ) : (
      <div className="text-muted">-</div>
    )}
  </div>
);

const renderEnrollmentLikelihood = (params: any) => (
  <div className="text-center">
    {params.row.enrollmentLikelihood ? (
      <div className="text-info">%{params.row.enrollmentLikelihood}</div>
    ) : (
      <div className="text-muted">-</div>
    )}
  </div>
);

const renderFollowUpRequired = (params: any) => (
  <div className="d-flex justify-content-center">
    {params.row.followUpRequired === true ? (
      <i
        className="ph-fill ph-bell text-warning"
        style={{ fontSize: "16px" }}
      />
    ) : params.row.followUpRequired === false ? (
      <i className="ph ph-x text-muted" style={{ fontSize: "16px" }} />
    ) : (
      <span className="text-muted">-</span>
    )}
  </div>
);

const renderFollowUpDate = (params: any) => (
  <div className="text-center">
    {params.row.followUpDate ? (
      <small className="text-muted">
        {formatDate(params.row.followUpDate)}
      </small>
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

// Main column definitions
export const createAppointmentColumns = (): GridColDef<AppointmentDto>[] => [
  // Basic Information Columns
  {
    field: "title",
    headerName: "Randevu Başlığı",
    width: 200,
    renderCell: renderAppointmentTitle,
  },
  {
    field: "appointmentNumber",
    headerName: "Randevu No",
    width: 150,
    renderCell: renderAppointmentNumber,
  },
  {
    field: "parentName",
    headerName: "Veli",
    width: 150,
    renderCell: renderParentInfo,
  },
  {
    field: "studentName",
    headerName: "Öğrenci",
    width: 150,
    renderCell: renderStudentInfo,
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
    headerName: "Tarih",
    width: 150,
    renderCell: renderAppointmentDate,
  },
  {
    field: "appointmentTime",
    headerName: "Saat",
    width: 130,
    renderCell: renderAppointmentTime,
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
    width: 200,
    renderCell: renderStaffInfo,
  },
  {
    field: "outcome",
    headerName: "Sonuç",
    width: 120,
    renderCell: renderOutcome,
  },
  {
    field: "enrollmentLikelihood",
    headerName: "Olasılık",
    width: 130,
    renderCell: renderEnrollmentLikelihood,
  },

  // Follow-up Columns
  {
    field: "followUpRequired",
    headerName: "Takip Gerekli",
    width: 180,
    renderCell: renderFollowUpRequired,
  },
  {
    field: "followUpDate",
    headerName: "Takip Tarihi",
    width: 160,
    renderCell: renderFollowUpDate,
  },
  {
    field: "appointmentNotes",
    headerName: "Notlar",
    width: 120,
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
