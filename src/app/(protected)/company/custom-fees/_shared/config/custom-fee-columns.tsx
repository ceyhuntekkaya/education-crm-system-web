import { GridColDef } from "@/components/ui/data-grid";
import { CustomFeeDto } from "@/types/dto/pricing/CustomFeeDto";
import { formatDate, formatNumber } from "@/utils";
import {
  getStatusBadgeVariant,
  getStatusDisplay,
  formatCurrency,
  getFeeTypeDisplay,
  getFeeTypeBadgeVariant,
  getBillingPeriodDisplay,
} from "../../utils";
import { Badge } from "@/components";

// Column render helper functions
const renderFeeInfo = (params: any) => {
  if (!params || !params.row) return <div>-</div>;

  return (
    <div className="d-flex align-items-center">
      <div className="overflow-hidden">
        <div className="fw-medium text-truncate" title={params.row.feeName}>
          {params.row.feeName || "-"}
        </div>
        {params.row.schoolName && (
          <small
            className="text-muted text-truncate d-block"
            title={params.row.schoolName}
          >
            {params.row.schoolName}
          </small>
        )}
      </div>
    </div>
  );
};

const renderFeeType = (params: any) => {
  if (!params || params.value === undefined) return <div>-</div>;

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Badge variant={getFeeTypeBadgeVariant(params.value)}>
        {getFeeTypeDisplay(params.value)}
      </Badge>
    </div>
  );
};

const renderFeeStatus = (params: any) => {
  if (!params || params.value === undefined) return <div>-</div>;

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Badge variant={getStatusBadgeVariant(params.value)}>
        {getStatusDisplay(params.value)}
      </Badge>
    </div>
  );
};

const renderAmount = (params: any) => {
  if (!params || !params.row) return <div>-</div>;

  const { feeAmount } = params.row;

  return (
    <div className="fw-medium text-success">
      {formatCurrency(feeAmount, "TRY")}
    </div>
  );
};

const renderBillingPeriod = (params: any) => {
  if (!params || !params.row) return <div>-</div>;

  const feeFrequency = params.row.feeFrequency;
  return (
    <div className="fw-medium">{getBillingPeriodDisplay(feeFrequency)}</div>
  );
};

const renderDescription = (params: any) => {
  if (!params || !params.row) return <div className="text-muted">-</div>;

  const description = params.row.feeDescription;
  if (!description) return <div className="text-muted">-</div>;

  return (
    <div
      className="text-truncate"
      title={description}
      style={{ maxWidth: "200px" }}
    >
      {description}
    </div>
  );
};

const renderValidityPeriod = (params: any) => {
  if (!params || !params.row) return <div className="text-muted">-</div>;

  const { validFrom, validUntil } = params.row;

  if (validFrom && validUntil) {
    return (
      <div>
        <div className="fw-medium">{formatDate(validFrom)}</div>
        <small className="text-muted">{formatDate(validUntil)}</small>
      </div>
    );
  }

  return <div className="text-muted">-</div>;
};

// Akademik yıl hesaplama fonksiyonu
const getAcademicYear = (validFrom: string, validUntil: string) => {
  if (!validFrom || !validUntil) return "-";

  const fromDate = new Date(validFrom);
  const toDate = new Date(validUntil);

  const fromYear = fromDate.getFullYear();
  const toYear = toDate.getFullYear();

  // Eğer aynı yıldaysa sadece o yılı döndür
  if (fromYear === toYear) {
    return fromYear.toString();
  }

  // Farklı yıllardaysa aralık olarak göster
  return `${fromYear}-${toYear}`;
};

const renderApplicableInfo = (params: any) => {
  if (!params || !params.row) return <div>-</div>;

  const { appliesToGrades, isMandatory } = params.row;

  return (
    <div>
      {appliesToGrades && <small className="d-block">{appliesToGrades}</small>}
      {isMandatory && (
        <Badge variant="warning" className="mt-1">
          Zorunlu
        </Badge>
      )}
    </div>
  );
};

const renderCurrentStatus = (params: any) => {
  if (!params || !params.row) return <div>-</div>;

  const isActive = params.row.status === "ACTIVE";
  return (
    <div className="d-flex justify-content-center">
      {isActive ? (
        <i
          className="ph-bold ph-check-circle text-success"
          style={{ fontSize: "18px" }}
          title="Aktif"
        ></i>
      ) : (
        <i
          className="ph ph-x-circle text-muted"
          style={{ fontSize: "18px" }}
          title="Pasif"
        ></i>
      )}
    </div>
  );
};

// Main column definitions
export const createCustomFeeColumns = (): GridColDef<CustomFeeDto>[] => [
  // Active Status
  {
    field: "active",
    headerName: "",
    width: 50,
    renderCell: renderCurrentStatus,
  },

  // Fee Name - API'dan direkt field kullan
  {
    field: "feeName",
    headerName: "Ücret Adı",
    width: 200,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      return (
        <div className="fw-medium text-truncate" title={params.row.feeName}>
          {params.row.feeName || "-"}
        </div>
      );
    },
  },

  // Fee Type
  {
    field: "feeType",
    headerName: "Tür",
    width: 120,
    renderCell: renderFeeType,
  },

  // Amount - API'dan formattedFeeAmount kullan
  {
    field: "formattedFeeAmount",
    headerName: "Tutar",
    width: 140,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      return (
        <div className="fw-medium text-success">
          {params.row.formattedFeeAmount || "-"}
        </div>
      );
    },
  },

  // Description
  {
    field: "feeDescription",
    headerName: "Açıklama",
    width: 250,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      const description = params.row.feeDescription;
      if (!description) return <div className="text-muted">-</div>;

      return (
        <div
          className="text-truncate"
          title={description}
          style={{ maxWidth: "230px" }}
        >
          {description}
        </div>
      );
    },
  },

  // Frequency - API'dan frequencyDisplayName kullan
  {
    field: "frequencyDisplayName",
    headerName: "Dönem",
    width: 110,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      return (
        <div className="fw-medium">
          {params.row.frequencyDisplayName || "-"}
        </div>
      );
    },
  },

  // Status
  {
    field: "status",
    headerName: "Durum",
    width: 150,
    renderCell: renderFeeStatus,
  },

  // Applicable Grades
  {
    field: "appliesToGrades",
    headerName: "Sınıflar",
    width: 150,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      return (
        <div className="text-truncate" title={params.row.appliesToGrades}>
          {params.row.appliesToGrades || "-"}
        </div>
      );
    },
  },

  // Age Range (Custom field combining minimumAge and maximumAge)
  {
    field: "ageRange",
    headerName: "Yaş",
    width: 130,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      const { minimumAge, maximumAge } = params.row;
      if (minimumAge && maximumAge) {
        return (
          <div>
            {minimumAge}-{maximumAge}
          </div>
        );
      }
      return <div>-</div>;
    },
  },

  // Mandatory
  {
    field: "isMandatory",
    headerName: "Zorunlu",
    width: 170,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      return (
        <div className="d-flex justify-content-center">
          {params.row.isMandatory ? (
            <i className="ph-bold ph-check text-success" title="Zorunlu" />
          ) : (
            <i className="ph-bold ph-x text-muted" title="İsteğe Bağlı" />
          )}
        </div>
      );
    },
  },

  // Valid From
  {
    field: "validFrom",
    headerName: "Başlangıç",
    width: 170,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      return (
        <div className="text-muted">
          {params.row.validFrom ? formatDate(params.row.validFrom) : "-"}
        </div>
      );
    },
  },

  // Valid Until
  {
    field: "validUntil",
    headerName: "Bitiş",
    width: 170,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      return (
        <div className="text-muted">
          {params.row.validUntil ? formatDate(params.row.validUntil) : "-"}
        </div>
      );
    },
  },
];
