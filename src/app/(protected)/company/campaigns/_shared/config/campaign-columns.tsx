import { GridColDef } from "@/components/ui/data-grid";
import { CampaignDto } from "@/types/dto/campaign/CampaignDto";
import { formatDate, formatNumber } from "@/utils";
import {
  getStatusBadgeVariant,
  getCampaignTypeDisplay,
  getStatusDisplay,
} from "../utils";
import { CampaignColumnHandlers } from "../types";
import { CampaignActionButtons } from "../components/campaign-action-buttons";
import { Badge } from "@/components";

// Column render helper functions
const renderCampaignTitle = (params: any) => (
  <div className="d-flex align-items-center">
    <div className="overflow-hidden">
      <div className="fw-medium text-truncate" title={params.value}>
        {params.value || "-"}
      </div>
      {params.row.shortDescription && (
        <small
          className="text-muted text-truncate d-block"
          title={params.row.shortDescription}
        >
          {params.row.shortDescription}
        </small>
      )}
    </div>
  </div>
);

const renderCampaignType = (params: any) => (
  <div className="text-truncate">{getCampaignTypeDisplay(params.value)}</div>
);

const renderCampaignStatus = (params: any) => (
  <div className="d-flex justify-content-center align-items-center h-100">
    <Badge variant={getStatusBadgeVariant(params.value)}>
      {getStatusDisplay(params.value)}
    </Badge>
  </div>
);

const renderDiscountInfo = (params: any) => {
  const { discountType, discountPercentage, discountAmount, displayDiscount } =
    params.row;

  if (displayDiscount) {
    return <div className="fw-medium text-success">{displayDiscount}</div>;
  }

  if (discountType === "PERCENTAGE" && discountPercentage) {
    return <div className="fw-medium text-success">%{discountPercentage}</div>;
  }

  if (discountType === "FIXED_AMOUNT" && discountAmount) {
    return (
      <div className="fw-medium text-success">
        {formatNumber(discountAmount)}₺
      </div>
    );
  }

  if (discountType === "NO_DISCOUNT") {
    return <div className="text-muted">-</div>;
  }

  return <div className="text-muted">-</div>;
};

const renderCampaignPeriod = (params: any) => {
  const { startDate, endDate, campaignPeriod } = params.row;

  if (campaignPeriod) {
    return <div className="text-truncate">{campaignPeriod}</div>;
  }

  if (startDate && endDate) {
    return (
      <div>
        <div className="fw-medium">{formatDate(startDate)}</div>
        <small className="text-muted">{formatDate(endDate)}</small>
      </div>
    );
  }

  return <div className="text-muted">-</div>;
};

const renderUsageInfo = (params: any) => {
  const { usageCount = 0, usageLimit } = params.row;

  if (usageLimit) {
    const percentage = (usageCount / usageLimit) * 100;
    return (
      <div>
        <div className="fw-medium">
          {usageCount}/{usageLimit}
        </div>
        <div className="progress" style={{ height: "4px" }}>
          <div
            className="progress-bar bg-main-600"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      </div>
    );
  }

  return <div className="fw-medium">{usageCount}</div>;
};

const renderPerformanceMetrics = (params: any) => {
  const {
    viewCount = 0,
    applicationCount = 0,
    conversionRate = 0,
  } = params.row;

  return (
    <div>
      <div className="d-flex justify-content-between">
        <small className="text-muted">Görüntüleme:</small>
        <small className="fw-medium">{formatNumber(viewCount)}</small>
      </div>
      <div className="d-flex justify-content-between">
        <small className="text-muted">Başvuru:</small>
        <small className="fw-medium">{formatNumber(applicationCount)}</small>
      </div>
      <div className="d-flex justify-content-between">
        <small className="text-muted">Dönüşüm:</small>
        <small className="fw-medium text-success">
          %{conversionRate.toFixed(1)}
        </small>
      </div>
    </div>
  );
};

const renderFeaturedStatus = (params: any) => (
  <div className="d-flex justify-content-center">
    {params.row.isFeatured ? (
      <i
        className="ph-bold ph-star text-warning"
        style={{ fontSize: "18px" }}
      ></i>
    ) : (
      <i className="ph ph-star text-muted" style={{ fontSize: "18px" }}></i>
    )}
  </div>
);

const renderActionButtons = (params: any, handlers: CampaignColumnHandlers) => (
  <CampaignActionButtons
    campaign={params.row}
    onViewDetails={handlers.onViewDetails}
    onEdit={handlers.onEdit}
    onToggleStatus={handlers.onToggleStatus}
    onDelete={handlers.onDelete}
    onDuplicate={handlers.onDuplicate}
  />
);

// Main column definitions
export const createCampaignColumns = (
  handlers: CampaignColumnHandlers
): GridColDef<CampaignDto>[] => [
  // Basic Information Columns
  {
    field: "featured",
    headerName: "",
    width: 50,
    renderCell: renderFeaturedStatus,
  },
  {
    field: "title",
    headerName: "Kampanya Adı",
    width: 280,
    renderCell: renderCampaignTitle,
  },
  {
    field: "campaignType",
    headerName: "Tür",
    width: 150,
    renderCell: renderCampaignType,
  },
  {
    field: "status",
    headerName: "Durum",
    width: 140,
    renderCell: renderCampaignStatus,
  },

  // Campaign Details Columns
  {
    field: "discount",
    headerName: "İndirim",
    width: 120,
    renderCell: renderDiscountInfo,
  },
  {
    field: "period",
    headerName: "Kampanya Dönemi",
    width: 230,
    renderCell: renderCampaignPeriod,
  },

  // Usage & Performance Columns
  {
    field: "usage",
    headerName: "Kullanım",
    width: 140,
    renderCell: renderUsageInfo,
  },
  {
    field: "performance",
    headerName: "Performans",
    width: 180,
    renderCell: renderPerformanceMetrics,
  },

  // Status & Actions Columns

  {
    field: "actions",
    headerName: "",
    width: 70,
    sortable: false,
    renderCell: (params) => renderActionButtons(params, handlers),
  },
];
