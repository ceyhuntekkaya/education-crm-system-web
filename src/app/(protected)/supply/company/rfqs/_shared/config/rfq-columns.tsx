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
export const createRFQColumns = (): GridColDef<RFQDto>[] => [
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
    field: "quotationCount",
    headerName: "Teklif Sayısı",
    width: 180,
    align: "center",
    renderCell: (params: any) => {
      const count = params.value || 0;
      return (
        <div className="d-flex align-items-center gap-1 justify-content-center">
          <div
            className="d-flex align-items-center justify-content-center bg-primary-100 text-primary-700"
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "6px",
              flexShrink: 0,
            }}
          >
            <i
              className="ph-bold ph-file-text"
              style={{ fontSize: "14px" }}
            ></i>
          </div>
          <span className="text-sm fw-medium text-neutral-900 ps-8">
            {count} teklif
          </span>
        </div>
      );
    },
  },
  {
    field: "invitationCount",
    headerName: "Davet Sayısı",
    width: 180,
    align: "center",
    renderCell: (params: any) => {
      const count = params.value || 0;
      const rfqId = params.row.id;

      return (
        <div
          className="d-flex align-items-center gap-1 justify-content-center"
          onClick={(e) => {
            if (count > 0) {
              e.stopPropagation();
              window.location.href = `/supply/company/rfqs/invited-suppliers/${rfqId}`;
            }
          }}
          style={{
            cursor: count > 0 ? "pointer" : "default",
            transition: "all 0.2s ease",
            padding: "4px 8px",
            borderRadius: "6px",
          }}
          onMouseEnter={(e) => {
            if (count > 0) {
              e.currentTarget.style.backgroundColor = "hsl(var(--info-50))";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center bg-info-100 text-info-700"
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "6px",
              flexShrink: 0,
            }}
          >
            <i className="ph-bold ph-users" style={{ fontSize: "14px" }}></i>
          </div>
          <span className="text-sm fw-medium text-neutral-900 ps-8">
            {count} davet
          </span>
        </div>
      );
    },
  },
  {
    field: "submissionDeadline",
    headerName: "Son Başvuru Tarihi",
    width: 200,
    renderCell: (params: any) => {
      if (!params.value) return <span className="text-muted">-</span>;

      const deadlineDate = new Date(params.value);
      const today = new Date();
      const isExpired = deadlineDate < today;
      const daysLeft = Math.ceil(
        (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      return (
        <div>
          <div className="text-sm mb-1">{formatDate(params.value)}</div>
          {!isExpired && daysLeft <= 7 && (
            <div className="text-xs text-warning">{daysLeft} gün kaldı</div>
          )}
          {isExpired && <div className="text-xs text-danger">Süresi doldu</div>}
        </div>
      );
    },
  },
  {
    field: "expectedDeliveryDate",
    headerName: "Beklenen Teslimat Tarihi",
    width: 270,
    renderCell: (params: any) => {
      if (!params.value) return <span className="text-muted">-</span>;

      return (
        <div className="text-sm text-neutral-900">
          {formatDate(params.value)}
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
