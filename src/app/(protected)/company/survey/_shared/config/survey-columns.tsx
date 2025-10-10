import { GridColDef } from "@/components/ui/data-grid";
import { SurveyDto } from "@/types/dto/survey/SurveyDto";
import { formatDate } from "@/utils";
import {
  getStatusBadgeVariant,
  getSurveyTypeDisplay,
  getTriggerEventDisplay,
  formatCompletionRate,
  formatNumber,
  getSurveyPerformanceLevel,
  getEstimatedDurationDisplay,
  getTimeAgo,
} from "../utils";
import { Badge } from "@/components";

// Column render helper functions
const renderSurveyInfo = (params: any) => (
  <div className="d-flex align-items-center">
    <div className="me-3">
      {params.row.logoUrl ? (
        <img
          src={params.row.logoUrl}
          alt={params.row.title}
          className="rounded"
          style={{
            width: "48px",
            height: "24px",
            objectFit: "cover",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/48x24?text=Survey";
          }}
        />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center bg-neutral-100 rounded"
          style={{
            width: "48px",
            height: "24px",
          }}
        >
          <i className="ph ph-clipboard-text text-neutral-400" />
        </div>
      )}
    </div>
    <div className="overflow-hidden">
      <div className="fw-medium text-truncate" title={params.row.title}>
        {params.row.title || "-"}
      </div>
      <small className="text-muted d-block">
        {params.row.questionCount || 0} soru •{" "}
        {getEstimatedDurationDisplay(params.row)}
      </small>
    </div>
  </div>
);

const renderSurveyType = (params: any) => (
  <div className="text-truncate">
    {getSurveyTypeDisplay(params.row.surveyType)}
  </div>
);

const renderTriggerEvent = (params: any) => (
  <div className="text-truncate">
    {getTriggerEventDisplay(params.row.triggerEvent)}
  </div>
);

const renderStatus = (params: any) => (
  <div className="d-flex justify-content-center align-items-center h-100">
    <Badge variant={getStatusBadgeVariant(params.row.isActive)}>
      {params.row.isActive ? "Aktif" : "Pasif"}
    </Badge>
  </div>
);

const renderSurveyFlags = (params: any) => (
  <div className="d-flex justify-content-center gap-1">
    {params.row.isMandatory && (
      <div title="Zorunlu Anket">
        <i
          className="ph-fill ph-warning text-warning"
          style={{ fontSize: "14px" }}
        />
      </div>
    )}
    {params.row.isAnonymous && (
      <div title="Anonim Anket">
        <i
          className="ph ph-mask-happy text-info"
          style={{ fontSize: "14px" }}
        />
      </div>
    )}
    {params.row.showResultsToPublic && (
      <div title="Sonuçlar Herkese Açık">
        <i className="ph ph-globe text-success" style={{ fontSize: "14px" }} />
      </div>
    )}
    {!params.row.isMandatory &&
      !params.row.isAnonymous &&
      !params.row.showResultsToPublic && <span className="text-muted">-</span>}
  </div>
);

const renderSentCount = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">{formatNumber(params.row.totalSent || 0)}</div>
    <small className="text-muted">gönderildi</small>
  </div>
);

const renderStartedCount = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">
      {formatNumber(params.row.totalStarted || 0)}
    </div>
    <small className="text-muted">başladı</small>
  </div>
);

const renderCompletedCount = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">
      {formatNumber(params.row.totalCompleted || 0)}
    </div>
    <small className="text-muted">tamamladı</small>
  </div>
);

const renderCompletionRate = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">
      {formatCompletionRate(params.row.completionRate || 0)}
    </div>
    <small className="text-muted">tamamlama</small>
  </div>
);

const renderAverageRating = (params: any) => (
  <div className="text-center">
    {params.row.averageRating ? (
      <>
        <div className="fw-medium d-flex align-items-center justify-content-center gap-1">
          <span>{params.row.averageRating.toFixed(1)}</span>
          <i
            className="ph-fill ph-star text-warning"
            style={{ fontSize: "12px" }}
          />
        </div>
        <small className="text-muted">ortalama</small>
      </>
    ) : (
      <div className="text-muted">-</div>
    )}
  </div>
);

const renderPerformance = (params: any) => {
  const performance = getSurveyPerformanceLevel(params.row.completionRate || 0);
  return (
    <div className="d-flex justify-content-center">
      <Badge variant={performance.variant} size="sm">
        {performance.level}
      </Badge>
    </div>
  );
};

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
export const createSurveyColumns = (): GridColDef<SurveyDto>[] => [
  // Basic Information Columns
  {
    field: "title",
    headerName: "Anket Bilgileri",
    width: 280,
    renderCell: renderSurveyInfo,
  },
  {
    field: "surveyType",
    headerName: "Tür",
    width: 200,
    renderCell: renderSurveyType,
  },
  {
    field: "triggerEvent",
    headerName: "Tetikleme",
    width: 230,
    renderCell: renderTriggerEvent,
  },
  {
    field: "isActive",
    headerName: "Durum",
    width: 120,
    renderCell: renderStatus,
  },

  // Statistics Columns
  {
    field: "totalSent",
    headerName: "Gönderildi",
    width: 170,
    renderCell: renderSentCount,
  },
  {
    field: "totalStarted",
    headerName: "Başladı",
    width: 140,
    renderCell: renderStartedCount,
  },
  {
    field: "totalCompleted",
    headerName: "Tamamladı",
    width: 170,
    renderCell: renderCompletedCount,
  },
  {
    field: "completionRate",
    headerName: "Tamamlama",
    width: 170,
    renderCell: renderCompletionRate,
  },

  // Additional Info Columns
  {
    field: "averageRating",
    headerName: "Değerlendirme",
    width: 170,
    renderCell: renderAverageRating,
  },
  {
    field: "performance",
    headerName: "Performans",
    width: 140,
    renderCell: renderPerformance,
  },
  {
    field: "flags",
    headerName: "Özellikler",
    width: 150,
    renderCell: renderSurveyFlags,
  },
  {
    field: "createdAt",
    headerName: "Oluşturulma",
    width: 180,
    renderCell: renderCreatedAt,
  },
  //   {
  //     field: "actions",
  //     headerName: "",
  //     width: 120,
  //     sortable: false,
  //     renderCell: (params) => renderActionButtons(params, handlers),
  //   },
];
