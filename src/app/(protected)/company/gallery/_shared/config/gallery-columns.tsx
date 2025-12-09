import Image from "next/image";
import { GridColDef } from "@/components/ui/data-grid";
import { GalleryDto } from "@/types/dto/content/GalleryDto";
import { formatDate, formatDateTime } from "@/utils";
import {
  getStatusBadgeVariant,
  getGalleryTypeDisplay,
  getVisibilityDisplay,
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
    width: 220,
    renderCell: (params: any) => (
      <div className="fw-semibold text-truncate" title={params.row.title}>
        {params.row.title || "-"}
      </div>
    ),
  },
  {
    field: "description",
    headerName: "Açıklama",
    width: 200,
    renderCell: (params: any) => {
      const description = params.row.description;
      if (!description) return <span className="text-muted">-</span>;
      return (
        <div className="text-truncate text-muted" title={description}>
          {description}
        </div>
      );
    },
  },
  {
    field: "galleryType",
    headerName: "Tür",
    width: 140,
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
    width: 170,
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
    width: 130,
    align: "center",
    renderCell: (params: any) => (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Badge variant={getStatusBadgeVariant(params.row.isActive)}>
          {params.row.isActive ? "Aktif" : "Pasif"}
        </Badge>
      </div>
    ),
  },
  // Item Count Column
  {
    field: "itemCount",
    headerName: "Öğe Sayısı",
    width: 160,
    align: "center",
    renderCell: (params: any) => {
      const itemCount = params.row.itemCount || params.row.items?.length || 0;
      return (
        <div className="text-center">
          <span className="fw-semibold text-primary">{itemCount}</span>
        </div>
      );
    },
  },
  // Featured Column
  {
    field: "isFeatured",
    headerName: "Öne Çıkan",
    width: 150,
    align: "center",
    renderCell: (params: any) => (
      <div className="d-flex justify-content-center align-items-center h-100">
        {params.row.isFeatured ? (
          <Popover
            content="Bu galeri öne çıkarılmıştır"
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="cursor-pointer">
              <i
                className="ph-fill ph-star text-warning"
                style={{ fontSize: "18px" }}
              />
            </div>
          </Popover>
        ) : (
          <span className="text-muted">-</span>
        )}
      </div>
    ),
  },
  // Created At Column
  {
    field: "createdAt",
    headerName: "Oluşturulma",
    width: 200,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        <div className="fw-medium" style={{ fontSize: "0.85rem" }}>
          {formatDate(params.row.createdAt)}
        </div>
      </div>
    ),
  },
];
