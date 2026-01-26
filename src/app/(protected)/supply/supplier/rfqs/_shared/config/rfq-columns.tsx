import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { formatDate } from "@/utils";
import type { RFQDto } from "@/types";
import {
  getRFQStatusBadgeVariant,
  getRFQStatusDisplay,
  getRFQTypeDisplay,
  getRFQTypeBadgeVariant,
} from "../utils";

// Main column definitions
export const createSupplierRFQColumns = (): GridColDef<RFQDto>[] => [
  {
    field: "title",
    headerName: "Başlık",
    minWidth: 300,
    renderCell: (params: any) => (
      <div className="w-100">
        <div
          className="fw-semibold text-primary text-truncate mb-1"
          title={params.value || "Başlık Yok"}
        >
          {params.value || "Başlık Yok"}
        </div>
        {params.row.id && (
          <div className="text-muted text-xs">#{params.row.id}</div>
        )}
      </div>
    ),
  },
  {
    field: "rfqType",
    headerName: "Tip",
    width: 120,
    align: "center",
    renderCell: (params: any) => (
      <Badge variant={getRFQTypeBadgeVariant(params.value)} size="sm">
        {getRFQTypeDisplay(params.value)}
      </Badge>
    ),
  },
  {
    field: "status",
    headerName: "Durum",
    width: 150,
    align: "center",
    renderCell: (params: any) => (
      <Badge variant={getRFQStatusBadgeVariant(params.value)} size="sm">
        {getRFQStatusDisplay(params.value)}
      </Badge>
    ),
  },
  {
    field: "itemCount",
    headerName: "Kalem Sayısı",
    width: 180,
    align: "center",
    renderCell: (params: any) => (
      <span className="badge bg-neutral-50 text-neutral-700">
        {params.value || 0} kalem
      </span>
    ),
  },
  {
    field: "submissionDeadline",
    headerName: "Son Başvuru",
    width: 180,
    align: "center",
    renderCell: (params: any) => {
      if (!params.value) return <span className="text-muted">-</span>;

      const deadline = new Date(params.value);
      const now = new Date();
      const isExpired = deadline < now;
      const daysLeft = Math.ceil(
        (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );

      return (
        <div className="d-flex flex-column align-items-center gap-4">
          <span className="text-sm fw-medium">
            {formatDate(params.value, "DD MMM YYYY")}
          </span>
          {isExpired ? (
            <span className="badge bg-danger-50 text-danger-700 text-xs">
              Süresi Doldu
            </span>
          ) : daysLeft <= 3 ? (
            <span className="badge bg-warning-50 text-warning-700 text-xs">
              {daysLeft} gün kaldı
            </span>
          ) : (
            <span className="badge bg-success-50 text-success-700 text-xs">
              {daysLeft} gün kaldı
            </span>
          )}
        </div>
      );
    },
  },
  {
    field: "expectedDeliveryDate",
    headerName: "Beklenen Teslimat",
    width: 180,
    align: "center",
    renderCell: (params: any) =>
      params.value ? (
        <span className="text-sm">
          {formatDate(params.value, "DD MMM YYYY")}
        </span>
      ) : (
        <span className="text-muted">-</span>
      ),
  },
  {
    field: "createdAt",
    headerName: "Oluşturulma",
    width: 180,
    align: "center",
    renderCell: (params: any) =>
      params.value ? (
        <span className="text-sm">
          {formatDate(params.value, "DD MMM YYYY HH:mm")}
        </span>
      ) : (
        <span className="text-muted">-</span>
      ),
  },
];
