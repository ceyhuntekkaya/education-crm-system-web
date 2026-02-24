import React from "react";
import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import type { EventDto } from "@/types";
import {
  getEventTypeBadgeVariant,
  getEventTypeDisplay,
  getEventStatusBadgeVariant,
  getEventStatusDisplay,
  getDeliveryFormatDisplay,
} from "../utils/event-helpers";

function formatDateShort(date?: string | null): string {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const createTeacherEventColumns = (): GridColDef<EventDto>[] => [
  {
    field: "title",
    headerName: "Etkinlik",
    minWidth: 280,
    renderCell: (params: any) => (
      <div className="w-100">
        <div className="fw-semibold text-neutral-900 text-sm text-truncate">
          {params.value || "İsimsiz Etkinlik"}
        </div>
        {params.row.organizer?.name && (
          <div className="text-xs text-neutral-500 mt-2">
            {params.row.organizer.name}
          </div>
        )}
      </div>
    ),
  },
  {
    field: "eventType",
    headerName: "Tür",
    width: 150,
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
    renderCell: (params: any) => (
      <span className="text-sm text-neutral-600">
        {getDeliveryFormatDisplay(params.value)}
      </span>
    ),
  },
  {
    field: "startDateTime",
    headerName: "Başlangıç",
    width: 160,
    renderCell: (params: any) => (
      <span className="text-sm text-neutral-600">
        {formatDateShort(params.value)}
      </span>
    ),
  },
  {
    field: "registrationCount",
    headerName: "Kayıt",
    width: 120,
    renderCell: (params: any) => (
      <span className="text-sm text-neutral-600">
        {params.value ?? 0}
        {params.row.maxCapacity != null ? ` / ${params.row.maxCapacity}` : ""}
      </span>
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
];
