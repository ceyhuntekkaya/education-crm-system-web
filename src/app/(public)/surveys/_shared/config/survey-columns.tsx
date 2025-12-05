import { GridColDef } from "@/components/ui/data-grid";
import { SurveyResponseDto } from "@/types";
import { formatDateTime } from "../utils/format-date-time";

// Column render helper functions
const renderSurveyTitle = (params: any) => {
  const survey = params.row as SurveyResponseDto;

  return (
    <div className="overflow-hidden">
      <div className="fw-semibold text-truncate" title={survey.surveyTitle}>
        {survey.surveyTitle || "-"}
      </div>
    </div>
  );
};

const renderSchoolName = (params: any) => {
  const survey = params.row as SurveyResponseDto;

  return (
    <div className="overflow-hidden">
      {survey.schoolName ? (
        <small
          className="text-muted text-truncate d-block"
          title={survey.schoolName}
        >
          {survey.schoolName}
        </small>
      ) : (
        <span className="text-muted">-</span>
      )}
    </div>
  );
};

const renderSurveyStatus = (params: any) => {
  const survey = params.row as SurveyResponseDto;
  const status = survey.status;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "INVITED":
        return { class: "bg-warning", text: "Davet Edildi" };
      case "STARTED":
        return { class: "bg-info", text: "Başlatıldı" };
      case "IN_PROGRESS":
        return { class: "bg-primary", text: "Devam Ediyor" };
      case "COMPLETED":
        return { class: "bg-success", text: "Tamamlandı" };
      case "SUBMITTED":
        return { class: "bg-success", text: "Gönderildi" };
      case "EXPIRED":
        return { class: "bg-danger", text: "Süresi Doldu" };
      case "ABANDONED":
        return { class: "bg-secondary", text: "Terk Edildi" };
      default:
        return { class: "bg-secondary", text: status || "Bilinmiyor" };
    }
  };

  const badge = getStatusBadge(status || "");

  return (
    <div className="d-flex align-items-center">
      <span className={`badge ${badge.class}`}>{badge.text}</span>
    </div>
  );
};

const renderStartedDate = (params: any) => {
  const survey = params.row as SurveyResponseDto;

  return (
    <div className="text-muted">
      {survey.startedAt ? formatDateTime(survey.startedAt) : "-"}
    </div>
  );
};

const renderProgress = (params: any) => {
  const survey = params.row as SurveyResponseDto;
  const progress = survey.progressPercentage || 0;

  return (
    <div className="d-flex align-items-center">
      <div className="progress me-8" style={{ width: "60px", height: "8px" }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <small className="text-muted">{progress}%</small>
    </div>
  );
};

/**
 * Survey response list için kolon tanımlarını oluşturur
 * @returns GridColDef array
 */
export const createSurveyColumns = (): GridColDef[] => [
  {
    field: "surveyTitle",
    headerName: "Anket Başlığı",
    width: 300,
    minWidth: 200,
    renderCell: renderSurveyTitle,
    sortable: true,
  },
  {
    field: "schoolName",
    headerName: "Kurum",
    width: 250,
    minWidth: 200,
    renderCell: renderSchoolName,
    sortable: false,
  },
  {
    field: "status",
    headerName: "Durum",
    width: 150,
    renderCell: renderSurveyStatus,
    sortable: true,
  },
  {
    field: "progressPercentage",
    headerName: "İlerleme",
    width: 170,
    renderCell: renderProgress,
    sortable: true,
  },
  {
    field: "startedAt",
    headerName: "Başlangıç Tarihi",
    width: 180,
    renderCell: renderStartedDate,
    sortable: true,
  },
];
