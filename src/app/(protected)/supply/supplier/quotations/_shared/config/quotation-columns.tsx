import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { formatDate } from "@/utils";
import type { QuotationDto } from "@/types";
import {
  getStatusBadgeVariant,
  getStatusDisplay,
  formatCurrency,
} from "../utils";

// Main column definitions
export const createQuotationColumns = (): GridColDef<QuotationDto>[] => [
  {
    field: "rfqTitle",
    headerName: "İlan Başlığı",
    minWidth: 300,
    renderCell: (params: any) => (
      <div className="w-100">
        <div
          className="fw-semibold text-primary text-truncate mb-1"
          title={params.value || "Başlık Yok"}
        >
          {params.value || "Başlık Yok"}
        </div>
        {params.row.supplierCompanyName && (
          <div className="text-muted text-xs">
            Tedarikçi: {params.row.supplierCompanyName}
          </div>
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
    field: "totalAmount",
    headerName: "Toplam Tutar",
    width: 180,
    align: "right",
    renderCell: (params: any) => (
      <div className="fw-semibold text-success">
        {formatCurrency(params.row.totalAmount, params.row.currency)}
      </div>
    ),
  },
  {
    field: "itemCount",
    headerName: "Kalem Sayısı",
    width: 130,
    align: "center",
    renderCell: (params: any) => (
      <div className="d-flex align-items-center justify-content-center gap-2">
        <i className="ph ph-package text-primary"></i>
        <span>{params.value || 0}</span>
      </div>
    ),
  },
  {
    field: "deliveryDays",
    headerName: "Teslimat Süresi",
    width: 150,
    align: "center",
    renderCell: (params: any) => (
      <div className="d-flex align-items-center justify-content-center gap-2">
        <i className="ph ph-truck text-info"></i>
        <span>{params.value || 0} gün</span>
      </div>
    ),
  },
  {
    field: "validUntil",
    headerName: "Geçerlilik Tarihi",
    width: 160,
    renderCell: (params: any) => (
      <div className="text-sm">
        {params.value ? formatDate(params.value) : "-"}
      </div>
    ),
  },
  {
    field: "averageRating",
    headerName: "Değerlendirme",
    width: 150,
    align: "center",
    renderCell: (params: any) => {
      const rating = params.value || 0;
      return (
        <div className="d-flex align-items-center justify-content-center gap-2">
          <i className="ph-fill ph-star text-warning"></i>
          <span className="fw-semibold">{rating.toFixed(1)}</span>
        </div>
      );
    },
  },
  {
    field: "versionNumber",
    headerName: "Versiyon",
    width: 100,
    align: "center",
    renderCell: (params: any) => (
      <Badge variant="secondary" size="sm">
        v{params.value || 1}
      </Badge>
    ),
  },
  {
    field: "createdAt",
    headerName: "Oluşturulma Tarihi",
    width: 160,
    renderCell: (params: any) => (
      <div className="text-sm">
        {params.value ? formatDate(params.value) : "-"}
      </div>
    ),
  },
];
