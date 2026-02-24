import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { formatDate } from "@/utils";
import type { ApplicationDto } from "../types";
import {
  getApplicationStatusBadgeVariant,
  getApplicationStatusDisplay,
  getApplicationStatusIcon,
} from "../utils";

/**
 * ================================================================================
 * APPLICATION COLUMNS
 * ================================================================================
 * Başvuru listesi için tablo kolonları
 */

export const createApplicationColumns = (): GridColDef<ApplicationDto>[] => [
  {
    field: "jobPosting",
    headerName: "Pozisyon & Okul",
    minWidth: 300,
    renderCell: (params: any) => (
      <div className="w-100">
        <div
          className="fw-semibold text-primary text-truncate mb-1"
          title={params.row.jobPosting?.positionTitle || "Pozisyon Yok"}
        >
          {params.row.jobPosting?.positionTitle || "Pozisyon Yok"}
        </div>
        <div className="d-flex align-items-center gap-2">
          <i className="ph ph-buildings text-muted text-xs"></i>
          <span className="text-muted text-xs">
            {params.row.jobPosting?.campus?.name || "Okul bilgisi yok"}
          </span>
        </div>
        {params.row.jobPosting?.branch && (
          <div className="d-flex align-items-center gap-2 mt-1">
            <i className="ph ph-briefcase text-muted text-xs"></i>
            <span className="text-muted text-xs">
              {params.row.jobPosting.branch}
            </span>
          </div>
        )}
      </div>
    ),
  },
  {
    field: "status",
    headerName: "Durum",
    width: 180,
    align: "center",
    renderCell: (params: any) => {
      const isWithdrawn = params.row.isWithdrawn;

      if (isWithdrawn) {
        return (
          <Badge variant="secondary" size="sm">
            <i className="ph ph-arrow-u-up-left me-1"></i>
            Geri Çekildi
          </Badge>
        );
      }

      return (
        <Badge
          variant={getApplicationStatusBadgeVariant(params.value)}
          size="sm"
        >
          <i className={`${getApplicationStatusIcon(params.value)} me-1`}></i>
          {getApplicationStatusDisplay(params.value)}
        </Badge>
      );
    },
  },
  {
    field: "jobPosting.employmentType",
    headerName: "İstihdam Tipi",
    width: 150,
    renderCell: (params: any) => (
      <div className="text-sm">
        {params.row.jobPosting?.employmentType || "-"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Başvuru Tarihi",
    width: 180,
    renderCell: (params: any) => (
      <div className="text-sm">
        {params.value ? formatDate(params.value) : "-"}
      </div>
    ),
  },
  {
    field: "updatedAt",
    headerName: "Son Güncelleme",
    width: 180,
    renderCell: (params: any) => (
      <div className="text-sm">
        {params.value ? formatDate(params.value) : "-"}
      </div>
    ),
  },
  {
    field: "documents",
    headerName: "Belgeler",
    width: 120,
    align: "center",
    renderCell: (params: any) => (
      <div className="d-flex align-items-center justify-content-center gap-2">
        <i className="ph ph-paperclip text-muted"></i>
        <span className="fw-semibold">{params.value?.length || 0}</span>
      </div>
    ),
  },
  {
    field: "notes",
    headerName: "Notlar",
    width: 100,
    align: "center",
    renderCell: (params: any) => (
      <div className="d-flex align-items-center justify-content-center gap-2">
        <i className="ph ph-note text-muted"></i>
        <span className="fw-semibold">{params.value?.length || 0}</span>
      </div>
    ),
  },
];
