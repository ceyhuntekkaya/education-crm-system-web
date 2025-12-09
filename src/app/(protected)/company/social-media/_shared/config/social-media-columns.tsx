import { CustomImage } from "@/components";
import { GridColDef } from "@/components/ui/data-grid";
import { PostDto } from "@/types/dto/content/PostDto";
import { formatDateTime } from "@/utils";
import {
  getStatusBadgeVariant,
  getPostTypeDisplay,
  getPostStatusDisplay,
  formatNumber,
  getTimeAgo,
} from "../utils";
import { Badge, Popover } from "@/components";

// Main column definitions
export const createSocialMediaColumns = (): GridColDef<PostDto>[] => [
  // Görsel
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
  // Başlık
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
  // Gönderi Tipi
  {
    field: "postType",
    headerName: "Tür",
    width: 130,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        <Badge variant="secondary" size="sm">
          {getPostTypeDisplay(params.row.postType)}
        </Badge>
      </div>
    ),
  },
  // Durum
  {
    field: "status",
    headerName: "Durum",
    width: 120,
    align: "center",
    renderCell: (params: any) => (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Badge variant={getStatusBadgeVariant(params.row.status)} size="sm">
          {getPostStatusDisplay(params.row.status)}
        </Badge>
      </div>
    ),
  },
  // Yazar
  {
    field: "authorName",
    headerName: "Yazar",
    width: 180,
    renderCell: (params: any) => (
      <div className="text-truncate" title={params.row.authorName}>
        {params.row.authorName || "-"}
      </div>
    ),
  },
  // Özellikler (Featured & Pinned)
  {
    field: "flags",
    headerName: "Özellikler",
    width: 150,
    align: "center",
    sortable: false,
    renderCell: (params: any) => (
      <div className="d-flex justify-content-center gap-2">
        {params.row.isFeatured && (
          <Popover
            content="Öne çıkan gönderi"
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="cursor-pointer">
              <i
                className="ph-fill ph-star text-warning"
                style={{ fontSize: "16px" }}
              />
            </div>
          </Popover>
        )}
        {params.row.isPinned && (
          <Popover
            content="Sabitlenmiş gönderi"
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="cursor-pointer">
              <i
                className="ph-fill ph-push-pin text-info"
                style={{ fontSize: "16px" }}
              />
            </div>
          </Popover>
        )}
        {!params.row.isFeatured && !params.row.isPinned && (
          <span className="text-muted" style={{ fontSize: "12px" }}>
            -
          </span>
        )}
      </div>
    ),
  },
  // İstatistikler (Beğeni, Yorum & Görüntüleme)
  {
    field: "stats",
    headerName: "İstatistikler",
    width: 160,
    align: "center",
    sortable: false,
    renderCell: (params: any) => (
      <div className="d-flex justify-content-center gap-2">
        {params.row.likeCount > 0 && (
          <Popover
            content={`${formatNumber(params.row.likeCount)} Beğeni`}
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="d-flex align-items-center gap-1 cursor-pointer">
              <i
                className="ph-fill ph-heart text-danger"
                style={{ fontSize: "15px" }}
              />
              <span
                className="fw-semibold text-danger"
                style={{ fontSize: "13px" }}
              >
                {formatNumber(params.row.likeCount)}
              </span>
            </div>
          </Popover>
        )}
        {params.row.commentCount > 0 && (
          <Popover
            content={`${formatNumber(params.row.commentCount)} Yorum`}
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="d-flex align-items-center gap-1 cursor-pointer">
              <i
                className="ph-fill ph-chat-circle text-primary"
                style={{ fontSize: "15px" }}
              />
              <span
                className="fw-semibold text-primary"
                style={{ fontSize: "13px" }}
              >
                {formatNumber(params.row.commentCount)}
              </span>
            </div>
          </Popover>
        )}
        {params.row.viewCount > 0 && (
          <Popover
            content={`${formatNumber(params.row.viewCount)} Görüntülenme`}
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="d-flex align-items-center gap-1 cursor-pointer">
              <i
                className="ph-fill ph-eye text-info"
                style={{ fontSize: "15px" }}
              />
              <span
                className="fw-semibold text-info"
                style={{ fontSize: "13px" }}
              >
                {formatNumber(params.row.viewCount)}
              </span>
            </div>
          </Popover>
        )}
        {params.row.likeCount === 0 &&
          params.row.commentCount === 0 &&
          params.row.viewCount === 0 && (
            <span className="text-muted" style={{ fontSize: "12px" }}>
              -
            </span>
          )}
      </div>
    ),
  },
  // Yayınlanma Tarihi
  {
    field: "publishedAt",
    headerName: "Yayın Tarihi",
    width: 180,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        {params.row.publishedAt ? (
          <div>
            <div className="fw-medium" style={{ fontSize: "0.85rem" }}>
              {formatDateTime(params.row.publishedAt)}
            </div>
            <small className="text-muted" style={{ fontSize: "0.7rem" }}>
              {getTimeAgo(params.row.publishedAt)}
            </small>
          </div>
        ) : (
          <span className="text-muted">-</span>
        )}
      </div>
    ),
  },
];
