import { GridColDef } from "@/components/ui/data-grid";
import { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";
import { formatDate, formatDateTime } from "@/utils";
import { Badge } from "@/components";

// Helper function - Randevu tipi etiketini al
const getAppointmentTypeLabel = (type?: string) => {
  const typeMap: Record<string, string> = {
    INFORMATION_MEETING: "Bilgilendirme",
    SCHOOL_TOUR: "Okul Turu",
    ENROLLMENT_INTERVIEW: "Kayıt Görüşmesi",
    PARENT_MEETING: "Veli Görüşmesi",
    CONSULTATION: "Danışmanlık",
    ASSESSMENT: "Değerlendirme",
    ORIENTATION: "Oryantasyon",
    ONLINE_MEETING: "Online Görüşme",
    PHONE_CALL: "Telefon Görüşmesi",
    GROUP_MEETING: "Grup Görüşmesi",
    OTHER: "Diğer",
  };
  return type ? typeMap[type] || type : "-";
};

// Helper function - Randevu durumu etiketini al
const getAppointmentStatusLabel = (status?: string) => {
  const statusMap: Record<string, string> = {
    PENDING: "Beklemede",
    CONFIRMED: "Onaylandı",
    APPROVED: "Onaylandı",
    REJECTED: "Reddedildi",
    CANCELLED: "İptal Edildi",
    COMPLETED: "Tamamlandı",
    NO_SHOW: "Gelmedi",
    RESCHEDULED: "Ertelendi",
    IN_PROGRESS: "Devam Ediyor",
  };
  return status ? statusMap[status] || status : "-";
};

// Helper function - Durum badge variant'ını al
const getStatusVariant = (
  status?: string
): "success" | "warning" | "danger" | "secondary" | "info" => {
  const variantMap: Record<
    string,
    "success" | "warning" | "danger" | "secondary" | "info"
  > = {
    PENDING: "warning",
    CONFIRMED: "info",
    APPROVED: "success",
    REJECTED: "danger",
    CANCELLED: "secondary",
    COMPLETED: "success",
    NO_SHOW: "danger",
    RESCHEDULED: "warning",
    IN_PROGRESS: "info",
  };
  return variantMap[status || ""] || "secondary";
};

// Column render helper functions
const renderSchoolName = (params: any) => (
  <div className="fw-medium text-truncate" title={params.row.schoolName}>
    {params.row.schoolName || "-"}
  </div>
);

const renderStaffInfo = (params: any) => (
  <div className="text-truncate" title={params.row.staffUserName}>
    {params.row.staffUserName || "-"}
  </div>
);

const renderSlotDate = (params: any) => {
  const { slotDate } = params.row;
  if (!slotDate) {
    return <span className="text-muted text-center d-block">-</span>;
  }

  return (
    <div className="text-center">
      <span className="badge bg-light text-dark border">
        {formatDateTime(slotDate)}
      </span>
    </div>
  );
};

const renderDayOfWeek = (params: any) => (
  <div className="text-center">{params.row.dayOfWeekName || "-"}</div>
);

const renderAppointmentType = (params: any) => (
  <div className="text-truncate">
    {getAppointmentTypeLabel(params.row.appointmentType)}
  </div>
);

const renderDuration = (params: any) => (
  <div className="text-center">
    {params.row.durationMinutes ? `${params.row.durationMinutes} dk` : "-"}
  </div>
);

const renderAvailability = (params: any) => {
  const { isAvailable } = params.row;

  if (isAvailable === undefined || isAvailable === null) {
    return <span className="text-muted text-center d-block">-</span>;
  }

  const variant = isAvailable ? "success" : "danger";
  const label = isAvailable ? "Müsait" : "Dolu";

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Badge variant={variant}>{label}</Badge>
    </div>
  );
};

const renderAppointmentStatus = (params: any) => {
  const { appointment } = params.row;

  if (!appointment || !appointment.status) {
    return <span className="text-muted text-center d-block">-</span>;
  }

  const variant = getStatusVariant(appointment.status);
  const label = getAppointmentStatusLabel(appointment.status);

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Badge variant={variant}>{label}</Badge>
    </div>
  );
};

const renderAppointmentNumber = (params: any) => {
  const { appointment } = params.row;
  return (
    <div className="text-center fw-medium">
      {appointment?.appointmentNumber || "-"}
    </div>
  );
};

const renderParentName = (params: any) => {
  const { appointment } = params.row;
  return (
    <div className="text-truncate" title={appointment?.parentUserName}>
      {appointment?.parentUserName || "-"}
    </div>
  );
};

const renderStudentName = (params: any) => {
  const { appointment } = params.row;
  return (
    <div className="text-truncate" title={appointment?.studentName}>
      {appointment?.studentName || "-"}
    </div>
  );
};

const renderOnlineMeeting = (params: any) => {
  const { onlineMeetingAvailable } = params.row;

  if (onlineMeetingAvailable === undefined || onlineMeetingAvailable === null) {
    return <span className="text-muted text-center d-block">-</span>;
  }

  const variant = onlineMeetingAvailable ? "success" : "secondary";
  const label = onlineMeetingAvailable ? "Mevcut" : "Yok";
  const icon = onlineMeetingAvailable ? "✓" : "✗";

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Badge variant={variant}>
        {icon} {label}
      </Badge>
    </div>
  );
};

const renderActiveStatus = (params: any) => {
  const { isActive } = params.row;

  if (isActive === undefined || isActive === null) {
    return <span className="text-muted text-center d-block">-</span>;
  }

  const variant = isActive ? "success" : "secondary";
  const label = isActive ? "Aktif" : "Pasif";

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Badge variant={variant}>{label}</Badge>
    </div>
  );
};

/**
 * Appointment Slot DataGrid column definitions
 * Yeni API yapısı: AppointmentSlotDto
 */
export const appointmentAvailabilityColumns: GridColDef<AppointmentSlotDto>[] =
  [
    {
      field: "schoolName",
      headerName: "Okul Adı",
      width: 180,
      minWidth: 150,
      sortable: true,
      renderCell: renderSchoolName,
    },
    {
      field: "staffUserName",
      headerName: "Personel",
      width: 150,
      sortable: true,
      renderCell: renderStaffInfo,
    },
    {
      field: "slotDate",
      headerName: "Slot Tarihi",
      width: 180,
      sortable: true,
      renderCell: renderSlotDate,
    },
    {
      field: "dayOfWeekName",
      headerName: "Gün",
      width: 120,
      sortable: true,
      renderCell: renderDayOfWeek,
    },
    {
      field: "appointmentType",
      headerName: "Randevu Tipi",
      width: 160,
      sortable: true,
      renderCell: renderAppointmentType,
    },
    {
      field: "durationMinutes",
      headerName: "Süre",
      width: 100,
      sortable: true,
      renderCell: renderDuration,
    },
    {
      field: "isAvailable",
      headerName: "Müsaitlik",
      width: 120,
      sortable: true,
      renderCell: renderAvailability,
    },
    {
      field: "onlineMeetingAvailable",
      headerName: "Online",
      width: 120,
      sortable: true,
      renderCell: renderOnlineMeeting,
    },
    {
      field: "appointmentNumber",
      headerName: "Randevu No",
      width: 140,
      sortable: true,
      renderCell: renderAppointmentNumber,
    },
    {
      field: "appointmentStatus",
      headerName: "Randevu Durumu",
      width: 150,
      sortable: true,
      renderCell: renderAppointmentStatus,
    },
    {
      field: "parentName",
      headerName: "Veli",
      width: 150,
      sortable: true,
      renderCell: renderParentName,
    },
    {
      field: "studentName",
      headerName: "Öğrenci",
      width: 150,
      sortable: true,
      renderCell: renderStudentName,
    },
    {
      field: "isActive",
      headerName: "Durum",
      width: 100,
      sortable: true,
      renderCell: renderActiveStatus,
    },
  ];

/**
 * Legacy appointment columns (deprecated - use appointmentAvailabilityColumns instead)
 */
export const appointmentColumns = appointmentAvailabilityColumns;
