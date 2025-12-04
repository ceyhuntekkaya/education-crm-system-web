import { GridColDef } from "@/components/ui/data-grid";
import { SubscriptionPlanDto } from "@/types/dto/subscription/SubscriptionPlanDto";
import { formatDate } from "@/utils";
import {
  getStatusBadgeVariant,
  getBillingPeriodDisplay,
  formatPrice,
  getSubscriptionStatusDisplay,
  getVisibilityStatusDisplay,
  getPopularStatusDisplay,
  getSubscriptionTier,
  formatStorage,
  getTrialDisplay,
  getFeatureList,
  getTimeAgo,
} from "../utils";
import { Badge } from "@/components";

// Column render helper functions
const renderPlanInfo = (params: any) => (
  <div className="d-flex align-items-center">
    <div className="me-3">
      <div
        className="rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: params.row.isPopular ? "#ffc107" : "#6c757d",
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        {params.row.displayName?.charAt(0)?.toUpperCase() || "P"}
      </div>
    </div>
    <div className="overflow-hidden">
      <div className="d-flex align-items-center gap-2">
        <div className="fw-medium text-truncate" title={params.row.displayName}>
          {params.row.displayName || "-"}
        </div>
        {params.row.isPopular && (
          <Badge variant="warning" size="sm">
            Popüler
          </Badge>
        )}
      </div>
      <small
        className="text-muted d-block text-truncate"
        title={params.row.description}
      >
        {params.row.description || "-"}
      </small>
    </div>
  </div>
);

const renderPrice = (params: any) => (
  <div className="text-center">
    <div className="fw-bold text-primary fs-5">
      {formatPrice(params.row.price || 0, params.row.billingPeriod)}
    </div>
    {params.row.billingPeriod && (
      <small className="text-muted">
        {getBillingPeriodDisplay(params.row.billingPeriod)}
      </small>
    )}
  </div>
);

const renderTier = (params: any) => {
  const tier = getSubscriptionTier(params.row);
  return (
    <div className="d-flex justify-content-center">
      <Badge variant={tier.variant} size="sm">
        {tier.tier}
      </Badge>
    </div>
  );
};

const renderStatus = (params: any) => (
  <div className="d-flex justify-content-center align-items-center h-100">
    <Badge variant={getStatusBadgeVariant(params.row.isActive)}>
      {getSubscriptionStatusDisplay(params.row.isActive)}
    </Badge>
  </div>
);

const renderVisibility = (params: any) => (
  <div className="d-flex justify-content-center align-items-center h-100">
    <Badge variant={params.row.isVisible ? "success" : "secondary"} size="sm">
      {getVisibilityStatusDisplay(params.row.isVisible)}
    </Badge>
  </div>
);

const renderLimits = (params: any) => (
  <div className="small">
    <div className="d-flex justify-content-between">
      <span>Kurum:</span>
      <span className="fw-medium">
        {params.row.maxSchools === 999
          ? "Sınırsız"
          : params.row.maxSchools || 0}
      </span>
    </div>
    <div className="d-flex justify-content-between">
      <span>Kullanıcı:</span>
      <span className="fw-medium">
        {params.row.maxUsers === 999 ? "Sınırsız" : params.row.maxUsers || 0}
      </span>
    </div>
    <div className="d-flex justify-content-between">
      <span>Randevu/Ay:</span>
      <span className="fw-medium">
        {params.row.maxAppointmentsPerMonth === 9999
          ? "Sınırsız"
          : params.row.maxAppointmentsPerMonth || 0}
      </span>
    </div>
  </div>
);

const renderFeatures = (params: any) => {
  const features = [
    { key: "hasAnalytics", label: "Analitik", icon: "ph-chart-bar" },
    { key: "hasCustomDomain", label: "Özel Domain", icon: "ph-globe" },
    { key: "hasApiAccess", label: "API", icon: "ph-code" },
    { key: "hasPrioritySupport", label: "Öncelik Destek", icon: "ph-headset" },
    { key: "hasWhiteLabel", label: "Beyaz Etiket", icon: "ph-tag" },
  ];

  return (
    <div className="d-flex flex-wrap gap-1">
      {features.map(
        (feature) =>
          params.row[feature.key] && (
            <div
              key={feature.key}
              title={feature.label}
              className="text-success"
              style={{ fontSize: "12px" }}
            >
              <i className={`ph ${feature.icon}`} />
            </div>
          )
      )}
    </div>
  );
};

const renderStorage = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">{formatStorage(params.row.storageGb || 0)}</div>
  </div>
);

const renderTrial = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">
      {getTrialDisplay(params.row.trialDays || 0)}
    </div>
  </div>
);

const renderCreatedAt = (params: any) => (
  <div className="text-center">
    {params.row.createdAt ? (
      <>
        <div className="fw-medium">{formatDate(params.row.createdAt)}</div>
        <small className="text-muted">{getTimeAgo(params.row.createdAt)}</small>
      </>
    ) : (
      <div className="text-muted">-</div>
    )}
  </div>
);

const renderSortOrder = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">{params.row.sortOrder || 0}</div>
  </div>
);

// Main column definitions
export const createSubscriptionColumns =
  (): GridColDef<SubscriptionPlanDto>[] => [
    // Plan Information
    {
      field: "displayName",
      headerName: "Plan Bilgileri",
      width: 280,
      renderCell: renderPlanInfo,
    },
    {
      field: "price",
      headerName: "Fiyat",
      width: 140,
      renderCell: renderPrice,
    },
    {
      field: "tier",
      headerName: "Seviye",
      width: 120,
      renderCell: renderTier,
    },
    {
      field: "isActive",
      headerName: "Durum",
      width: 100,
      renderCell: renderStatus,
    },
    {
      field: "isVisible",
      headerName: "Görünürlük",
      width: 100,
      renderCell: renderVisibility,
    },

    // Limits & Features
    {
      field: "limits",
      headerName: "Limitler",
      width: 140,
      renderCell: renderLimits,
    },
    {
      field: "features",
      headerName: "Özellikler",
      width: 120,
      renderCell: renderFeatures,
    },
    {
      field: "storageGb",
      headerName: "Depolama",
      width: 100,
      renderCell: renderStorage,
    },
    {
      field: "trialDays",
      headerName: "Deneme",
      width: 100,
      renderCell: renderTrial,
    },

    // Meta Information
    {
      field: "sortOrder",
      headerName: "Sıra",
      width: 80,
      renderCell: renderSortOrder,
    },
    {
      field: "createdAt",
      headerName: "Oluşturma",
      width: 130,
      renderCell: renderCreatedAt,
    },

    // Actions
    //   {
    //     field: "actions",
    //     headerName: "",
    //     width: 120,
    //     sortable: false,
    //     renderCell: (params) => renderActionButtons(params, handlers),
    //   },
  ];
