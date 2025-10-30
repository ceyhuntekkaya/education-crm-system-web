import { GridColDef } from "@/components/ui/data-grid";
import { SurveyDto } from "@/types";
import { formatDateTime } from "../utils/format-date-time";

// Column render helper functions
const renderSurveyTitle = (params: any) => {
  const survey = params.row as SurveyDto;

  return (
    <div className="overflow-hidden">
      <div className="fw-semibold text-truncate" title={survey.title}>
        {survey.title || "-"}
      </div>
    </div>
  );
};

const renderSurveyDescription = (params: any) => {
  const survey = params.row as SurveyDto;

  return (
    <div className="overflow-hidden">
      {survey.description ? (
        <small
          className="text-muted text-truncate d-block"
          title={survey.description}
        >
          {survey.description}
        </small>
      ) : (
        <span className="text-muted">-</span>
      )}
    </div>
  );
};

const renderSurveyStatus = (params: any) => {
  const survey = params.row as SurveyDto;
  const isActive = survey.isActive;

  return (
    <div className="d-flex align-items-center">
      <span className={`badge ${isActive ? "bg-success" : "bg-secondary"}`}>
        {isActive ? "Aktif" : "Pasif"}
      </span>
    </div>
  );
};

const renderCreatedDate = (params: any) => {
  const survey = params.row as SurveyDto;

  return (
    <div className="text-muted">
      {survey.createdAt ? formatDateTime(survey.createdAt) : "-"}
    </div>
  );
};

const renderUpdatedDate = (params: any) => {
  const survey = params.row as SurveyDto;

  return (
    <div className="text-muted">
      {survey.updatedAt ? formatDateTime(survey.updatedAt) : "-"}
    </div>
  );
};

/**
 * Survey list için kolon tanımlarını oluşturur
 * @returns GridColDef array
 */
export const createSurveyColumns = (): GridColDef[] => [
  {
    field: "title",
    headerName: "Anket Başlığı",
    width: 300,
    minWidth: 200,
    renderCell: renderSurveyTitle,
    sortable: true,
  },
  {
    field: "description",
    headerName: "Açıklama",
    width: 300,
    minWidth: 200,
    renderCell: renderSurveyDescription,
    sortable: false,
  },
  {
    field: "isActive",
    headerName: "Durum",
    width: 100,
    renderCell: renderSurveyStatus,
    sortable: true,
  },
  {
    field: "createdAt",
    headerName: "Oluşturulma Tarihi",
    width: 180,
    renderCell: renderCreatedDate,
    sortable: true,
  },
  {
    field: "updatedAt",
    headerName: "Güncellenme Tarihi",
    width: 180,
    renderCell: renderUpdatedDate,
    sortable: true,
  },
];
