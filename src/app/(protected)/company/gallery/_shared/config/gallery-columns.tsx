import { GridColDef } from "@/components/ui/data-grid";
import { GalleryDto } from "@/types/dto/content/GalleryDto";
import { formatDate } from "@/utils";
import {
  getStatusBadgeVariant,
  getGalleryTypeDisplay,
  getVisibilityDisplay,
  formatFileSize,
  formatNumber,
} from "../utils";
import { GalleryColumnHandlers } from "../types";
import { GalleryActionButtons } from "../components/gallery-action-buttons";
import { Badge } from "@/components";

// Column render helper functions
const renderGalleryInfo = (params: any) => (
  <div className="d-flex align-items-center">
    <div className="me-3">
      <img
        src={params.row.coverImageUrl}
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

const renderGalleryType = (params: any) => (
  <div className="text-truncate">
    {getGalleryTypeDisplay(params.row.galleryType)}
  </div>
);

const renderVisibility = (params: any) => (
  <div className="text-truncate">
    {getVisibilityDisplay(params.row.visibility)}
  </div>
);

const renderStatus = (params: any) => (
  <div className="d-flex justify-content-center align-items-center h-100">
    <Badge variant={getStatusBadgeVariant(params.row.isActive)}>
      {params.row.isActive ? "Aktif" : "Pasif"}
    </Badge>
  </div>
);

const renderFeatured = (params: any) => (
  <div className="d-flex justify-content-center">
    {params.row.isFeatured ? (
      <i
        className="ph-fill ph-star text-warning"
        style={{ fontSize: "16px" }}
      />
    ) : (
      <span className="text-muted">-</span>
    )}
  </div>
);

const renderItemCount = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">{formatNumber(params.row.itemCount || 0)}</div>
    <small className="text-muted">öğe</small>
  </div>
);

const renderViewCount = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">{formatNumber(params.row.viewCount || 0)}</div>
    <small className="text-muted">görüntülenme</small>
  </div>
);

const renderDownloadCount = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">
      {formatNumber(params.row.downloadCount || 0)}
    </div>
    <small className="text-muted">indirme</small>
  </div>
);

const renderFileSize = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">
      {formatFileSize(params.row.totalSizeBytes || 0)}
    </div>
    <small className="text-muted">toplam boyut</small>
  </div>
);

const renderPermissions = (params: any) => (
  <div className="d-flex justify-content-center gap-1">
    {params.row.allowComments && (
      <div title="Yorum Yapılabilir">
        <i
          className="ph ph-chat-circle text-info"
          style={{ fontSize: "14px" }}
        />
      </div>
    )}
    {params.row.allowDownloads && (
      <div title="İndirilebilir">
        <i
          className="ph ph-download text-success"
          style={{ fontSize: "14px" }}
        />
      </div>
    )}
    {!params.row.allowComments && !params.row.allowDownloads && (
      <span className="text-muted">-</span>
    )}
  </div>
);

const renderCreatedAt = (params: any) => (
  <div className="text-center">
    <div className="fw-medium">{formatDate(params.row.createdAt)}</div>
  </div>
);

const renderActionButtons = (params: any, handlers: GalleryColumnHandlers) => (
  <GalleryActionButtons
    gallery={params.row}
    onViewDetails={handlers.onViewDetails}
    onEdit={handlers.onEdit}
    onToggleStatus={handlers.onToggleStatus}
    onDelete={handlers.onDelete}
    onDuplicate={handlers.onDuplicate}
    onViewGallery={handlers.onViewGallery}
  />
);

// Main column definitions
export const createGalleryColumns = (
  handlers: GalleryColumnHandlers
): GridColDef<GalleryDto>[] => [
  // Basic Information Columns
  {
    field: "title",
    headerName: "Galeri Bilgileri",
    width: 280,
    renderCell: renderGalleryInfo,
  },
  {
    field: "galleryType",
    headerName: "Tür",
    width: 140,
    renderCell: renderGalleryType,
  },
  {
    field: "visibility",
    headerName: "Görünürlük",
    width: 130,
    renderCell: renderVisibility,
  },
  {
    field: "isActive",
    headerName: "Durum",
    width: 100,
    renderCell: renderStatus,
  },

  // Statistics Columns
  {
    field: "itemCount",
    headerName: "Öğe Sayısı",
    width: 100,
    renderCell: renderItemCount,
  },
  {
    field: "viewCount",
    headerName: "Görüntülenme",
    width: 120,
    renderCell: renderViewCount,
  },
  {
    field: "downloadCount",
    headerName: "İndirme",
    width: 100,
    renderCell: renderDownloadCount,
  },

  // Additional Info Columns
  {
    field: "isFeatured",
    headerName: "Öne Çıkan",
    width: 90,
    renderCell: renderFeatured,
  },
  {
    field: "totalSizeBytes",
    headerName: "Boyut",
    width: 100,
    renderCell: renderFileSize,
  },
  //   {
  //     field: "permissions",
  //     headerName: "İzinler",
  //     width: 80,
  //     renderCell: renderPermissions,
  //   },
  {
    field: "createdAt",
    headerName: "Oluşturulma",
    width: 120,
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
