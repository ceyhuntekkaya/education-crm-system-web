import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { SurveyResponseDto } from "@/types";

// Status badge variant helper
const getStatusVariant = (
  status?: string
): "success" | "warning" | "danger" | "info" | "secondary" => {
  if (!status) return "secondary";

  switch (status.toUpperCase()) {
    case "SUBMITTED":
    case "COMPLETED":
      return "success";
    case "IN_PROGRESS":
    case "STARTED":
      return "warning";
    case "EXPIRED":
    case "CANCELLED":
      return "danger";
    case "PENDING":
    case "INVITED":
      return "info";
    default:
      return "secondary";
  }
};

// Status Turkish translation helper
const getStatusDisplayName = (status?: string): string => {
  if (!status) return "-";

  switch (status.toUpperCase()) {
    case "INVITED":
      return "Davet Edildi";
    case "STARTED":
      return "Başlatıldı";
    case "IN_PROGRESS":
      return "Devam Ediyor";
    case "COMPLETED":
      return "Tamamlandı";
    case "SUBMITTED":
      return "Gönderildi";
    case "EXPIRED":
      return "Süresi Doldu";
    case "ABANDONED":
      return "Terk Edildi";
    case "DELETED":
      return "Silindi";
    default:
      return status;
  }
};

// Date formatting helper
const formatDateTime = (dateString?: string): string => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Rating render helper
const renderRatingCell = (rating?: number | null) => {
  if (!rating) return "-";
  return (
    <div className="d-flex align-items-center justify-content-center gap-8">
      <span className="fw-medium pt-2">{rating.toFixed(1)}</span>
      <i className="ph-fill ph-star text-warning" />
    </div>
  );
};

// Boolean render helper
const renderBooleanCell = (value?: boolean | null) => {
  if (value === null || value === undefined)
    return <div className="d-flex justify-content-center">-</div>;
  return (
    <div className="d-flex justify-content-center">
      <Badge variant={value ? "success" : "danger"}>
        {value ? "Evet" : "Hayır"}
      </Badge>
    </div>
  );
};

// Main column definitions
export const createSurveyColumns = (): GridColDef<SurveyResponseDto>[] => [
  {
    field: "surveyTitle",
    headerName: "Anket Adı",
    width: 280,
    renderCell: (params) => params.row.surveyTitle || "-",
  },
  {
    field: "respondentName",
    headerName: "Katılımcı Adı",
    width: 180,
    renderCell: (params) => params.row.respondentName || "-",
  },
  {
    field: "respondentEmail",
    headerName: "E-posta",
    width: 250,
    renderCell: (params) => params.row.respondentEmail || "-",
  },
  {
    field: "status",
    headerName: "Durum",
    width: 150,
    renderCell: (params) => (
      <Badge variant={getStatusVariant(params.row.status)}>
        {getStatusDisplayName(params.row.status)}
      </Badge>
    ),
  },
  {
    field: "appointmentId",
    headerName: "Randevu ID",
    width: 130,
    align: "center",
    renderCell: (params) => (
      <div className="d-flex justify-content-center">
        {params.row.appointmentId || "-"}
      </div>
    ),
  },
  {
    field: "overallRating",
    headerName: "Genel Puan",
    width: 200,
    align: "center",
    renderCell: (params) => renderRatingCell(params.row.overallRating),
  },
  {
    field: "staffRating",
    headerName: "Personel Puanı",
    width: 200,
    align: "center",
    renderCell: (params) => renderRatingCell(params.row.staffRating),
  },
  {
    field: "communicationRating",
    headerName: "İletişim Puanı",
    width: 200,
    align: "center",
    renderCell: (params) => renderRatingCell(params.row.communicationRating),
  },
  {
    field: "wouldRecommend",
    headerName: "Tavsiye Eder",
    width: 200,
    align: "center",
    renderCell: (params) => renderBooleanCell(params.row.wouldRecommend),
  },
  {
    field: "likelihoodToEnroll",
    headerName: "Kayıt Olasılığı",
    width: 200,
    align: "center",
    renderCell: (params) => (
      <div className="d-flex justify-content-center">
        {params.row.likelihoodToEnroll
          ? `%${params.row.likelihoodToEnroll}`
          : "-"}
      </div>
    ),
  },
  {
    field: "formattedCompletionTime",
    headerName: "Tamamlama Süresi",
    width: 200,
    align: "center",
    renderCell: (params) => (
      <div className="d-flex justify-content-center">
        {params.row.formattedCompletionTime || "-"}
      </div>
    ),
  },
  {
    field: "generalFeedback",
    headerName: "Genel Geri Bildirim",
    width: 280,
    renderCell: (params) => {
      const feedback = params.row.generalFeedback;
      if (!feedback) return "-";
      const truncated =
        feedback.length > 60 ? `${feedback.substring(0, 60)}...` : feedback;
      return <span title={feedback}>{truncated}</span>;
    },
  },
  {
    field: "suggestions",
    headerName: "Öneriler",
    width: 250,
    renderCell: (params) => {
      const suggestions = params.row.suggestions;
      if (!suggestions) return "-";
      const truncated =
        suggestions.length > 50
          ? `${suggestions.substring(0, 50)}...`
          : suggestions;
      return <span title={suggestions}>{truncated}</span>;
    },
  },
  {
    field: "complaints",
    headerName: "Şikayetler",
    width: 250,
    renderCell: (params) => {
      const complaints = params.row.complaints;
      if (!complaints) return "-";
      const truncated =
        complaints.length > 50
          ? `${complaints.substring(0, 50)}...`
          : complaints;
      return <span title={complaints}>{truncated}</span>;
    },
  },
  {
    field: "completedAt",
    headerName: "Tamamlama Tarihi",
    width: 220,
    renderCell: (params) => formatDateTime(params.row.completedAt),
  },
  {
    field: "createdAt",
    headerName: "Oluşturulma Tarihi",
    width: 220,
    renderCell: (params) => formatDateTime(params.row.createdAt),
  },
];
