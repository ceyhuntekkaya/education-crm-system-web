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
    width: 220,
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

  // Description
  {
    field: "feeDescription",
    headerName: "Açıklama",
    width: 200,
    renderCell: (params: any) => {
      if (!params || !params.row || !params.row.feeDescription)
        return <div className="text-muted">-</div>;
      return (
        <div className="text-truncate" title={params.row.feeDescription}>
          {params.row.feeDescription}
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
    width: 130,
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
    width: 130,
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      return (
        <div>{getBillingPeriodDisplay(params.row.feeFrequency) || "-"}</div>
      );
    },
  },

  // Status
  {
    field: "status",
    headerName: "Durum",
    width: 110,
    renderCell: renderFeeStatus,
  },

  // Mandatory & Refundable - Combined
  {
    field: "isMandatory",
    headerName: "Özellikler",
    width: 200,
    align: "center",
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      const {
        isMandatory,
        isRefundable,
        appliesToNewStudents,
        appliesToExistingStudents,
      } = params.row;

      return (
        <div className="d-flex gap-4 justify-content-center align-items-center">
          {isMandatory && (
            <Popover
              content="Zorunlu ücret"
              placement="top"
              trigger="hover"
              size="sm"
            >
              <Badge variant="warning" className="cursor-pointer">
                <i
                  className="ph-bold ph-warning"
                  style={{ fontSize: "12px" }}
                />
              </Badge>
            </Popover>
          )}
          {isRefundable && (
            <Popover
              content="İade edilebilir"
              placement="top"
              trigger="hover"
              size="sm"
            >
              <Badge variant="info" className="cursor-pointer">
                <i
                  className="ph-bold ph-arrow-u-up-left"
                  style={{ fontSize: "12px" }}
                />
              </Badge>
            </Popover>
          )}
          {appliesToNewStudents && (
            <Popover
              content="Yeni öğrenciler"
              placement="top"
              trigger="hover"
              size="sm"
            >
              <Badge variant="success" className="cursor-pointer">
                <i
                  className="ph-bold ph-user-plus"
                  style={{ fontSize: "12px" }}
                />
              </Badge>
            </Popover>
          )}
          {appliesToExistingStudents && (
            <Popover
              content="Mevcut öğrenciler"
              placement="top"
              trigger="hover"
              size="sm"
            >
              <Badge variant="primary" className="cursor-pointer">
                <i className="ph-bold ph-users" style={{ fontSize: "12px" }} />
              </Badge>
            </Popover>
          )}
        </div>
      );
    },
  },

  // Payment Settings - Combined
  {
    field: "installmentAllowed",
    headerName: "Ödeme",
    width: 200,
    align: "center",
    renderCell: (params: any) => {
      if (!params || !params.row) return <div>-</div>;
      const {
        installmentAllowed,
        maxInstallments,
        discountEligible,
        scholarshipApplicable,
      } = params.row;

      return (
        <div className="d-flex gap-4 justify-content-center align-items-center flex-wrap">
          {installmentAllowed && maxInstallments && (
            <Popover
              content={`${maxInstallments} taksit`}
              placement="top"
              trigger="hover"
              size="sm"
            >
              <Badge variant="info" className="cursor-pointer">
                {maxInstallments}x
              </Badge>
            </Popover>
          )}
          {discountEligible && (
            <Popover
              content="İndirim uygulanabilir"
              placement="top"
              trigger="hover"
              size="sm"
            >
              <Badge variant="success" className="cursor-pointer">
                <i
                  className="ph-bold ph-percent"
                  style={{ fontSize: "12px" }}
                />
              </Badge>
            </Popover>
          )}
          {scholarshipApplicable && (
            <Popover
              content="Burs uygulanabilir"
              placement="top"
              trigger="hover"
              size="sm"
            >
              <Badge variant="primary" className="cursor-pointer">
                <i
                  className="ph-bold ph-graduation-cap"
                  style={{ fontSize: "12px" }}
                />
              </Badge>
            </Popover>
          )}
        </div>
      );
    },
  },
];
