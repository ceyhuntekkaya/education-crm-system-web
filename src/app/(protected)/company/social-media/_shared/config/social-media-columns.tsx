import { GridColDef } from "@/components/ui/data-grid";
import { PostDto } from "@/types/dto/content/PostDto";
import { formatDate } from "@/utils";
import {
  getStatusBadgeVariant,
  getPostTypeDisplay,
  getPostStatusDisplay,
  formatEngagement,
  formatNumber,
  getPostMediaType,
  getTimeAgo,
} from "../utils";
import { SocialMediaColumnHandlers } from "../types";
import { SocialMediaActionButtons } from "../components/social-media-action-buttons";
import { Badge } from "@/components";

// Column render helper functions
const renderPostInfo = (params: any) => (
  <div className="d-flex align-items-center">
    <div className="me-3">
      <img
        src={params.row.featuredImageUrl}
        alt={params.row.title}
        className="rounded"
        style={{
          width: "48px",
          height: "36px",
          objectFit: "cover",
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/48x36?text=No+Image";
        }}
      />
    </div>
    <div className="overflow-hidden">
      <div className="fw-medium text-truncate" title={params.row.title}>
        {params.row.title || "-"}
      </div>
      {params.row.slug && (
        <small
          className="text-muted text-truncate d-block"
          title={params.row.slug}
        >
          {params.row.slug}
        </small>
      )}
    </div>
  </div>
);

const renderPostType = (params: any) => (
  <div className="text-truncate">{getPostTypeDisplay(params.row.postType)}</div>
);

const renderStatus = (params: any) => (
  <div className="d-flex justify-content-center align-items-center h-100">
    <Badge variant={getStatusBadgeVariant(params.row.status)}>
      {getPostStatusDisplay(params.row.status)}
    </Badge>
  </div>
);

const renderSchoolInfo = (params: any) => (
  <div className="text-truncate" title={params.row.school?.name}>
    {params.row.school?.name || "-"}
  </div>
);

const renderAuthorInfo = (params: any) => (
  <div className="text-truncate" title={params.row.author?.fullName}>
    {params.row.author?.fullName || "-"}
  </div>
);

const renderMediaType = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">{getPostMediaType(params.row)}</div>
  </div>
);

const renderEngagement = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">{formatNumber(params.row.likeCount || 0)}</div>
    <small className="text-muted">beğeni</small>
  </div>
);

const renderComments = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">
      {formatNumber(params.row.commentCount || 0)}
    </div>
    <small className="text-muted">yorum</small>
  </div>
);

const renderViews = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">{formatNumber(params.row.viewCount || 0)}</div>
    <small className="text-muted">görüntülenme</small>
  </div>
);

const renderShares = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">{formatNumber(params.row.shareCount || 0)}</div>
    <small className="text-muted">paylaşım</small>
  </div>
);

const renderEngagementScore = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">
      {formatEngagement(params.row.engagementScore || 0)}
    </div>
    <small className="text-muted">skor</small>
  </div>
);

const renderFlags = (params: any) => (
  <div className="d-flex justify-content-center gap-1">
    {params.row.isFeatured && (
      <div title="Öne Çıkan">
        <i
          className="ph-fill ph-star text-warning"
          style={{ fontSize: "14px" }}
        />
      </div>
    )}
    {params.row.isPinned && (
      <div title="Sabitlenmiş">
        <i
          className="ph-fill ph-push-pin text-info"
          style={{ fontSize: "14px" }}
        />
      </div>
    )}
    {params.row.isModerated && (
      <div title="Moderasyonlu">
        <i
          className="ph ph-shield-check text-success"
          style={{ fontSize: "14px" }}
        />
      </div>
    )}
    {params.row.isFlagged && (
      <div title="Bayraklanmış">
        <i className="ph ph-flag text-danger" style={{ fontSize: "14px" }} />
      </div>
    )}
    {!params.row.isFeatured &&
      !params.row.isPinned &&
      !params.row.isModerated &&
      !params.row.isFlagged && <span className="text-muted">-</span>}
  </div>
);

const renderPublishedAt = (params: any) => (
  <div className="text-center">
    {params.row.publishedAt ? (
      <>
        <div className="fw-medium">{formatDate(params.row.publishedAt)}</div>
        <small className="text-muted">
          {getTimeAgo(params.row.publishedAt)}
        </small>
      </>
    ) : (
      <div className="text-muted">-</div>
    )}
  </div>
);

const renderActionButtons = (
  params: any,
  handlers: SocialMediaColumnHandlers
) => (
  <SocialMediaActionButtons
    post={params.row}
    onViewDetails={handlers.onViewDetails}
    onEdit={handlers.onEdit}
    onToggleStatus={handlers.onToggleStatus}
    onDelete={handlers.onDelete}
    onDuplicate={handlers.onDuplicate}
    onViewPost={handlers.onViewPost}
    onPin={handlers.onPin}
    onFeature={handlers.onFeature}
  />
);

// Main column definitions
export const createSocialMediaColumns = (
  handlers: SocialMediaColumnHandlers
): GridColDef<PostDto>[] => [
  // Basic Information Columns
  {
    field: "title",
    headerName: "Gönderi Bilgileri",
    width: 280,
    renderCell: renderPostInfo,
  },
  {
    field: "postType",
    headerName: "Tür",
    width: 120,
    renderCell: renderPostType,
  },
  {
    field: "status",
    headerName: "Durum",
    width: 100,
    renderCell: renderStatus,
  },
  {
    field: "school",
    headerName: "Okul",
    width: 180,
    renderCell: renderSchoolInfo,
  },
  {
    field: "author",
    headerName: "Yazar",
    width: 140,
    renderCell: renderAuthorInfo,
  },

  // Media & Engagement Columns
  {
    field: "mediaType",
    headerName: "Medya",
    width: 100,
    renderCell: renderMediaType,
  },
  {
    field: "likeCount",
    headerName: "Beğeni",
    width: 90,
    renderCell: renderEngagement,
  },
  //   {
  //     field: "commentCount",
  //     headerName: "Yorum",
  //     width: 90,
  //     renderCell: renderComments,
  //   },
  {
    field: "viewCount",
    headerName: "Görüntülenme",
    width: 160,
    renderCell: renderViews,
  },
  {
    field: "shareCount",
    headerName: "Paylaşım",
    width: 120,
    renderCell: renderShares,
  },
  {
    field: "engagementScore",
    headerName: "Etkileşim",
    width: 90,
    renderCell: renderEngagementScore,
  },

  // Additional Info Columns
  {
    field: "flags",
    headerName: "Etiketler",
    width: 90,
    renderCell: renderFlags,
  },
  {
    field: "publishedAt",
    headerName: "Yayın Tarihi",
    width: 130,
    renderCell: renderPublishedAt,
  },
  //   {
  //     field: "actions",
  //     headerName: "",
  //     width: 120,
  //     sortable: false,
  //     renderCell: (params) => renderActionButtons(params, handlers),
  //   },
];
