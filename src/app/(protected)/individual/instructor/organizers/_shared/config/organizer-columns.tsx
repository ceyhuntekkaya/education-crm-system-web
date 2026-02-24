import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { formatDate } from "@/utils";
import type { EventOrganizerDto } from "@/types";
import { getOrganizerTypeBadgeVariant, getOrganizerTypeDisplay } from "../utils/organizer-helpers";

// Main column definitions
export const createOrganizerColumns = (): GridColDef<EventOrganizerDto>[] => [
  {
    field: "name",
    headerName: "Düzenleyen Adı",
    minWidth: 280,
    renderCell: (params: any) => (
      <div className="w-100">
        <div
          className="fw-semibold text-primary text-truncate mb-1"
          title={params.value || "Ad Yok"}
        >
          {params.value || "Ad Yok"}
        </div>
        {params.row.city && (
          <div className="text-muted text-xs">{params.row.city}</div>
        )}
      </div>
    ),
  },
  {
    field: "type",
    headerName: "Tür",
    width: 180,
    align: "center",
    renderCell: (params: any) => (
      <Badge variant={getOrganizerTypeBadgeVariant(params.value)} size="sm">
        {getOrganizerTypeDisplay(params.value)}
      </Badge>
    ),
  },
  {
    field: "eventCount",
    headerName: "Etkinlik Sayısı",
    width: 140,
    align: "center",
    renderCell: (params: any) => (
      <div className="d-flex align-items-center justify-content-center gap-2">
        <i className="ph ph-calendar text-primary"></i>
        <span className="fw-semibold">{params.value || 0}</span>
      </div>
    ),
  },
  {
    field: "isVerified",
    headerName: "Doğrulanmış",
    width: 140,
    align: "center",
    renderCell: (params: any) => (
      <Badge variant={params.value ? "success" : "secondary"} size="sm">
        {params.value ? "Doğrulandı" : "Doğrulanmadı"}
      </Badge>
    ),
  },
  {
    field: "isActive",
    headerName: "Durum",
    width: 120,
    align: "center",
    renderCell: (params: any) => (
      <Badge variant={params.value ? "success" : "danger"} size="sm">
        {params.value ? "Aktif" : "Pasif"}
      </Badge>
    ),
  },
  {
    field: "email",
    headerName: "E-posta",
    width: 200,
    renderCell: (params: any) => (
      <div className="text-sm text-truncate">{params.value || "-"}</div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Oluşturulma Tarihi",
    width: 180,
    renderCell: (params: any) => (
      <div className="text-sm">
        {params.value ? formatDate(params.value) : "-"}
      </div>
    ),
  },
];
