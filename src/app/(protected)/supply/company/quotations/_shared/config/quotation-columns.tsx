import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { formatDate } from "@/utils";
import type { QuotationDto } from "@/types";
import {
  getQuotationStatusBadgeVariant,
  getQuotationStatusDisplay,
  getCurrencySymbol,
} from "../utils";

// Main column definitions
export const createQuotationColumns = (): GridColDef<QuotationDto>[] => [
  {
    field: "rfqTitle",
    headerName: "Teklif Başlığı",
    minWidth: 300,
    renderCell: (params: any) => (
      <div className="w-100">
        <div
          className="fw-semibold text-primary text-truncate mb-1"
          title={params.value || "Başlık Yok"}
        >
          {params.value || "Başlık Yok"}
        </div>
        {params.row.rfqId && (
          <div className="text-muted text-xs">#{params.row.rfqId}</div>
        )}
      </div>
    ),
  },
  {
    field: "supplierCompanyName",
    headerName: "Tedarikçi",
    minWidth: 220,
    renderCell: (params) => {
      const supplierCompanyName = params.value as string | undefined;
      const averageRating = params.row.averageRating as number | undefined;

      return (
        <div className="w-100">
          <div
            className="text-neutral-900 fw-medium mb-1 text-truncate"
            title={supplierCompanyName}
          >
            {supplierCompanyName || "Tedarikçi Yok"}
          </div>
          {averageRating !== undefined && averageRating !== null && (
            <div className="d-flex align-items-center gap-1">
              <i
                className="ph-fill ph-star text-warning"
                style={{ fontSize: "14px" }}
              ></i>
              <span className="text-xs text-neutral-600">
                {averageRating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Durum",
    width: 150,
    align: "center",
    renderCell: (params: any) => (
      <Badge variant={getQuotationStatusBadgeVariant(params.value)} size="sm">
        {getQuotationStatusDisplay(params.value)}
      </Badge>
    ),
  },
  {
    field: "totalAmount",
    headerName: "Toplam Tutar",
    width: 200,
    align: "right",
    renderCell: (params: any) => {
      const amount = params.value;
      const currency = params.row.currency;
      if (amount === undefined || amount === null) {
        return <span className="text-muted">-</span>;
      }
      const symbol = getCurrencySymbol(currency);
      return (
        <div className="fw-semibold text-success">
          {amount.toLocaleString("tr-TR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          {symbol}
        </div>
      );
    },
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
    field: "deliveryDays",
    headerName: "Teslimat Süresi",
    width: 200,
    align: "center",
    renderCell: (params) => {
      const deliveryDays = params.value as number | undefined;

      if (!deliveryDays) {
        return <span className="text-muted">-</span>;
      }

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
            <i className="ph-bold ph-truck" style={{ fontSize: "14px" }}></i>
          </div>
          <span className="text-sm fw-medium text-neutral-900 ps-8">
            {deliveryDays} gün
          </span>
        </div>
      );
    },
  },
  {
    field: "validUntil",
    headerName: "Geçerlilik Tarihi",
    width: 200,
    renderCell: (params: any) => {
      if (!params.value) return <span className="text-muted">-</span>;

      const validDate = new Date(params.value);
      const today = new Date();
      const isExpired = validDate < today;
      const daysLeft = Math.ceil(
        (validDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
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
  // {
  //   field: "versionNumber",
  //   headerName: "Versiyon",
  //   width: 100,
  //   align: "center",
  //   renderCell: (params: any) => (
  //     <span className="badge bg-neutral-100 text-neutral-700">
  //       v{params.value || 1}
  //     </span>
  //   ),
  // },
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
