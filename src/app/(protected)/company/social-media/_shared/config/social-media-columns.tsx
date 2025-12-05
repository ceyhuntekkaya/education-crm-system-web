import { CustomImage } from "@/components";
import { GridColDef } from "@/components/ui/data-grid";
import { PostDto } from "@/types/dto/content/PostDto";
import { formatDate, formatDateTime } from "@/utils";
import {
  getStatusBadgeVariant,
  getPostTypeDisplay,
  getPostStatusDisplay,
  formatEngagement,
  formatNumber,
  getPostMediaType,
  getTimeAgo,
} from "../utils";
import { Badge, Popover } from "@/components";

// Main column definitions
export const createSocialMediaColumns = (): GridColDef<PostDto>[] => [
  // Basic Information Columns
  {
    field: "featuredImageUrl",
    headerName: "",
    width: 70,
    sortable: false,
    renderCell: (params: any) => (
      <div className="d-flex align-items-center justify-content-center h-100">
        {params?.row?.featuredImageUrl ? (
          <CustomImage
            src={params.row.featuredImageUrl}
            alt={params?.row?.title || "Post Görseli"}
            width={44}
            height={32}
            className="rounded"
            style={{ objectFit: "cover", border: "1px solid #e5e7eb" }}
          />
        ) : (
          <div
            className="rounded d-flex align-items-center justify-content-center"
            style={{
              width: "44px",
              height: "32px",
              backgroundColor: "#9ca3af",
              color: "white",
            }}
          >
            <i className="ph ph-image" style={{ fontSize: "16px" }} />
          </div>
        )}
      </div>
    ),
  },
  {
    field: "title",
    headerName: "Başlık",
    width: 300,
    renderCell: (params: any) => (
      <div className="fw-semibold text-truncate" title={params.row.title}>
        {params.row.title || "-"}
      </div>
    ),
  },
  // {
  //   field: "school",
  //   headerName: "Kurum",
  //   width: 300,
  //   renderCell: (params: any) => (
  //     <div className="text-truncate" title={params.row.school?.name}>
  //       {params.row.school?.name || "-"}
  //     </div>
  //   ),
  // },
  {
    field: "postType",
    headerName: "Tür",
    width: 100,
    renderCell: (params: any) => (
      <div
        className="text-truncate fw-medium"
        title={getPostTypeDisplay(params.row.postType)}
      >
        {getPostTypeDisplay(params.row.postType)}
      </div>
    ),
  },
  {
    field: "status",
    headerName: "Durum",
    width: 120,
    align: "center",
    renderCell: (params: any) => (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Badge variant={getStatusBadgeVariant(params.row.status)}>
          {getPostStatusDisplay(params.row.status)}
        </Badge>
      </div>
    ),
  },

  {
    field: "author",
    headerName: "Yazar",
    width: 140,
    renderCell: (params: any) => (
      <div className="text-truncate" title={params.row.author?.fullName}>
        {params.row.author?.fullName || "-"}
      </div>
    ),
  },

  // Media & Engagement Columns
  {
    field: "mediaType",
    headerName: "Medya",
    width: 100,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        <span className="fw-medium">{getPostMediaType(params.row)}</span>
      </div>
    ),
  },
  {
    field: "likeCount",
    headerName: "Beğeni",
    width: 120,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        <span className="fw-semibold text-success">
          {formatNumber(params.row.likeCount || 0)}
        </span>
      </div>
    ),
  },
  {
    field: "viewCount",
    headerName: "Görüntüleme",
    width: 180,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        <span className="fw-semibold text-primary">
          {formatNumber(params.row.viewCount || 0)}
        </span>
      </div>
    ),
  },
  {
    field: "shareCount",
    headerName: "Paylaşım",
    width: 150,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        <span className="fw-semibold text-info">
          {formatNumber(params.row.shareCount || 0)}
        </span>
      </div>
    ),
  },
  {
    field: "engagementScore",
    headerName: "Etkileşim",
    width: 140,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        <span className="fw-semibold text-warning">
          {formatEngagement(params.row.engagementScore || 0)}
        </span>
      </div>
    ),
  },

  // Additional Info Columns
  {
    field: "flags",
    headerName: "Etiketler",
    width: 150,
    renderCell: (params: any) => (
      <div className="d-flex justify-content-center gap-1">
        {params.row.isFeatured && (
          <Popover
            content="Bu gönderi öne çıkarılmıştır"
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="cursor-pointer">
              <i
                className="ph-fill ph-star text-warning"
                style={{ fontSize: "14px" }}
              />
            </div>
          </Popover>
        )}
        {params.row.isPinned && (
          <Popover
            content="Bu gönderi sabitlenmiştir"
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="cursor-pointer">
              <i
                className="ph-fill ph-push-pin text-info"
                style={{ fontSize: "14px" }}
              />
            </div>
          </Popover>
        )}
        {params.row.isModerated && (
          <Popover
            content="Bu gönderi moderatör onayından geçmiştir"
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="cursor-pointer">
              <i
                className="ph ph-shield-check text-success"
                style={{ fontSize: "14px" }}
              />
            </div>
          </Popover>
        )}
        {params.row.isFlagged && (
          <Popover
            content="Bu gönderi rapor edilmiş veya bayraklanmıştır"
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="cursor-pointer">
              <i
                className="ph ph-flag text-danger"
                style={{ fontSize: "14px" }}
              />
            </div>
          </Popover>
        )}
        {!params.row.isFeatured &&
          !params.row.isPinned &&
          !params.row.isModerated &&
          !params.row.isFlagged && <span className="text-muted">-</span>}
      </div>
    ),
  },
  {
    field: "publishedAt",
    headerName: "Yayın Tarihi",
    width: 180,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        {params.row.publishedAt ? (
          <div className="fw-semibold" style={{ fontSize: "0.85rem" }}>
            {formatDateTime(params.row.publishedAt)}
          </div>
        ) : (
          <span className="text-muted">-</span>
        )}
      </div>
    ),
  },
  {
    field: "timeAgo",
    headerName: "Geçen Süre",
    width: 160,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        {params.row.publishedAt ? (
          <small className="text-muted" style={{ fontSize: "0.75rem" }}>
            {getTimeAgo(params.row.publishedAt)}
          </small>
        ) : (
          <span className="text-muted">-</span>
        )}
      </div>
    ),
  },
  //   {
  //     field: "actions",
  //     headerName: "",
  //     width: 120,
  //     sortable: false,
  //     renderCell: (params: any) => (
  //       <SocialMediaActionButtons
  //         post={params.row}
  //         onViewDetails={handlers.onViewDetails}
  //         onEdit={handlers.onEdit}
  //         onToggleStatus={handlers.onToggleStatus}
  //         onDelete={handlers.onDelete}
  //         onDuplicate={handlers.onDuplicate}
  //         onViewPost={handlers.onViewPost}
  //         onPin={handlers.onPin}
  //         onFeature={handlers.onFeature}
  //       />
  //     ),
  //   },
];
