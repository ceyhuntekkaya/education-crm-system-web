import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import type { QuotationItemDto } from "@/types";

// Main column definitions
export const createItemColumns = (): GridColDef<QuotationItemDto>[] => [
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
    field: "unitPrice",
    headerName: "Birim Fiyat",
    width: 150,
    align: "right",
    headerAlign: "center",
    renderCell: (params: any) => (
      <span className="fw-semibold text-success">
        {new Intl.NumberFormat("tr-TR", {
          style: "currency",
          currency: "TRY",
        }).format(params.value || 0)}
      </span>
    ),
  },
  {
    field: "totalPrice",
    headerName: "Toplam Fiyat",
    width: 180,
    align: "right",
    headerAlign: "center",
    renderCell: (params: any) => (
      <span className="fw-bold text-primary" style={{ fontSize: "0.95rem" }}>
        {new Intl.NumberFormat("tr-TR", {
          style: "currency",
          currency: "TRY",
        }).format(params.value || 0)}
      </span>
    ),
  },
  {
    field: "deliveryDays",
    headerName: "Teslimat",
    width: 140,
    align: "center",
    headerAlign: "center",
    renderCell: (params: any) => (
      <Badge variant="info" size="sm">
        {params.value ? `${params.value} gün` : "-"}
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
