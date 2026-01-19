import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { CustomImage } from "@/components/ui";
import { formatDate, formatCurrency } from "@/utils";
import {
  getProductStatusBadgeVariant,
  getProductStatusDisplay,
  getStockColorClass,
} from "../../../suppliers/_shared/utils";
import { ProductResultDto } from "../types";

// Main column definitions
export const createProductColumns = (): GridColDef<ProductResultDto>[] => [
  {
    field: "mainImageUrl",
    headerName: "Görsel",
    width: 120,
    align: "center",
    renderCell: (params: any) => {
      const imageUrl = params.value;
      return (
        <CustomImage
          src={imageUrl}
          alt={params.row.name || "Ürün"}
          width={48}
          height={48}
          variant="card"
        />
      );
    },
  },
  {
    field: "name",
    headerName: "Ürün Adı",
    minWidth: 300,
    renderCell: (params: any) => (
      <div>
        <div
          className="fw-semibold text-primary text-truncate mb-1"
          title={params.value}
        >
          {params.value || "-"}
        </div>
        {params.row.sku && (
          <div className="text-muted text-sm">SKU: {params.row.sku}</div>
        )}
      </div>
    ),
  },
  {
    field: "categoryName",
    headerName: "Kategori",
    width: 170,
    renderCell: (params: any) => (
      <div className="text-muted">{params.value || "-"}</div>
    ),
  },
  {
    field: "supplierName",
    headerName: "Tedarikçi",
    width: 200,
    renderCell: (params: any) => (
      <div className="fw-medium">{params.value || "-"}</div>
    ),
  },
  {
    field: "unitPrice",
    headerName: "Birim Fiyat",
    width: 140,
    align: "right",
    renderCell: (params: any) => {
      const price = params.value;
      return (
        <div className="fw-semibold text-success">
          {price !== undefined ? formatCurrency(price) : "-"}
        </div>
      );
    },
  },
  {
    field: "currentStock",
    headerName: "Stok",
    width: 120,
    align: "center",
    renderCell: (params: any) => {
      const currentStock = params.value;
      const minStockLevel = params.row.minStockLevel;
      const colorClass = getStockColorClass(currentStock, minStockLevel);

      return (
        <div className={`fw-medium ${colorClass}`}>
          {currentStock !== undefined ? currentStock : "-"}
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Durum",
    width: 150,
    align: "center",
    renderCell: (params: any) => {
      const status = params.value;
      const variant = getProductStatusBadgeVariant(status);
      const display = getProductStatusDisplay(status);

      return (
        <Badge variant={variant} size="sm">
          {display}
        </Badge>
      );
    },
  },
  {
    field: "deliveryDays",
    headerName: "Teslimat",
    width: 140,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-muted">
        {params.value ? `${params.value} gün` : "-"}
      </div>
    ),
  },
  {
    field: "updatedAt",
    headerName: "Güncelleme",
    width: 170,
    renderCell: (params: any) => (
      <div className="text-muted text-sm">
        {params.value ? formatDate(params.value) : "-"}
      </div>
    ),
  },
];
