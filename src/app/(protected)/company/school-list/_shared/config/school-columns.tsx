import { GridColDef } from "@/components/ui/data-grid";
import { SchoolSearchResultDto } from "@/types";
import { formatDate } from "@/utils";
import {
  getStatusBadgeVariant,
  getInstitutionTypeDisplay,
  formatDistance,
  formatRating,
} from "../utils";
import { SchoolColumnHandlers } from "../types";
import { SchoolActionButtons } from "../components/school-action-buttons";
import { Badge } from "@/components";

// Column render helper functions
const renderSchoolInfo = (params: any) => (
  <div className="d-flex align-items-center gap-3">
    {params.row.logoUrl && (
      <div className="flex-shrink-0">
        <img
          src={params.row.logoUrl}
          alt={params.row.name}
          className="rounded-circle"
          style={{ width: "40px", height: "40px", objectFit: "cover" }}
        />
      </div>
    )}
    <div className="overflow-hidden">
      <div className="fw-medium text-truncate" title={params.row.name}>
        {params.row.name || "-"}
      </div>
      {params.row.campusName && (
        <small
          className="text-muted text-truncate d-block"
          title={params.row.campusName}
        >
          {params.row.campusName}
        </small>
      )}
    </div>
  </div>
);

const renderInstitutionType = (params: any) => (
  <div className="d-flex align-items-center gap-2">
    {params.row.institutionTypeIcon && (
      <i
        className={`${params.row.institutionTypeIcon} text-sm`}
        style={{ color: params.row.institutionTypeColor || "#6B7280" }}
      />
    )}
    <span className="text-truncate">
      {getInstitutionTypeDisplay(params.row.institutionTypeName)}
    </span>
  </div>
);

const renderLocation = (params: any) => (
  <div>
    <div className="fw-medium">{params.row.district || "-"}</div>
    {params.row.city && (
      <small className="text-muted d-block">{params.row.city}</small>
    )}
    {params.row.distanceKm && (
      <small className="text-info d-block">
        {formatDistance(params.row.distanceKm)}
      </small>
    )}
  </div>
);

const renderAgeRange = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">{params.row.ageRange || "-"}</div>
    {params.row.minAge && params.row.maxAge && (
      <small className="text-muted d-block">
        {params.row.minAge}-{params.row.maxAge} yaş
      </small>
    )}
  </div>
);

const renderPricing = (params: any) => (
  <div>
    {params.row.formattedPrice && (
      <div className="fw-medium text-success">{params.row.formattedPrice}</div>
    )}
    <small className="text-muted d-block">Aylık</small>
  </div>
);

const renderRating = (params: any) => (
  <div className="text-center">
    {params.row.ratingAverage ? (
      <>
        <div className="fw-medium d-flex align-items-center justify-content-center gap-1">
          <i className="ph-fill ph-star text-warning text-sm" />
          <span>{params.row.ratingAverage.toFixed(1)}</span>
        </div>
        {params.row.ratingCount && (
          <small className="text-muted d-block">
            ({params.row.ratingCount} değerlendirme)
          </small>
        )}
      </>
    ) : (
      <div className="text-muted">-</div>
    )}
  </div>
);

const renderAppointmentStatus = (params: any) => (
  <div className="d-flex justify-content-center align-items-center h-100">
    <Badge
      variant={getStatusBadgeVariant(
        params.row.appointment?.isActiveAppointment
      )}
    >
      {params.row.appointment?.isActiveAppointment
        ? "Aktif Randevu"
        : "Randevu Yok"}
    </Badge>
  </div>
);

const renderCampaignStatus = (params: any) => (
  <div className="d-flex justify-content-center">
    {params.row.hasActiveCampaigns ? (
      <div className="d-flex align-items-center gap-1">
        <i className="ph-fill ph-megaphone text-success text-sm" />
        <span className="text-success text-sm fw-medium">
          {params.row.activeCampaigns?.length || 0} Kampanya
        </span>
      </div>
    ) : (
      <div className="text-muted text-sm">Kampanya Yok</div>
    )}
  </div>
);

const renderSubscriptionStatus = (params: any) => (
  <div className="d-flex justify-content-center gap-2">
    {/* {params.row.isSubscribed && (
      <i
        className="ph-fill ph-bell text-primary"
        style={{ fontSize: "16px" }}
        title="Abone"
      />
    )} */}
    {params.row.isFavorite && (
      <i
        className="ph-fill ph-heart text-danger"
        style={{ fontSize: "16px" }}
        title="Favori"
      />
    )}
    {!params.row.isFavorite && <span className="text-muted text-sm">-</span>}
  </div>
);

const renderHighlights = (params: any) => {
  const highlights = params.row.highlights || [];

  if (highlights.length === 0) {
    return <div className="text-muted">-</div>;
  }

  return (
    <div>
      {highlights.slice(0, 2).map((highlight: string, index: number) => (
        <small key={index} className="d-block text-truncate" title={highlight}>
          • {highlight}
        </small>
      ))}
      {highlights.length > 2 && (
        <small className="text-muted">+{highlights.length - 2} daha</small>
      )}
    </div>
  );
};

const renderActionButtons = (params: any, handlers: SchoolColumnHandlers) => (
  <SchoolActionButtons
    school={params.row}
    onViewDetails={handlers.onViewDetails}
    onEdit={handlers.onEdit}
    onToggleStatus={handlers.onToggleStatus}
    onDelete={handlers.onDelete}
    onDuplicate={handlers.onDuplicate}
    onViewAppointments={handlers.onViewAppointments}
  />
);

// Main column definitions
export const createSchoolColumns = (
  handlers: SchoolColumnHandlers
): GridColDef<SchoolSearchResultDto>[] => [
  // Basic Information Columns
  // {
  //   field: "subscriptionStatus",
  //   headerName: "Durum",
  //   width: 100,
  //   renderCell: renderSubscriptionStatus,
  // },
  {
    field: "name",
    headerName: "Okul Bilgileri",
    width: 300,
    renderCell: renderSchoolInfo,
  },
  {
    field: "institutionTypeName",
    headerName: "Tür",
    width: 150,
    renderCell: renderInstitutionType,
  },
  {
    field: "location",
    headerName: "Konum",
    width: 180,
    renderCell: renderLocation,
  },
  {
    field: "ageRange",
    headerName: "Yaş Aralığı",
    width: 120,
    renderCell: renderAgeRange,
  },

  // Pricing & Rating Columns
  {
    field: "monthlyFee",
    headerName: "Ücret",
    width: 120,
    renderCell: renderPricing,
  },
  {
    field: "rating",
    headerName: "Değerlendirme",
    width: 150,
    renderCell: renderRating,
  },

  // Status Columns
  {
    field: "appointmentStatus",
    headerName: "Randevu Durumu",
    width: 140,
    renderCell: renderAppointmentStatus,
  },
  {
    field: "campaignStatus",
    headerName: "Kampanyalar",
    width: 130,
    renderCell: renderCampaignStatus,
  },

  // Additional Info & Actions
  {
    field: "highlights",
    headerName: "Özellikler",
    width: 200,
    renderCell: renderHighlights,
  },
  // {
  //   field: "actions",
  //   headerName: "",
  //   width: 70,
  //   sortable: false,
  //   renderCell: (params) => renderActionButtons(params, handlers),
  // },
];
