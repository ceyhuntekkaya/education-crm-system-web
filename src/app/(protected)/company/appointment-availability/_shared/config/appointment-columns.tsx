import { GridColDef } from "@/components/ui/data-grid";
import { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";
import { formatDateTime } from "@/utils";
import { Button } from "@/components/ui";

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

// Render Functions
const renderStaffInfo = (params: any) => (
  <div className="text-truncate" title={params.row.staffUserName}>
    {params.row.staffUserName || "-"}
  </div>
);

const renderSlotDate = (params: any) => {
  const { slotDate, dayOfWeekName, durationMinutes } = params.row;
  if (!slotDate) {
    return <span className="text-muted text-center d-block">-</span>;
  }

  const dayLabel = getDayOfWeekLabel(dayOfWeekName);
  const duration = durationMinutes ? `${durationMinutes} dk` : "";

  return (
    <div className="text-center">
      <div>{formatDateTime(slotDate)}</div>
      <div className="text-muted">
        {dayLabel} {duration && `- ${duration}`}
      </div>
    </div>
  );
};

const renderAppointmentType = (params: any) => (
  <div className="text-truncate">
    <span className="badge bg-primary-subtle text-primary">
      {getAppointmentTypeLabel(params.row.appointmentType)}
    </span>
  </div>
);

const renderAppointmentActions = (params: any) => {
  const { appointment } = params.row;
  const appointmentId = appointment?.id;
  const hasAppointment = !!appointmentId;

  if (!hasAppointment) {
    return (
      <div className="text-center text-muted">
        <small>Henüz bu slot&apos;a ait bir randevu oluşturulmadı</small>
      </div>
    );
  }

  return (
    <div className="d-flex gap-8 justify-content-center">
      <Button
        variant="outline"
        size="xs"
        leftIcon="ph-eye"
        href={`/company/appointment-availability/detail/${appointmentId}`}
      >
        Detay
      </Button>
      <Button
        variant="success"
        size="xs"
        leftIcon="ph-chats-circle"
        href={`/company/appointment-availability/detail/${appointmentId}/meeting`}
      >
        Görüşmeyi Başlat
      </Button>
    </div>
  );
};

// Main column definitions
export const createAppointmentColumns =
  (): GridColDef<AppointmentSlotDto>[] => [
    {
      field: "slotDate",
      headerName: "Tarih & Saat",
      width: 200,
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
      field: "appointmentActions",
      headerName: "Randevu İşlemleri",
      width: 250,
      sortable: false,
      renderCell: renderAppointmentActions,
    },
  ];
