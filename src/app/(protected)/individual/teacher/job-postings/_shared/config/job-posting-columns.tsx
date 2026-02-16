import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { formatDate } from "@/utils";
import type { JobPostingDto } from "@/types";
import {
  getStatusBadgeVariant,
  getStatusDisplay,
  getEmploymentTypeDisplay,
} from "../utils";

// Main column definitions for teacher view
export const createJobPostingColumns = (): GridColDef<JobPostingDto>[] => [
  {
    field: "positionTitle",
    headerName: "Pozisyon",
    minWidth: 300,
    renderCell: (params: any) => (
      <div className="w-100">
        <div
          className="fw-semibold text-primary text-truncate mb-1"
          title={params.value || "Başlık Yok"}
        >
          {params.value || "Başlık Yok"}
        </div>
        {params.row.branch && (
          <div className="text-muted text-xs">Branş: {params.row.branch}</div>
        )}
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
    field: "employmentType",
    headerName: "İstihdam Tipi",
    width: 150,
    renderCell: (params: any) => (
      <div className="text-sm">{getEmploymentTypeDisplay(params.value)}</div>
    ),
  },
  {
    field: "applicationDeadline",
    headerName: "Son Başvuru Tarihi",
    width: 180,
    renderCell: (params: any) => (
      <div className="text-sm">
        {params.value ? formatDate(params.value) : "-"}
      </div>
    ),
  },
  {
    field: "requiredExperienceYears",
    headerName: "Tecrübe",
    width: 120,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-sm">
        {params.value ? `${params.value} yıl` : "-"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Yayınlanma Tarihi",
    width: 180,
    renderCell: (params: any) => (
      <div className="text-sm">
        {params.value ? formatDate(params.value) : "-"}
      </div>
    ),
  },
];
