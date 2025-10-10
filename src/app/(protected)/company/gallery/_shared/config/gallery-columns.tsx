import Image from "next/image";
import { GridColDef } from "@/components/ui/data-grid";
import { GalleryDto } from "@/types/dto/content/GalleryDto";
import { formatDate, formatDateTime } from "@/utils";
import {
  getStatusBadgeVariant,
  getGalleryTypeDisplay,
  getVisibilityDisplay,
  formatFileSize,
  formatNumber,
} from "../utils";
import { Badge, Popover } from "@/components";

// Main column definitions
export const createGalleryColumns = (): GridColDef<GalleryDto>[] => [
  // Image Column
  {
    field: "coverImageUrl",
    headerName: "",
    width: 70,
    sortable: false,
    renderCell: (params: any) => (
      <div className="d-flex align-items-center justify-content-center h-100">
        {params?.row?.coverImageUrl ? (
          <Image
            src={params.row.coverImageUrl}
            alt={params?.row?.title || "Galeri Görseli"}
            width={44}
            height={32}
            className="rounded"
            style={{ objectFit: "cover", border: "1px solid #e5e7eb" }}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              const parent = img.parentElement;

              // Eğer zaten bir fallback element varsa, yenisini ekleme
              if (parent?.querySelector(".fallback-icon")) {
                img.style.display = "none";
                return;
              }

              img.style.display = "none";
              const fallback = document.createElement("div");
              fallback.className =
                "rounded d-flex align-items-center justify-content-center fallback-icon";
              fallback.style.cssText = `width: 44px; height: 32px; background-color: #9ca3af; color: white;`;
              fallback.innerHTML =
                '<i class="ph ph-image" style="font-size: 16px;"></i>';
              parent?.appendChild(fallback);
            }}
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
  // Basic Information Columns
  {
    field: "title",
    headerName: "Başlık",
    width: 280,
    renderCell: (params: any) => (
      <div className="fw-semibold text-truncate" title={params.row.title}>
        {params.row.title || "-"}
      </div>
    ),
  },

  {
    field: "galleryType",
    headerName: "Tür",
    width: 180,
    renderCell: (params: any) => (
      <div
        className="text-truncate fw-medium"
        title={getGalleryTypeDisplay(params.row.galleryType)}
      >
        {getGalleryTypeDisplay(params.row.galleryType)}
      </div>
    ),
  },
  {
    field: "visibility",
    headerName: "Görünürlük",
    width: 220,
    renderCell: (params: any) => (
      <div
        className="text-truncate"
        title={getVisibilityDisplay(params.row.visibility)}
      >
        {getVisibilityDisplay(params.row.visibility)}
      </div>
    ),
  },
  {
    field: "isActive",
    headerName: "Durum",
    width: 120,
    align: "center",
    renderCell: (params: any) => (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Badge variant={getStatusBadgeVariant(params.row.isActive)}>
          {params.row.isActive ? "Aktif" : "Pasif"}
        </Badge>
      </div>
    ),
  },

  // Statistics Columns
  {
    field: "itemCount",
    headerName: "Öğe Sayısı",
    width: 160,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        <span className="fw-semibold text-primary">
          {formatNumber(params.row.itemCount || 0)}
        </span>
      </div>
    ),
  },
  {
    field: "viewCount",
    headerName: "Görüntülenme",
    width: 190,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        <span className="fw-semibold text-info">
          {formatNumber(params.row.viewCount || 0)}
        </span>
      </div>
    ),
  },
  {
    field: "downloadCount",
    headerName: "İndirme",
    width: 120,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        <span className="fw-semibold text-success">
          {formatNumber(params.row.downloadCount || 0)}
        </span>
      </div>
    ),
  },
  {
    field: "totalSizeBytes",
    headerName: "Boyut",
    width: 120,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        <span className="fw-semibold text-warning">
          {formatFileSize(params.row.totalSizeBytes || 0)}
        </span>
      </div>
    ),
  },

  // Additional Info Columns
  {
    field: "flags",
    headerName: "Özellikler",
    width: 150,
    renderCell: (params: any) => (
      <div className="d-flex justify-content-center gap-4">
        {params.row.isFeatured && (
          <Popover
            content="Bu galeri öne çıkarılmıştır"
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
        {params.row.allowComments && (
          <Popover
            content="Yorum yapılabilir"
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="cursor-pointer">
              <i
                className="ph ph-chat-circle text-info"
                style={{ fontSize: "14px" }}
              />
            </div>
          </Popover>
        )}
        {params.row.allowDownloads && (
          <Popover
            content="İndirilebilir"
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="cursor-pointer">
              <i
                className="ph ph-download text-success"
                style={{ fontSize: "14px" }}
              />
            </div>
          </Popover>
        )}
        {!params.row.isFeatured &&
          !params.row.allowComments &&
          !params.row.allowDownloads && <span className="text-muted">-</span>}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Oluşturulma",
    width: 180,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        <div className="fw-semibold" style={{ fontSize: "0.85rem" }}>
          {formatDateTime(params.row.createdAt)}
        </div>
      </div>
    ),
  },
];
