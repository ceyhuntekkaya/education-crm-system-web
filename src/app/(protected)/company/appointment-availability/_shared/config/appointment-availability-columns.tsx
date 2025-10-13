import { GridColDef } from "@/components/ui/data-grid";
import { AppointmentAvailabilityDto } from "@/types/dto/appointment/AppointmentAvailabilityDto";
import {
  formatDate,
  AVAILABILITY_STATUS_LABELS,
  AVAILABILITY_VARIANTS,
  calculateAvailabilityStatus,
  getAvailabilityPercentage,
  formatSlotTime,
  getBookingRatioText,
  getApiAvailabilityDisplay,
} from "@/utils";
import { Badge } from "@/components";

// Column render helper functions
const renderSchoolName = (params: any) => (
  <div className="fw-medium text-truncate" title={params.row.schoolName}>
    {params.row.schoolName || "-"}
  </div>
);

const renderSchoolId = (params: any) => (
  <div className="text-center">{params.row.schoolId || "-"}</div>
);

const renderDate = (params: any) => (
  <div className="fw-medium text-center">
    {params.row.date ? formatDate(params.row.date) : "-"}
  </div>
);

const renderTotalSlots = (params: any) => (
  <div className="text-center fw-medium text-primary">
    {params.row.totalSlots || 0}
  </div>
);

const renderAvailableCount = (params: any) => (
  <div className="text-center fw-medium text-success">
    {params.row.availableCount || 0}
  </div>
);

const renderBookedSlots = (params: any) => (
  <div className="text-center fw-medium text-warning">
    {params.row.bookedSlots || 0}
  </div>
);

const renderBookingRatio = (params: any) => (
  <div className="text-center fw-medium">
    {getBookingRatioText(
      params.row.bookedSlots || 0,
      params.row.totalSlots || 0
    )}
  </div>
);

const renderAvailabilityPercentage = (params: any) => {
  const percentage = getAvailabilityPercentage(
    params.row.availableCount || 0,
    params.row.totalSlots || 0
  );

  return <div className="text-center fw-medium">{percentage}%</div>;
};

const renderAvailabilityStatus = (params: any) => {
  // Önce API'den gelen availability string'ini kontrol et
  if (params.row.availability) {
    const { label, variant } = getApiAvailabilityDisplay(
      params.row.availability
    );
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Badge variant={variant}>{label}</Badge>
      </div>
    );
  }

  // Eğer API'den durum gelmemişse, sayısal verilerden hesapla
  const { availableCount, totalSlots } = params.row;
  const status = calculateAvailabilityStatus(
    availableCount || 0,
    totalSlots || 0
  );
  const variant = AVAILABILITY_VARIANTS[status];
  const label = AVAILABILITY_STATUS_LABELS[status];

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Badge variant={variant}>{label}</Badge>
    </div>
  );
};

const renderFirstAvailableSlot = (params: any) => {
  const { availableSlots } = params.row;

  if (!availableSlots || availableSlots.length === 0) {
    return <span className="text-muted text-center d-block">-</span>;
  }

  const firstSlot = availableSlots[0];
  return (
    <div className="text-center">
      <span className="badge bg-light text-dark border">
        {formatSlotTime(firstSlot.startTime, firstSlot.endTime)}
      </span>
    </div>
  );
};

const renderAvailableSlotCount = (params: any) => {
  const { availableSlots } = params.row;
  const count = availableSlots?.length || 0;

  return <div className="text-center fw-medium">{count}</div>;
};

/**
 * Appointment Availability DataGrid column definitions
 */
export const appointmentAvailabilityColumns: GridColDef<AppointmentAvailabilityDto>[] =
  [
    // {
    //   field: "schoolName",
    //   headerName: "Okul Adı",
    //   width: 180,
    //   minWidth: 150,
    //   sortable: true,
    //   renderCell: renderSchoolName,
    // },
    // {
    //   field: "schoolId",
    //   headerName: "Okul ID",
    //   width: 100,
    //   sortable: true,
    //   renderCell: renderSchoolId,
    // },
    {
      field: "date",
      headerName: "Randevu Tarihi",
      width: 200,
      sortable: true,
      renderCell: renderDate,
    },
    {
      field: "availability",
      headerName: "Müsaitlik",
      width: 140,
      sortable: true,
      renderCell: renderAvailabilityStatus,
    },
    {
      field: "totalSlots",
      // headerName: "Toplam Seans Sayısı",
      headerName: "Toplam",
      width: 130,
      sortable: true,
      renderCell: renderTotalSlots,
    },
    {
      field: "availableCount",
      headerName: "Müsait Seans",
      width: 170,
      sortable: true,
      renderCell: renderAvailableCount,
    },
    {
      field: "bookedSlots",
      headerName: "Dolu Seans",
      width: 160,
      sortable: true,
      renderCell: renderBookedSlots,
    },
    {
      field: "bookingRatio",
      headerName: "Doluluk",
      width: 120,
      sortable: false,
      renderCell: renderBookingRatio,
    },
    {
      field: "availabilityPercentage",
      headerName: "Seans Yüzdesi",
      width: 160,
      sortable: false,
      renderCell: renderAvailabilityPercentage,
    },
    {
      field: "firstAvailableSlot",
      headerName: "İlk Müsait Seans Saati",
      width: 200,
      sortable: false,
      renderCell: renderFirstAvailableSlot,
    },
  ];

/**
 * Legacy appointment columns (deprecated - use appointmentAvailabilityColumns instead)
 */
export const appointmentColumns = appointmentAvailabilityColumns;
