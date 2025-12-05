import { GridColDef } from "@/components/ui/data-grid";
import { SchoolPricingDto } from "@/types/dto/pricing/SchoolPricingDto";
import { formatDate, formatNumber } from "@/utils";
import {
  getStatusBadgeVariant,
  getPricingStatusDisplay,
  formatCurrency,
} from "../utils";
import { Badge } from "@/components";

// Column render helper functions
const renderSchoolInfo = (params: any) => (
  <div className="d-flex align-items-center">
    <div className="overflow-hidden">
      <div className="fw-medium text-truncate" title={params.row.schoolName}>
        {params.row.schoolName || "-"}
      </div>
      {params.row.gradeLevel && (
        <small
          className="text-muted text-truncate d-block"
          title={params.row.gradeLevel}
        >
          {params.row.gradeLevel}
        </small>
      )}
    </div>
  </div>
);

const renderAcademicInfo = (params: any) => (
  <div>
    <div className="fw-medium">{params.row.academicYear || "-"}</div>
    {params.row.classLevel && (
      <small className="text-muted d-block">{params.row.classLevel}</small>
    )}
  </div>
);

const renderPricingStatus = (params: any) => (
  <div className="d-flex justify-content-center align-items-center h-100">
    <Badge variant={getStatusBadgeVariant(params.value)}>
      {getPricingStatusDisplay(params.value)}
    </Badge>
  </div>
);

const renderTuitionInfo = (params: any) => {
  const { annualTuition, monthlyTuition, currency } = params.row;

  return (
    <div>
      {annualTuition && (
        <div className="fw-medium text-success">
          {formatCurrency(annualTuition, currency)} / Yıl
        </div>
      )}
      {monthlyTuition && (
        <small className="text-muted d-block">
          {formatCurrency(monthlyTuition, currency)} / Ay
        </small>
      )}
    </div>
  );
};

const renderTotalCosts = (params: any) => {
  const { totalAnnualCost, totalMonthlyCost, currency } = params.row;

  return (
    <div>
      {totalAnnualCost && (
        <div className="fw-medium">
          {formatCurrency(totalAnnualCost, currency)}
        </div>
      )}
      {totalMonthlyCost && (
        <small className="text-muted d-block">
          {formatCurrency(totalMonthlyCost, currency)} / Ay
        </small>
      )}
    </div>
  );
};

const renderPaymentInfo = (params: any) => {
  const { paymentFrequency, installmentCount, downPaymentPercentage } =
    params.row;

  const getPaymentFrequencyDisplay = (frequency?: string) => {
    switch (frequency) {
      case "ONE_TIME":
        return "Tek Seferlik";
      case "MONTHLY":
        return "Aylık";
      case "QUARTERLY":
        return "Üç Aylık";
      case "SEMESTER":
        return "Dönemlik";
      case "ANNUAL":
        return "Yıllık";
      case "BIANNUAL":
        return "Altı Aylık";
      case "CUSTOM":
        return "Özel";
      default:
        return "-";
    }
  };

  return (
    <div>
      <div className="fw-medium">
        {getPaymentFrequencyDisplay(paymentFrequency)}
      </div>
      {installmentCount && (
        <small className="text-muted d-block">{installmentCount} Taksit</small>
      )}
      {downPaymentPercentage && (
        <small className="text-info d-block">
          %{downPaymentPercentage} Peşin
        </small>
      )}
    </div>
  );
};

const renderDiscountInfo = (params: any) => {
  const {
    earlyPaymentDiscountPercentage,
    siblingDiscountPercentage,
    loyaltyDiscountPercentage,
  } = params.row;

  const discounts = [
    { label: "Erken", value: earlyPaymentDiscountPercentage },
    { label: "Kardeş", value: siblingDiscountPercentage },
    { label: "Sadakat", value: loyaltyDiscountPercentage },
  ].filter((d) => d.value && d.value > 0);

  if (discounts.length === 0) {
    return <div className="text-muted">-</div>;
  }

  return (
    <div>
      {discounts.slice(0, 2).map((discount, index) => (
        <small key={index} className="d-block text-success">
          {discount.label}: %{discount.value}
        </small>
      ))}
      {discounts.length > 2 && (
        <small className="text-muted">+{discounts.length - 2} daha</small>
      )}
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

const renderCurrentStatus = (params: any) => (
  <div className="d-flex justify-content-center">
    {params.row.isCurrent ? (
      <i
        className="ph-bold ph-check-circle text-success"
        style={{ fontSize: "18px" }}
        title="Güncel"
      ></i>
    ) : (
      <i
        className="ph ph-clock text-muted"
        style={{ fontSize: "18px" }}
        title="Eski Versiyon"
      ></i>
    )}
  </div>
);

// Main column definitions
export const createPricingColumns = (): GridColDef<SchoolPricingDto>[] => [
  // Basic Information Columns
  {
    field: "current",
    headerName: "",
    width: 50,
    renderCell: renderCurrentStatus,
  },
  {
    field: "schoolName",
    headerName: "Kurum Bilgileri",
    width: 280,
    renderCell: renderSchoolInfo,
  },
  {
    field: "academicYear",
    headerName: "Akademik Yıl",
    width: 150,
    renderCell: renderAcademicInfo,
  },
  {
    field: "status",
    headerName: "Durum",
    width: 140,
    renderCell: renderPricingStatus,
  },

  // Pricing Details Columns
  {
    field: "tuition",
    headerName: "Eğitim Ücreti",
    width: 180,
    renderCell: renderTuitionInfo,
  },
  {
    field: "totalCost",
    headerName: "Toplam Maliyet",
    width: 180,
    renderCell: renderTotalCosts,
  },

  // Payment & Discount Columns
  {
    field: "payment",
    headerName: "Ödeme Bilgileri",
    width: 150,
    renderCell: renderPaymentInfo,
  },
  {
    field: "discounts",
    headerName: "İndirimler",
    width: 140,
    renderCell: renderDiscountInfo,
  },

  // Validity Column
  {
    field: "validity",
    headerName: "Geçerlilik",
    width: 180,
    renderCell: renderValidityPeriod,
  },
];
