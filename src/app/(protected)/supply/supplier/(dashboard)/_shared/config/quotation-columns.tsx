import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { formatDate, formatDateTime } from "@/utils";
import { QuotationDto } from "@/types/dto/supply";
import {
  getQuotationStatusBadgeVariant,
  getQuotationStatusDisplay,
  formatCurrency,
} from "../utils";

/**
 * Supplier Quotation Table Column Definitions
 */
export const createQuotationColumns = (): GridColDef<QuotationDto>[] => [
  {
    field: "rfqTitle",
    headerName: "İlan Başlığı",
    minWidth: 250,
    renderCell: (params: any) => (
      <div
        className="fw-semibold text-primary text-truncate"
        title={params.value}
      >
        {params.value || "-"}
      </div>
    ),
  },
  {
    field: "status",
    headerName: "Durum",
    width: 140,
    align: "center",
    renderCell: (params: any) => {
      const status = params.value;
      const variant = getQuotationStatusBadgeVariant(status);
      const display = getQuotationStatusDisplay(status);

      return (
        <Badge variant={variant} size="sm">
          {display}
        </Badge>
      );
    },
  },
  {
    field: "itemCount",
    headerName: "Ürün",
    width: 120,
    align: "center",
    renderCell: (params: any) => (
      <div className="fw-medium">{params.value || 0}</div>
    ),
  },
  {
    field: "totalAmount",
    headerName: "Teklif Tutarı",
    width: 180,
    align: "right",
    renderCell: (params: any) => (
      <div className="fw-semibold text-success">
        {formatCurrency(params.value, params.row.currency)}
      </div>
    ),
  },
  {
    field: "validUntil",
    headerName: "Geçerlilik",
    width: 170,
    renderCell: (params: any) => (
      <div className="text-muted">
        {params.value ? formatDate(params.value) : "-"}
      </div>
    ),
  },
  {
    field: "deliveryDays",
    headerName: "Teslimat",
    width: 150,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-muted">
        {params.value ? `${params.value} gün` : "-"}
      </div>
    ),
  },
  {
    field: "paymentTerms",
    headerName: "Ödeme Koşulları",
    width: 200,
    renderCell: (params: any) => (
      <div className="text-truncate" title={params.value}>
        {params.value || "-"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Oluşturma",
    width: 170,
    renderCell: (params: any) => (
      <div className="text-muted">
        {params.value ? formatDateTime(params.value) : "-"}
      </div>
    ),
  },
];
