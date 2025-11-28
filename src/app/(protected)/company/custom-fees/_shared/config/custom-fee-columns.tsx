import { GridColDef } from "@/components/ui/data-grid";
import { CustomFeeDto } from "@/types/dto/pricing/CustomFeeDto";
import { formatDate } from "@/utils";
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

  // Fee Name with School Name
  {
    field: "feeName",
    headerName: "Ücret Adı",
    width: 180,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      return (
        <div className="d-flex flex-column">
          <div className="fw-medium text-truncate" title={params.row.feeName}>
            {params.row.feeName || "-"}
          </div>
          {params.row.schoolName && (
            <small
              className="text-muted text-truncate"
              title={params.row.schoolName}
            >
              {params.row.schoolName}
            </small>
          )}
        </div>
      );
    },
  },

  // Fee Type
  {
    field: "feeType",
    headerName: "Tür",
    width: 110,
    renderCell: renderFeeType,
  },

  // Amount - API'dan formattedFeeAmount kullan
  {
    field: "formattedFeeAmount",
    headerName: "Tutar",
    width: 120,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      return (
        <div className="fw-medium text-success">
          {params.row.formattedFeeAmount ||
            formatCurrency(params.row.feeAmount, "TRY") ||
            "-"}
        </div>
      );
    },
  },

  // Frequency - Türkçe karşılık kullan
  {
    field: "feeFrequency",
    headerName: "Dönem",
    width: 100,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      return (
        <div className="fw-medium">
          {getBillingPeriodDisplay(params.row.feeFrequency) || "-"}
        </div>
      );
    },
  },

  // Applicability - API'dan applicabilityDescription kullan
  // {
  //   field: "applicabilityDescription",
  //   headerName: "Uygulanma",
  //   width: 200,
  //   renderCell: (params: any) => {
  //     if (!params || !params.row) return <div>-</div>;
  //     return (
  //       <div
  //         className="text-truncate"
  //         title={params.row.applicabilityDescription}
  //       >
  //         {params.row.applicabilityDescription || "-"}
  //       </div>
  //     );
  //   },
  // },

  // Mandatory
  {
    field: "isMandatory",
    headerName: "Zorunlu",
    width: 140,
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

  // Refundable
  {
    field: "isRefundable",
    headerName: "İade",
    width: 100,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      return (
        <div className="d-flex justify-content-center">
          {params.row.isRefundable ? (
            <i
              className="ph-bold ph-check text-success"
              title="İade Edilebilir"
            />
          ) : (
            <i className="ph-bold ph-x text-muted" title="İade Edilemez" />
          )}
        </div>
      );
    },
  },

  // Installment Info
  {
    field: "installmentAllowed",
    headerName: "Taksit",
    width: 140,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      if (params.row.installmentAllowed) {
        return (
          <Badge variant="info">{params.row.maxInstallments || 0} Taksit</Badge>
        );
      }
      return <span className="text-muted">-</span>;
    },
  },

  // Late Fee Percentage
  {
    field: "lateFeePercentage",
    headerName: "Gecikme",
    width: 130,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      const lateFee = params.row.lateFeePercentage;
      if (lateFee && lateFee > 0) {
        return (
          <div className="fw-medium text-warning">%{lateFee.toFixed(1)}</div>
        );
      }
      return <span className="text-muted">-</span>;
    },
  },

  // Status
  {
    field: "status",
    headerName: "Durum",
    width: 120,
    renderCell: renderFeeStatus,
  },

  // Description
  {
    field: "feeDescription",
    headerName: "Açıklama",
    width: 180,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      const description = params.row.feeDescription;
      if (!description) return <div className="text-muted">-</div>;

      return (
        <div
          className="text-truncate"
          title={description}
          style={{ maxWidth: "160px" }}
        >
          {description}
        </div>
      );
    },
  },

  // Created At
  {
    field: "createdAt",
    headerName: "Oluşturma",
    width: 160,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      return (
        <div className="text-muted">
          {params.row.createdAt ? formatDate(params.row.createdAt) : "-"}
        </div>
      );
    },
  },
];
