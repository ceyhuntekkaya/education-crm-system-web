import { GridColDef } from "@/components/ui/data-grid";
import { CustomFeeDto } from "@/types/dto/pricing/CustomFeeDto";
import {
  getStatusBadgeVariant,
  getStatusDisplay,
  formatCurrency,
  getFeeTypeDisplay,
  getFeeTypeBadgeVariant,
  getBillingPeriodDisplay,
} from "../../utils";
import { Badge, Popover } from "@/components";

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
        <Popover
          content="Aktif ücret"
          placement="top"
          trigger="hover"
          size="sm"
        >
          <div className="cursor-pointer">
            <i
              className="ph-bold ph-check-circle text-success"
              style={{ fontSize: "18px" }}
            />
          </div>
        </Popover>
      ) : (
        <Popover
          content="Pasif ücret"
          placement="top"
          trigger="hover"
          size="sm"
        >
          <div className="cursor-pointer">
            <i
              className="ph ph-x-circle text-muted"
              style={{ fontSize: "18px" }}
            />
          </div>
        </Popover>
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
    width: 200,
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
    width: 130,
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
    headerName: "Sıklık",
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

  // Mandatory
  {
    field: "isMandatory",
    headerName: "Zorunlu",
    width: 130,
    align: "center",
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      return (
        <div className="d-flex justify-content-center">
          {params.row.isMandatory ? (
            <Popover
              content="Zorunlu ücret"
              placement="top"
              trigger="hover"
              size="sm"
            >
              <div className="cursor-pointer">
                <i
                  className="ph-bold ph-check text-success"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </Popover>
          ) : (
            <Popover
              content="İsteğe bağlı ücret"
              placement="top"
              trigger="hover"
              size="sm"
            >
              <div className="cursor-pointer">
                <i
                  className="ph-bold ph-x text-muted"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </Popover>
          )}
        </div>
      );
    },
  },

  // Installment Info
  {
    field: "installmentAllowed",
    headerName: "Taksit",
    width: 120,
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

  // Discount & Scholarship - Combined column
  {
    field: "discountEligible",
    headerName: "İndirim/Burs",
    width: 170,
    align: "center",
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      const hasDiscount = params.row.discountEligible;
      const hasScholarship = params.row.scholarshipApplicable;

      if (!hasDiscount && !hasScholarship) {
        return <span className="text-muted">-</span>;
      }

      return (
        <div className="d-flex gap-3 justify-content-center">
          {hasDiscount && (
            <Popover
              content="İndirim uygulanabilir"
              placement="top"
              trigger="hover"
              size="sm"
            >
              <div className="cursor-pointer">
                <i
                  className="ph-bold ph-percent text-info"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </Popover>
          )}
          {hasScholarship && (
            <Popover
              content="Burs uygulanabilir"
              placement="top"
              trigger="hover"
              size="sm"
            >
              <div className="cursor-pointer">
                <i
                  className="ph-bold ph-graduation-cap text-primary"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </Popover>
          )}
        </div>
      );
    },
  },

  // Status
  {
    field: "status",
    headerName: "Durum",
    width: 120,
    renderCell: renderFeeStatus,
  },
];
