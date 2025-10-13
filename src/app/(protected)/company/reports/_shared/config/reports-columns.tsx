import { GridColDef } from "@/components/ui/data-grid";
import { AnalyticsDto } from "@/types/dto/analytics/AnalyticsDto";
import { formatDate } from "@/utils";
import {
  getStatusBadgeVariant,
  getMetricTypeDisplay,
  getTimePeriodDisplay,
  formatAnalyticsValue,
  getReportStatusDisplay,
  getMetricTypeBadgeVariant,
  getTimePeriodBadgeVariant,
  getGrowthRateDisplay,
  getDataSourceDisplay,
  formatCalculationDuration,
  getPerformanceIndicator,
  getTimeAgo,
  getReportSummary,
} from "../utils";
import { Badge } from "@/components";

// Column render helper functions
const renderReportInfo = (params: any) => (
  <div className="d-flex align-items-center">
    <div className="me-3">
      <div
        className="rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: "40px",
          height: "40px",
          backgroundColor:
            params.row.metricType === "TRAFFIC"
              ? "#0d6efd"
              : params.row.metricType === "ENGAGEMENT"
              ? "#198754"
              : params.row.metricType === "CONVERSION"
              ? "#ffc107"
              : params.row.metricType === "PERFORMANCE"
              ? "#dc3545"
              : "#6c757d",
          color: "white",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {params.row.metricType?.charAt(0)?.toUpperCase() || "R"}
      </div>
    </div>
    <div className="overflow-hidden">
      <div
        className="fw-medium text-truncate"
        title={getReportSummary(params.row)}
      >
        {getMetricTypeDisplay(params.row.metricType || "")}
      </div>
      <small className="text-muted d-block text-truncate">
        {params.row.date
          ? new Date(params.row.date).toLocaleDateString("tr-TR")
          : "-"}
      </small>
    </div>
  </div>
);

const renderMetricType = (params: any) => (
  <div className="d-flex justify-content-center">
    <Badge
      variant={getMetricTypeBadgeVariant(params.row.metricType || "")}
      size="sm"
    >
      {getMetricTypeDisplay(params.row.metricType || "")}
    </Badge>
  </div>
);

const renderTimePeriod = (params: any) => (
  <div className="d-flex justify-content-center">
    <Badge
      variant={getTimePeriodBadgeVariant(params.row.timePeriod || "")}
      size="sm"
    >
      {getTimePeriodDisplay(params.row.timePeriod || "")}
    </Badge>
  </div>
);

const renderStatus = (params: any) => (
  <div className="d-flex justify-content-center align-items-center h-100">
    <Badge variant={getStatusBadgeVariant(params.row.isActive)}>
      {getReportStatusDisplay(params.row.isActive)}
    </Badge>
  </div>
);

const renderTrafficMetrics = (params: any) => (
  <div className="small">
    <div className="d-flex justify-content-between">
      <span>Sayfa Görüntüleme:</span>
      <span className="fw-medium">
        {formatAnalyticsValue(params.row.pageViews)}
      </span>
    </div>
    <div className="d-flex justify-content-between">
      <span>Benzersiz Ziyaretçi:</span>
      <span className="fw-medium">
        {formatAnalyticsValue(params.row.uniqueVisitors)}
      </span>
    </div>
    <div className="d-flex justify-content-between">
      <span>Çıkış Oranı:</span>
      <span className="fw-medium">
        {formatAnalyticsValue(params.row.bounceRate, "percentage")}
      </span>
    </div>
  </div>
);

const renderEngagementMetrics = (params: any) => (
  <div className="small">
    <div className="d-flex justify-content-between">
      <span>Randevu Talebi:</span>
      <span className="fw-medium">
        {formatAnalyticsValue(params.row.appointmentRequests)}
      </span>
    </div>
    <div className="d-flex justify-content-between">
      <span>Mesaj Sorgusu:</span>
      <span className="fw-medium">
        {formatAnalyticsValue(params.row.messageInquiries)}
      </span>
    </div>
    <div className="d-flex justify-content-between">
      <span>Galeri Görüntüleme:</span>
      <span className="fw-medium">
        {formatAnalyticsValue(params.row.galleryViews)}
      </span>
    </div>
  </div>
);

const renderConversionMetrics = (params: any) => (
  <div className="small">
    <div className="d-flex justify-content-between">
      <span>Dönüşüm Oranı:</span>
      <span className="fw-medium">
        {formatAnalyticsValue(params.row.conversionRate, "percentage")}
      </span>
    </div>
    <div className="d-flex justify-content-between">
      <span>Randevu Dönüşümü:</span>
      <span className="fw-medium">
        {formatAnalyticsValue(
          params.row.appointmentConversionRate,
          "percentage"
        )}
      </span>
    </div>
    <div className="d-flex justify-content-between">
      <span>Kampanya Dönüşümü:</span>
      <span className="fw-medium">
        {formatAnalyticsValue(params.row.campaignConversions)}
      </span>
    </div>
  </div>
);

const renderPerformanceMetrics = (params: any) => (
  <div className="small">
    <div className="d-flex justify-content-between">
      <span>Sayfa Yükleme:</span>
      <span className="fw-medium">
        {params.row.pageLoadTimeMs ? `${params.row.pageLoadTimeMs}ms` : "-"}
      </span>
    </div>
    <div className="d-flex justify-content-between">
      <span>Sunucu Yanıtı:</span>
      <span className="fw-medium">
        {params.row.serverResponseTimeMs
          ? `${params.row.serverResponseTimeMs}ms`
          : "-"}
      </span>
    </div>
    <div className="d-flex justify-content-between">
      <span>Çalışma Süresi:</span>
      <span className="fw-medium">
        {formatAnalyticsValue(params.row.uptimePercentage, "percentage")}
      </span>
    </div>
  </div>
);

const renderFinancialMetrics = (params: any) => (
  <div className="small">
    <div className="d-flex justify-content-between">
      <span>Gelir:</span>
      <span className="fw-medium">
        {formatAnalyticsValue(params.row.revenue, "currency")}
      </span>
    </div>
    <div className="d-flex justify-content-between">
      <span>Yeni Abonelik:</span>
      <span className="fw-medium">
        {formatAnalyticsValue(params.row.newSubscriptions)}
      </span>
    </div>
    <div className="d-flex justify-content-between">
      <span>Kayıp Oranı:</span>
      <span className="fw-medium">
        {formatAnalyticsValue(params.row.churnRate, "percentage")}
      </span>
    </div>
  </div>
);

const renderMetrics = (params: any) => {
  switch (params.row.metricType) {
    case "TRAFFIC":
      return renderTrafficMetrics(params);
    case "ENGAGEMENT":
      return renderEngagementMetrics(params);
    case "CONVERSION":
      return renderConversionMetrics(params);
    case "PERFORMANCE":
      return renderPerformanceMetrics(params);
    case "FINANCIAL":
      return renderFinancialMetrics(params);
    default:
      return (
        <div className="text-muted small">Metrik detayları mevcut değil</div>
      );
  }
};

const renderGrowthRate = (params: any) => {
  const growthFields = [
    { field: "visitorsGrowthRate", label: "Ziyaretçi" },
    { field: "appointmentsGrowthRate", label: "Randevu" },
    { field: "inquiriesGrowthRate", label: "Sorgu" },
    { field: "ratingChange", label: "Değerlendirme" },
  ];

  const activeGrowth = growthFields.find(
    (g) => params.row[g.field] !== undefined
  );

  if (!activeGrowth) {
    return <div className="text-muted text-center">-</div>;
  }

  const growth = getGrowthRateDisplay(params.row[activeGrowth.field]);

  return (
    <div className="text-center">
      <Badge variant={growth.variant} size="sm">
        {growth.display}
      </Badge>
      <small className="d-block text-muted mt-1">{activeGrowth.label}</small>
    </div>
  );
};

const renderDataSource = (params: any) => (
  <div className="text-center">
    <div className="fw-medium small">
      {getDataSourceDisplay(params.row.dataSource)}
    </div>
    {params.row.calculationDurationMs && (
      <small className="text-muted d-block">
        {formatCalculationDuration(params.row.calculationDurationMs)}
      </small>
    )}
  </div>
);

const renderPerformanceIndicator = (params: any) => {
  const indicator = getPerformanceIndicator(params.row);
  return (
    <div className="d-flex justify-content-center">
      <Badge variant={indicator.variant} size="sm">
        {indicator.label}
      </Badge>
    </div>
  );
};

const renderBrandSchool = (params: any) => (
  <div className="small">
    {params.row.brand && (
      <div
        className="fw-medium text-truncate"
        title={params.row.brand.displayName}
      >
        {params.row.brand.displayName}
      </div>
    )}
    {params.row.school && (
      <small
        className="text-muted d-block text-truncate"
        title={params.row.school.displayName}
      >
        {params.row.school.displayName}
      </small>
    )}
    {!params.row.brand && !params.row.school && (
      <div className="text-muted">-</div>
    )}
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

// Main column definitions
export const createReportsColumns = (): GridColDef<AnalyticsDto>[] => [
  // Report Information

  {
    field: "metricType",
    headerName: "Rapor Bilgileri",
    width: 200,
    renderCell: renderReportInfo,
  },
  {
    field: "brandSchool",
    headerName: "Kurum/Okul",
    width: 180,
    renderCell: renderBrandSchool,
  },
  {
    field: "metricTypeDisplay",
    headerName: "Tür",
    width: 120,
    renderCell: renderMetricType,
  },
  {
    field: "timePeriod",
    headerName: "Dönem",
    width: 100,
    renderCell: renderTimePeriod,
  },
  {
    field: "isActive",
    headerName: "Durum",
    width: 100,
    renderCell: renderStatus,
  },

  // Metrics
  {
    field: "metrics",
    headerName: "Metrikler",
    width: 180,
    renderCell: renderMetrics,
  },
  {
    field: "growthRate",
    headerName: "Büyüme",
    width: 100,
    renderCell: renderGrowthRate,
  },
  {
    field: "performance",
    headerName: "Performans",
    width: 100,
    renderCell: renderPerformanceIndicator,
  },

  // Source & Organization
  {
    field: "dataSource",
    headerName: "Kaynak",
    width: 140,
    renderCell: renderDataSource,
  },

  // Meta Information
  {
    field: "createdAt",
    headerName: "Oluşturma",
    width: 130,
    renderCell: renderCreatedAt,
  },

  // Actions
  // {
  //   field: "actions",
  //   headerName: "",
  //   width: 120,
  //   sortable: false,
  //   renderCell: (params) => renderActionButtons(params, handlers),
  // },
];
