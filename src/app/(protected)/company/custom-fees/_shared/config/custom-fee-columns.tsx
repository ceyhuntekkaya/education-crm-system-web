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
const renderFeeInfo = (params: any) => (
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

const renderFeeType = (params: any) => (
  <div className="d-flex justify-content-center align-items-center h-100">
    <Badge variant={getFeeTypeBadgeVariant(params.value)}>
      {getFeeTypeDisplay(params.value)}
    </Badge>
  </div>
);

const renderFeeStatus = (params: any) => (
  <div className="d-flex justify-content-center align-items-center h-100">
    <Badge variant={getStatusBadgeVariant(params.value)}>
      {getStatusDisplay(params.value)}
    </Badge>
  </div>
);

const renderAmount = (params: any) => {
  const { feeAmount } = params.row;

  return (
    <div className="fw-medium text-success">
      {formatCurrency(feeAmount, "TRY")}
    </div>
  );
};

const renderBillingPeriod = (params: any) => {
  const feeFrequency = params.row.feeFrequency;
  return (
    <div className="fw-medium">{getBillingPeriodDisplay(feeFrequency)}</div>
  );
};

const renderDescription = (params: any) => {
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

const renderApplicableInfo = (params: any) => {
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

  // Fee Information
  {
    field: "feeName",
    headerName: "Ücret Adı",
    width: 250,
    renderCell: renderFeeInfo,
  },

  // Fee Type
  {
    field: "feeType",
    headerName: "Ücret Türü",
    width: 160,
    renderCell: renderFeeType,
  },

  // Amount
  {
    field: "feeAmount",
    headerName: "Tutar",
    width: 140,
    renderCell: renderAmount,
  },

  // Billing Period
  {
    field: "feeFrequency",
    headerName: "Fatura Dönemi",
    width: 140,
    renderCell: renderBillingPeriod,
  },

  // Description
  {
    field: "feeDescription",
    headerName: "Açıklama",
    width: 220,
    renderCell: renderDescription,
  },

  // Status
  {
    field: "status",
    headerName: "Durum",
    width: 120,
    renderCell: renderFeeStatus,
  },

  // Applicable Info
  {
    field: "applicable",
    headerName: "Uygulama",
    width: 150,
    renderCell: renderApplicableInfo,
  },

  // Validity Period
  {
    field: "validity",
    headerName: "Geçerlilik",
    width: 180,
    renderCell: renderValidityPeriod,
  },

  // Academic Year
  {
    field: "academicYear",
    headerName: "Akademik Yıl",
    width: 130,
    valueGetter: (params: any) => params.row.academicYear || "-",
  },
];
