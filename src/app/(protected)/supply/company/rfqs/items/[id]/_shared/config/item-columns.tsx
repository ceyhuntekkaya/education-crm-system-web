import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import type { RFQItemDto } from "@/types";

// Main column definitions
export const createItemColumns = (): GridColDef<RFQItemDto>[] => [
  {
    field: "itemName",
    headerName: "Kalem Adı",
    minWidth: 250,
    renderCell: (params: any) => (
      <div className="w-100">
        <div
          className="fw-semibold text-dark mb-1"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={params.value || "Kalem Adı Yok"}
        >
          {params.value || "Kalem Adı Yok"}
        </div>
        {params.row.id && (
          <div className="text-muted" style={{ fontSize: "0.75rem" }}>
            #{params.row.id}
          </div>
        )}
      </div>
    ),
  },
  {
    field: "categoryName",
    headerName: "Kategori",
    width: 200,
    align: "center",
    headerAlign: "center",
    renderCell: (params: any) => (
      <Badge variant="info" size="sm">
        {params.value || "Kategorisiz"}
      </Badge>
    ),
  },
  {
    field: "quantity",
    headerName: "Miktar",
    width: 180,
    align: "center",
    headerAlign: "center",
    renderCell: (params: any) => (
      <div className="d-flex align-items-center justify-content-center gap-2">
        <span className="fw-bold text-dark" style={{ fontSize: "0.95rem" }}>
          {params.value || 0}
        </span>
        {params.row.unit && (
          <span className="text-muted" style={{ fontSize: "0.85rem" }}>
            {params.row.unit}
          </span>
        )}
      </div>
    ),
  },
  {
    field: "unit",
    headerName: "Birim",
    width: 140,
    align: "center",
    headerAlign: "center",
    renderCell: (params: any) => (
      <Badge variant="secondary" size="sm">
        {params.value || "-"}
      </Badge>
    ),
  },
  {
    field: "specifications",
    headerName: "Özellikler",
    minWidth: 300,
    renderCell: (params: any) => (
      <div
        className="text-muted"
        style={{
          fontSize: "0.875rem",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          lineHeight: "1.5",
        }}
        title={params.value || "Özellik belirtilmemiş"}
      >
        {params.value || "Özellik belirtilmemiş"}
      </div>
    ),
  },
];
