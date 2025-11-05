import { GridColDef } from "@/components/ui/data-grid";
import { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";
import { formatDateTime } from "@/utils";

/**
 * Helper Functions
 */

// Randevu tipi etiketini al
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

// Gün ismi etiketini al
const getDayOfWeekLabel = (day?: string) => {
  const dayMap: Record<string, string> = {
    Monday: "Pazartesi",
    Tuesday: "Salı",
    Wednesday: "Çarşamba",
    Thursday: "Perşembe",
    Friday: "Cuma",
    Saturday: "Cumartesi",
    Sunday: "Pazar",
  };
  return day ? dayMap[day] || day : "-";
};

/**
 * Render Functions
 */

const renderStaffInfo = (params: any) => (
  <div className="text-truncate" title={params.row.staffUserName}>
    {params.row.staffUserName || "-"}
  </div>
);

const renderSlotDate = (params: any) => {
  const { slotDate, dayOfWeekName } = params.row;
  if (!slotDate) {
    return <span className="text-muted text-center d-block">-</span>;
  }

  const dayLabel = getDayOfWeekLabel(dayOfWeekName);

  return (
    <div className="text-center">
      <div className="d-flex flex-column gap-1">
        <span className="badge bg-light text-dark border">
          {formatDateTime(slotDate)}
        </span>
        <span className="badge bg-light text-dark border">{dayLabel}</span>
      </div>
    </div>
  );
};

const renderAppointmentType = (params: any) => {
  const typeLabel = getAppointmentTypeLabel(params.row.appointmentType);
  return (
    <div className="text-truncate">
      <span className="badge bg-primary-subtle text-primary">{typeLabel}</span>
    </div>
  );
};

const renderDuration = (params: any) => (
  <div className="text-center">
    {params.row.durationMinutes ? `${params.row.durationMinutes} dk` : "-"}
  </div>
);

/**
 * Appointment Slot DataGrid column definitions
 * Backend API yanıtına göre optimize edilmiş sütunlar
 */
export const appointmentAvailabilityColumns: GridColDef<AppointmentSlotDto>[] =
  [
    {
      field: "slotDate",
      headerName: "Tarih & Saat",
      width: 180,
      sortable: true,
      renderCell: renderSlotDate,
    },
    {
      field: "staffUserName",
      headerName: "Personel",
      width: 160,
      sortable: true,
      renderCell: renderStaffInfo,
    },
    {
      field: "appointmentType",
      headerName: "Randevu Tipi",
      width: 180,
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
  ];

/**
 * Legacy appointment columns (deprecated - use appointmentAvailabilityColumns instead)
 */
export const appointmentColumns = appointmentAvailabilityColumns;
