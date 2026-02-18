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
 * İş ilanına yapılan başvurular için tablo kolonları
 */

export const createApplicationColumns = (): GridColDef<ApplicationDto>[] => [
  {
    field: "teacher",
    headerName: "Aday Bilgileri",
    minWidth: 300,
    renderCell: (params: any) => {
      const teacher = params.row.teacher;
      return (
        <div className="w-100">
          <div
            className="fw-semibold text-primary text-truncate mb-1"
            title={teacher?.fullName || "Aday Yok"}
          >
            {teacher?.fullName || "Aday Yok"}
          </div>
          <div className="d-flex align-items-center gap-2">
            <i className="ph ph-envelope text-muted text-xs"></i>
            <span className="text-muted text-xs">
              {teacher?.email || "Email bilgisi yok"}
            </span>
          </div>
          {teacher?.branch && (
            <div className="d-flex align-items-center gap-2 mt-1">
              <i className="ph ph-briefcase text-muted text-xs"></i>
              <span className="text-muted text-xs">{teacher.branch}</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Durum",
    minWidth: 180,
    renderCell: (params: any) => {
      const status = params.row.status || "";
      const isWithdrawn = params.row.isWithdrawn;

      if (isWithdrawn) {
        return (
          <Badge variant="secondary" size="sm">
            <i className="ph ph-x-circle me-1"></i>
            Geri Çekildi
          </Badge>
        );
      }

      return (
        <Badge variant={getApplicationStatusBadgeVariant(status)} size="sm">
          <i className={`${getApplicationStatusIcon(status)} me-1`}></i>
          {getApplicationStatusDisplay(status)}
        </Badge>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Başvuru Tarihi",
    minWidth: 140,
    renderCell: (params: any) => (
      <span className="text-muted">
        {formatDate(params.row.createdAt, "DD.MM.YYYY")}
      </span>
    ),
  },
  {
    field: "coverLetter",
    headerName: "Ön Yazı",
    minWidth: 120,
    renderCell: (params: any) => {
      const hasCoverLetter = params.row.coverLetter?.trim();
      return (
        <span className={hasCoverLetter ? "text-success" : "text-muted"}>
          {hasCoverLetter ? (
            <>
              <i className="ph ph-check-circle me-1"></i>
              Var
            </>
          ) : (
            <>
              <i className="ph ph-minus-circle me-1"></i>
              Yok
            </>
          )}
        </span>
      );
    },
  },
  {
    field: "documents",
    headerName: "Belgeler",
    minWidth: 100,
    renderCell: (params: any) => {
      const docCount = params.row.documents?.length || 0;
      return (
        <span className={docCount > 0 ? "text-primary" : "text-muted"}>
          <i className="ph ph-file me-1"></i>
          {docCount}
        </span>
      );
    },
  },
];
