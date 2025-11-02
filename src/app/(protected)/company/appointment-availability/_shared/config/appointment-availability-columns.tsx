import { GridColDef } from "@/components/ui/data-grid";
import { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";
import { formatDate, formatSlotTime } from "@/utils";
import { Badge } from "@/components";

// Helper function - Gün adını Türkçe'ye çevir
const getDayOfWeekLabel = (day?: string) => {
  const dayMap: Record<string, string> = {
    MONDAY: "Pazartesi",
    TUESDAY: "Salı",
    WEDNESDAY: "Çarşamba",
    THURSDAY: "Perşembe",
    FRIDAY: "Cuma",
    SATURDAY: "Cumartesi",
    SUNDAY: "Pazar",
  };
  return day ? dayMap[day] || day : "-";
};

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

const renderDayOfWeek = (params: any) => (
  <div className="text-center">
    {params.row.dayOfWeekName || getDayOfWeekLabel(params.row.dayOfWeek)}
  </div>
);

const renderTimeSlot = (params: any) => {
  const { startTime, endTime, timeRange } = params.row;

  // Eğer timeRange varsa onu kullan
  if (timeRange) {
    return (
      <div className="text-center">
        <span className="badge bg-light text-dark border">{timeRange}</span>
      </div>
    );
  }

  if (!startTime || !endTime) {
    return <span className="text-muted text-center d-block">-</span>;
  }

  return (
    <div className="text-center">
      <span className="badge bg-light text-dark border">
        {formatSlotTime(startTime, endTime)}
      </span>
    </div>
  );
};

const renderAppointmentType = (params: any) => (
  <div className="text-truncate">
    {getAppointmentTypeLabel(params.row.appointmentType)}
  </div>
);

const renderTitle = (params: any) => (
  <div className="text-truncate" title={params.row.title}>
    {params.row.title || "-"}
  </div>
);

const renderAvailability = (params: any) => {
  const { isAvailable, availableCapacity, capacity } = params.row;

  if (isAvailable === undefined || isAvailable === null) {
    return <span className="text-muted text-center d-block">-</span>;
  }

  const variant = isAvailable ? "success" : "danger";
  const label = isAvailable ? "Müsait" : "Dolu";

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Badge variant={variant}>
        {label}
        {availableCapacity !== undefined && capacity !== undefined && (
          <span className="ms-1">
            ({availableCapacity}/{capacity})
          </span>
        )}
      </Badge>
    </div>
  );
};

const renderCapacity = (params: any) => (
  <div className="text-center fw-medium text-primary">
    {params.row.capacity || 0}
  </div>
);

const renderAvailableCapacity = (params: any) => (
  <div className="text-center fw-medium text-success">
    {params.row.availableCapacity !== undefined
      ? params.row.availableCapacity
      : "-"}
  </div>
);

const renderBookedCount = (params: any) => (
  <div className="text-center fw-medium text-warning">
    {params.row.bookedCount || 0}
  </div>
);

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
      field: "dayOfWeek",
      headerName: "Gün",
      width: 120,
      sortable: true,
      renderCell: renderDayOfWeek,
    },
    {
      field: "timeSlot",
      headerName: "Saat Aralığı",
      width: 140,
      sortable: false,
      renderCell: renderTimeSlot,
    },
    {
      field: "appointmentType",
      headerName: "Randevu Tipi",
      width: 160,
      sortable: true,
      renderCell: renderAppointmentType,
    },
    {
      field: "title",
      headerName: "Başlık",
      width: 180,
      sortable: true,
      renderCell: renderTitle,
    },
    {
      field: "isAvailable",
      headerName: "Müsaitlik",
      width: 140,
      sortable: true,
      renderCell: renderAvailability,
    },
    {
      field: "capacity",
      headerName: "Kapasite",
      width: 100,
      sortable: true,
      renderCell: renderCapacity,
    },
    {
      field: "bookedCount",
      headerName: "Dolu",
      width: 90,
      sortable: true,
      renderCell: renderBookedCount,
    },
    {
      field: "availableCapacity",
      headerName: "Müsait",
      width: 90,
      sortable: true,
      renderCell: renderAvailableCapacity,
    },
  ];

/**
 * Legacy appointment columns (deprecated - use appointmentAvailabilityColumns instead)
 */
export const appointmentColumns = appointmentAvailabilityColumns;
