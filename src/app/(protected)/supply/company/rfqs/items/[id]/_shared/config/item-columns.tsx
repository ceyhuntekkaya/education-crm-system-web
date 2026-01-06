import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import type { RFQItemDto } from "@/types";

// Main column definitions
export const createItemColumns = (): GridColDef<RFQItemDto>[] => [
  {
    field: "itemName",
    headerName: "Kalem Adı",
    minWidth: 300,
    renderCell: (params: any) => (
      <div className="w-100">
        <div
          className="fw-semibold text-primary text-truncate mb-1"
          title={params.value || "Kalem Adı Yok"}
        >
          {params.value || "Kalem Adı Yok"}
        </div>
        {params.row.id && (
          <div className="text-muted text-xs">#{params.row.id}</div>
        )}
      </div>
    ),
  },
  {
    field: "categoryName",
    headerName: "Kategori",
    width: 180,
    align: "center",
    renderCell: (params: any) => (
      <Badge variant="secondary" size="sm">
        {params.value || "Kategorisiz"}
      </Badge>
    ),
  },
  {
    field: "quantity",
    headerName: "Miktar",
    width: 150,
    align: "center",
    renderCell: (params: any) => (
      <div className="d-flex align-items-center gap-1 justify-content-center">
        <span className="text-sm fw-semibold text-neutral-900">
          {params.value || 0}
        </span>
        {params.row.unit && (
          <span className="text-xs text-neutral-600">{params.row.unit}</span>
        )}
      </div>
    ),
  },
  {
    field: "unit",
    headerName: "Birim",
    width: 120,
    align: "center",
    renderCell: (params: any) => (
      <Badge variant="secondary" size="sm">
        {params.value || "Birim Yok"}
      </Badge>
    ),
  },
  {
    field: "specifications",
    headerName: "Özellikler",
    minWidth: 250,
    renderCell: (params: any) => (
      <div
        className="text-sm text-neutral-700 text-truncate"
        title={params.value || "Özellik belirtilmemiş"}
      >
        {params.value || "Özellik belirtilmemiş"}
      </div>
    ),
  },
];
