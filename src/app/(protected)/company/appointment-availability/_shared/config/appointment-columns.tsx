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

const renderAppointmentNumber = (params: any) => {
  const appointmentNumber = params.row.appointment?.appointmentNumber;
  return (
    <div className="text-center">
      {appointmentNumber || <span className="text-muted">-</span>}
    </div>
  );
};

const renderParentInfo = (params: any) => {
  const { appointment } = params.row;
  if (!appointment) {
    return <span className="text-muted text-center d-block">-</span>;
  }

  const { parentUserName, parentPhone, parentEmail } = appointment;
  return (
    <div>
      <div className="fw-medium">{parentUserName || "-"}</div>
      {parentPhone && <div className="text-muted small">{parentPhone}</div>}
      {parentEmail && (
        <div className="text-muted small text-truncate" title={parentEmail}>
          {parentEmail}
        </div>
      )}
    </div>
  );
};

const renderStudentInfo = (params: any) => {
  const { appointment } = params.row;
  if (!appointment) {
    return <span className="text-muted text-center d-block">-</span>;
  }

  const { studentName, studentAge, gradeInterested } = appointment;
  return (
    <div>
      <div className="fw-medium">{studentName || "-"}</div>
      {studentAge && <div className="text-muted small">Yaş: {studentAge}</div>}
      {gradeInterested && (
        <div className="text-muted small">{gradeInterested}</div>
      )}
    </div>
  );
};

const renderAppointmentStatus = (params: any) => {
  const status = params.row.appointment?.status;
  if (!status) {
    return <span className="text-muted text-center d-block">-</span>;
  }

  const statusMap: Record<string, { label: string; variant: string }> = {
    PENDING: { label: "Beklemede", variant: "warning" },
    CONFIRMED: { label: "Onaylandı", variant: "success" },
    APPROVED: { label: "Onaylandı", variant: "success" },
    REJECTED: { label: "Reddedildi", variant: "danger" },
    CANCELLED: { label: "İptal Edildi", variant: "danger" },
    COMPLETED: { label: "Tamamlandı", variant: "info" },
    NO_SHOW: { label: "Gelmedi", variant: "secondary" },
    RESCHEDULED: { label: "Ertelendi", variant: "primary" },
    IN_PROGRESS: { label: "Devam Ediyor", variant: "primary" },
  };

  const statusInfo = statusMap[status] || {
    label: status,
    variant: "secondary",
  };

  return (
    <div className="text-center">
      <span
        className={`badge bg-${statusInfo.variant}-subtle text-${statusInfo.variant}`}
      >
        {statusInfo.label}
      </span>
    </div>
  );
};

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

  // Determine button states based on appointment status
  const isConfirmed =
    appointmentStatus === "CONFIRMED" || appointmentStatus === "APPROVED";
  const isCancelled =
    appointmentStatus === "CANCELLED" || appointmentStatus === "REJECTED";
  const isCompleted =
    appointmentStatus === "COMPLETED" || appointmentStatus === "NO_SHOW";
  const isPending = appointmentStatus === "PENDING";

  // Disable confirm button if already confirmed, cancelled, or completed
  const canConfirm = !isConfirmed && !isCancelled && !isCompleted;

  // Disable cancel button if already cancelled or completed
  const canCancel = !isCancelled && !isCompleted;

  return (
    <div className="d-flex gap-8 justify-content-center">
      <Button
        variant="success"
        size="xs"
        leftIcon="ph-check-circle"
        onClick={() => config.onConfirm(appointmentId)}
        disabled={!canConfirm || isLoading}
        loading={isConfirmLoading}
      >
        Onayla
      </Button>
      <Button
        variant="error"
        size="xs"
        leftIcon="ph-x-circle"
        onClick={() => config.onCancel(appointmentId)}
        disabled={!canCancel || isLoading}
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
    field: "appointmentNumber",
    headerName: "Randevu No",
    width: 140,
    sortable: true,
    renderCell: renderAppointmentNumber,
  },
  {
    field: "parentInfo",
    headerName: "Veli Bilgileri",
    width: 220,
    sortable: false,
    renderCell: renderParentInfo,
  },
  {
    field: "studentInfo",
    headerName: "Öğrenci Bilgileri",
    width: 200,
    sortable: false,
    renderCell: renderStudentInfo,
  },
  {
    field: "status",
    headerName: "Durum",
    width: 140,
    sortable: true,
    renderCell: renderAppointmentStatus,
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
