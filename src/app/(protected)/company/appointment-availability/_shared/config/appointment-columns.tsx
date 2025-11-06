import { GridColDef } from "@/components/ui/data-grid";
import { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";
import { formatDateTime } from "@/utils";
import { Button } from "@/components/ui";

interface ActionColumnConfig {
  onConfirm: (appointmentId: number) => void;
  onCancel: (appointmentId: number) => void;
  confirmLoading?: number | null; // appointmentId being confirmed
  cancelLoading?: number | null; // appointmentId being cancelled
}

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

/**
 * Render appointment confirmation and cancellation actions
 */
const renderAppointmentStatusActions = (
  params: any,
  config: ActionColumnConfig
) => {
  const { appointment } = params.row;
  const appointmentId = appointment?.id;
  const appointmentStatus = appointment?.status;
  const hasAppointment = !!appointmentId;

  if (!hasAppointment) {
    return (
      <div className="text-center text-muted">
        <small>Henüz randevu yok</small>
      </div>
    );
  }

  // Check if this appointment is being processed
  const isConfirmLoading = config.confirmLoading === appointmentId;
  const isCancelLoading = config.cancelLoading === appointmentId;
  const isLoading = isConfirmLoading || isCancelLoading;

  return (
    <div className="d-flex gap-8 justify-content-center">
      <Button
        variant="success"
        size="xs"
        leftIcon="ph-check-circle"
        onClick={() => config.onConfirm(appointmentId)}
        disabled={isLoading}
        loading={isConfirmLoading}
      >
        Onayla
      </Button>
      <Button
        variant="error"
        size="xs"
        leftIcon="ph-x-circle"
        onClick={() => config.onCancel(appointmentId)}
        disabled={isLoading}
        loading={isCancelLoading}
      >
        İptal Et
      </Button>
    </div>
  );
};

// Main column definitions
export const createAppointmentColumns = (
  config: ActionColumnConfig
): GridColDef<AppointmentSlotDto>[] => [
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
    field: "appointmentStatusActions",
    headerName: "Randevu Durumu",
    width: 300,
    sortable: false,
    renderCell: (params) => renderAppointmentStatusActions(params, config),
  },
  {
    field: "appointmentActions",
    headerName: "Randevu İşlemleri",
    width: 350,
    sortable: false,
    renderCell: renderAppointmentActions,
  },
];

/**
 * @deprecated Use createAppointmentColumns with config parameter instead
 * Create appointment status actions column separately
 */
export const createAppointmentStatusActionsColumn = (
  config: ActionColumnConfig
): GridColDef<AppointmentSlotDto> => ({
  field: "appointmentStatusActions",
  headerName: "Randevu Durumu",
  width: 200,
  sortable: false,
  renderCell: (params) => renderAppointmentStatusActions(params, config),
});
