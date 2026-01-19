import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { formatDate } from "@/utils";
import type { ProductDto } from "@/types";

// Helper function for status badge
const getStatusBadgeVariant = (status?: string): "success" | "warning" | "danger" | "secondary" => {
  switch (status) {
    case "ACTIVE":
      return "success";
    case "PASSIVE":
      return "secondary";
    case "OUT_OF_STOCK":
      return "danger";
    case "DISCONTINUED":
      return "warning";
    default:
      return "secondary";
  }
};

const getStatusDisplay = (status?: string): string => {
  switch (status) {
    case "ACTIVE":
      return "Aktif";
    case "PASSIVE":
      return "Pasif";
    case "OUT_OF_STOCK":
      return "Stokta Yok";
    case "DISCONTINUED":
      return "Üretim Durduruldu";
    default:
      return "Bilinmiyor";
  }
};

// Main column definitions
export const createProductColumns = (): GridColDef<ProductDto>[] => [
  {
    field: "name",
    headerName: "Ürün Adı",
    minWidth: 300,
    renderCell: (params: any) => (
      <div className="w-100">
        <div
          className="fw-semibold text-primary text-truncate mb-1"
          title={params.value || "İsim Yok"}
        >
          {params.value || "İsim Yok"}
        </div>
        {params.row.sku && (
          <div className="text-muted text-xs">SKU: {params.row.sku}</div>
        )}
      </div>
    ),
  },
  {
    field: "categoryName",
    headerName: "Kategori",
    width: 180,
    renderCell: (params: any) => (
      <div className="d-flex align-items-center gap-2">
        <i
          className="ph ph-folder-open text-primary"
          style={{ fontSize: "16px" }}
        ></i>
        <span className="text-sm">{params.value || "Kategorisiz"}</span>
      </div>
    ),
  },
  {
    field: "status",
    headerName: "Durum",
    width: 150,
    align: "center",
    renderCell: (params: any) => (
      <Badge variant={getStatusBadgeVariant(params.value)} size="sm">
        {getStatusDisplay(params.value)}
      </Badge>
    ),
  },
  {
    field: "stockQuantity",
    headerName: "Stok Durumu",
    width: 200,
    align: "center",
    renderCell: (params: any) => {
      const stockQuantity = params.value || 0;
      return (
        <span className="badge bg-neutral-50 text-neutral-700">
          {stockQuantity} adet
        </span>
      );
    },
  },
  {
    field: "basePrice",
    headerName: "Fiyat",
    width: 150,
    align: "right",
    renderCell: (params: any) => {
      const product = params.row as ProductDto;
      return (
        <div className="text-end">
          <div className="fw-semibold text-neutral-900">
            {product.basePrice?.toFixed(2)} {product.currency || "TRY"}
          </div>
          {product.taxRate && (
            <div className="text-xs text-muted">
              KDV: %{product.taxRate}
            </div>
          )}
        </div>
      );
    },
  },
  {
    field: "minOrderQuantity",
    headerName: "Min. Sipariş",
    width: 120,
    align: "center",
    renderCell: (params: any) => (
      <span className="badge bg-neutral-50 text-neutral-700">
        {params.value || 1} adet
      </span>
    ),
  },
  {
    field: "deliveryDays",
    headerName: "Teslimat Süresi",
    width: 150,
    align: "center",
    renderCell: (params: any) => {
      const days = params.value || 0;
      return (
        <div className="d-flex align-items-center gap-1 justify-content-center">
          <i
            className="ph ph-truck text-info"
            style={{ fontSize: "16px" }}
          ></i>
          <span className="text-sm">{days} gün</span>
        </div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Oluşturma Tarihi",
    width: 180,
    renderCell: (params) => {
      const createdAt = params.value as string | undefined;

      if (!createdAt) {
        return <span className="text-muted">-</span>;
      }

      return (
        <div className="text-sm text-neutral-900">
          {formatDate(createdAt, "tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    field: "updatedAt",
    headerName: "Güncelleme Tarihi",
    width: 180,
    renderCell: (params) => {
      const updatedAt = params.value as string | undefined;

      if (!updatedAt) {
        return <span className="text-muted">-</span>;
      }

      return (
        <div className="text-sm text-neutral-900">
          {formatDate(updatedAt, "tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      );
    },
  },
];
