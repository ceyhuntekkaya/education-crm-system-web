import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { formatDate } from "@/utils";
import type { EventDto } from "@/types";
import {
  getEventTypeBadgeVariant,
  getEventTypeDisplay,
  getEventStatusBadgeVariant,
  getEventStatusDisplay,
  getDeliveryFormatDisplay,
  getDeliveryFormatIcon,
} from "../utils/event-helpers";

// Main column definitions
export const createEventColumns = (): GridColDef<EventDto>[] => [
  {
    field: "title",
    headerName: "Etkinlik Adı",
    minWidth: 280,
    renderCell: (params: any) => (
      <div className="w-100">
        <div
          className="fw-semibold text-primary text-truncate mb-1"
          title={params.value || "İsimsiz Etkinlik"}
        >
          {params.value || "İsimsiz Etkinlik"}
        </div>
        {params.row.organizer?.name && (
          <div className="text-muted text-xs">{params.row.organizer.name}</div>
        )}
      </div>
    ),
  },
  {
    field: "eventType",
    headerName: "Etkinlik Türü",
    width: 160,
    align: "center",
    renderCell: (params: any) => (
      <Badge variant={getEventTypeBadgeVariant(params.value)} size="sm">
        {getEventTypeDisplay(params.value)}
      </Badge>
    ),
  },
  {
    field: "deliveryFormat",
    headerName: "Format",
    width: 140,
    align: "center",
    renderCell: (params: any) => (
      <div className="d-flex align-items-center gap-2">
        <i className={`ph ${getDeliveryFormatIcon(params.value)}`}></i>
        <span className="text-sm">
          {getDeliveryFormatDisplay(params.value)}
        </span>
      </div>
    ),
  },
  {
    field: "status",
    headerName: "Durum",
    width: 130,
    align: "center",
    renderCell: (params: any) => (
      <Badge variant={getEventStatusBadgeVariant(params.value)} size="sm">
        {getEventStatusDisplay(params.value)}
      </Badge>
    ),
  },
  {
    field: "startDateTime",
    headerName: "Başlangıç Tarihi",
    width: 180,
    renderCell: (params: any) => (
      <div className="text-sm">
        {params.value ? formatDate(params.value) : "-"}
      </div>
    ),
  },
  {
    field: "registrationCount",
    headerName: "Kayıt Sayısı",
    width: 130,
    align: "center",
    renderCell: (params: any) => (
      <div className="d-flex align-items-center justify-content-center gap-2">
        <i className="ph ph-users text-primary"></i>
        <span className="fw-semibold">{params.value || 0}</span>
      </div>
    ),
  },
  {
    field: "maxCapacity",
    headerName: "Kontenjan",
    width: 120,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-sm">{params.value != null ? params.value : "∞"}</div>
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
