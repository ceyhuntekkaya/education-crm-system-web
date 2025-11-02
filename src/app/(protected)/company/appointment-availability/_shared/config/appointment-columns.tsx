import { GridColDef } from "@/components/ui/data-grid";
import { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";
import { formatDate, formatSlotTime } from "@/utils";
import { Badge } from "@/components";
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

const renderDuration = (params: any) => (
  <div className="text-center">
    {params.row.durationMinutes ? `${params.row.durationMinutes} dk` : "-"}
  </div>
);

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

const renderLocation = (params: any) => {
  const { location, onlineMeetingAvailable } = params.row;

  if (onlineMeetingAvailable) {
    return (
      <div className="d-flex align-items-center gap-4">
        <i className="ph ph-video-camera text-info text-sm" />
        <span className="text-sm">Online</span>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center gap-4">
      <i className="ph ph-map-pin text-muted text-sm" />
      <span className="text-sm text-truncate" title={location}>
        {location || "Fiziksel Konum"}
      </span>
    </div>
  );
};

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

const renderValidPeriod = (params: any) => {
  const { validFrom, validUntil } = params.row;

  if (!validFrom && !validUntil) {
    return <span className="text-muted text-center d-block">-</span>;
  }

  return (
    <div className="text-center text-sm">
      {validFrom && <div>{formatDate(validFrom)}</div>}
      {validFrom && validUntil && <div className="text-muted">-</div>}
      {validUntil && <div>{formatDate(validUntil)}</div>}
    </div>
  );
};

const renderBookingRules = (params: any) => {
  const { advanceBookingHours, maxAdvanceBookingDays, cancellationHours } =
    params.row;

  if (!advanceBookingHours && !maxAdvanceBookingDays && !cancellationHours) {
    return <span className="text-muted text-center d-block">-</span>;
  }

  return (
    <div className="text-start text-sm">
      {advanceBookingHours && <div>Min: {advanceBookingHours}sa önce</div>}
      {maxAdvanceBookingDays && <div>Max: {maxAdvanceBookingDays} gün</div>}
      {cancellationHours && (
        <div className="text-danger">İptal: {cancellationHours}sa</div>
      )}
    </div>
  );
};

const renderFlags = (params: any) => {
  const { isRecurring, requiresApproval, preparationRequired, isActive } =
    params.row;

  return (
    <div className="d-flex gap-4 justify-content-center">
      {isRecurring && (
        <i
          className="ph-fill ph-arrow-clockwise text-info"
          title="Tekrarlayan"
          style={{ fontSize: "16px" }}
        />
      )}
      {requiresApproval && (
        <i
          className="ph-fill ph-check-circle text-warning"
          title="Onay Gerekli"
          style={{ fontSize: "16px" }}
        />
      )}
      {preparationRequired && (
        <i
          className="ph-fill ph-note text-primary"
          title="Hazırlık Gerekli"
          style={{ fontSize: "16px" }}
        />
      )}
      {isActive === false && (
        <i
          className="ph-fill ph-x-circle text-danger"
          title="Pasif"
          style={{ fontSize: "16px" }}
        />
      )}
    </div>
  );
};

const renderNextAvailableDates = (params: any) => {
  const { nextAvailableDates } = params.row;

  if (!nextAvailableDates || nextAvailableDates.length === 0) {
    return <span className="text-muted text-center d-block">-</span>;
  }

  return (
    <div className="text-start text-sm">
      {nextAvailableDates.slice(0, 3).map((date: string, idx: number) => (
        <div key={idx} className="text-muted">
          {formatDate(date)}
        </div>
      ))}
      {nextAvailableDates.length > 3 && (
        <div className="text-muted">+{nextAvailableDates.length - 3} daha</div>
      )}
    </div>
  );
};

// Action buttons render function
const renderActionButtons = (params: any) => {
  const { id, isAvailable } = params.row;

  return (
    <div className="d-flex align-items-center gap-8">
      <Button
        variant="inline"
        size="xs"
        leftIcon="ph-eye"
        href={`/company/appointment-availability/detail/${id}`}
        aria-label="Detay Görüntüle"
      >
        Detay
      </Button>
      {isAvailable && (
        <Button
          variant="success"
          size="xs"
          leftIcon="ph-calendar-plus"
          href={`/company/appointment-availability/book/${id}`}
          aria-label="Randevu Al"
        >
          Randevu Al
        </Button>
      )}
    </div>
  );
};

// Main column definitions
export const createAppointmentColumns =
  (): GridColDef<AppointmentSlotDto>[] => [
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
      field: "durationMinutes",
      headerName: "Süre",
      width: 100,
      sortable: true,
      renderCell: renderDuration,
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
      field: "location",
      headerName: "Konum",
      width: 150,
      sortable: false,
      renderCell: renderLocation,
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
    {
      field: "validPeriod",
      headerName: "Geçerlilik",
      width: 130,
      sortable: false,
      renderCell: renderValidPeriod,
    },
    {
      field: "bookingRules",
      headerName: "Rezervasyon Kuralları",
      width: 180,
      sortable: false,
      renderCell: renderBookingRules,
    },
    {
      field: "flags",
      headerName: "Özellikler",
      width: 120,
      sortable: false,
      renderCell: renderFlags,
    },
    {
      field: "nextAvailableDates",
      headerName: "Sonraki Tarihler",
      width: 150,
      sortable: false,
      renderCell: renderNextAvailableDates,
    },
    {
      field: "actions",
      headerName: "İşlemler",
      width: 220,
      sortable: false,
      renderCell: renderActionButtons,
    },
  ];
