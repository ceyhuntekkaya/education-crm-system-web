import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { formatDate } from "@/utils";
import type { SupplierDto } from "@/types";

// Main column definitions
export const createSupplierColumns = (): GridColDef<SupplierDto>[] => [
  {
    field: "companyName",
    headerName: "Firma Adı",
    minWidth: 250,
    renderCell: (params: any) => (
      <div className="w-100">
        <div
          className="fw-semibold text-primary text-truncate mb-1"
          title={params.value || "Firma Adı Yok"}
        >
          {params.value || "Firma Adı Yok"}
        </div>
        {params.row.taxNumber && (
          <div className="text-muted text-xs">VKN: {params.row.taxNumber}</div>
        )}
      </div>
    ),
  },
  {
    field: "email",
    headerName: "E-posta",
    minWidth: 200,
    renderCell: (params: any) => (
      <div className="text-sm text-neutral-700">{params.value || "-"}</div>
    ),
  },
  {
    field: "phone",
    headerName: "Telefon",
    width: 150,
    renderCell: (params: any) => (
      <div className="text-sm text-neutral-700">{params.value || "-"}</div>
    ),
  },
  {
    field: "isActive",
    headerName: "Durum",
    width: 120,
    align: "center",
    renderCell: (params: any) => (
      <Badge variant={params.value ? "success" : "secondary"} size="sm">
        {params.value ? "Aktif" : "Pasif"}
      </Badge>
    ),
  },
  {
    field: "averageRating",
    headerName: "Rating",
    width: 150,
    align: "center",
    renderCell: (params: any) => {
      const rating = params.value || 0;
      return (
        <div className="d-flex align-items-center gap-1 justify-content-center">
          <div
            className="d-flex align-items-center justify-content-center bg-warning-100 text-warning-700"
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "6px",
              flexShrink: 0,
            }}
          >
            <i className="ph-fill ph-star" style={{ fontSize: "14px" }}></i>
          </div>
          <span className="text-sm fw-medium text-neutral-900 ps-8">
            {rating.toFixed(1)}
          </span>
        </div>
      );
    },
  },
  {
    field: "address",
    headerName: "Adres",
    minWidth: 250,
    renderCell: (params: any) => {
      if (!params.value) return <span className="text-muted">-</span>;

      return (
        <div
          className="text-sm text-neutral-700 text-truncate"
          title={params.value}
        >
          {params.value}
        </div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Oluşturma Tarihi",
    width: 220,
    renderCell: (params) => {
      const createdAt = params.value as string | undefined;

      if (!createdAt) {
        return <span className="text-muted">-</span>;
      }

      const date = new Date(createdAt);
      const dateStr = formatDate(createdAt, "tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const timeStr = date.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return (
        <div>
          <div className="text-sm text-neutral-900">{dateStr}</div>
          <div className="text-xs text-neutral-500">{timeStr}</div>
        </div>
      );
    },
  },
];
