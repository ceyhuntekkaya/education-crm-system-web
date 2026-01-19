import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { formatDate, formatDateTime } from "@/utils";
import { OrderDto } from "@/types/dto/supply";
import {
  getOrderStatusBadgeVariant,
  getOrderStatusDisplay,
  formatCurrency,
} from "../utils";

/**
 * Supplier Order Table Column Definitions
 */
export const createOrderColumns = (): GridColDef<OrderDto>[] => [
  {
    field: "orderNumber",
    headerName: "Sipariş No",
    width: 200,
    renderCell: (params: any) => (
      <div className="fw-semibold text-primary" title={params.value}>
        {params.value || "-"}
      </div>
    ),
  },
  {
    field: "companyName",
    headerName: "Şirket",
    width: 200,
    renderCell: (params: any) => (
      <div className="text-truncate" title={params.value}>
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
      const variant = getOrderStatusBadgeVariant(status);
      const display = getOrderStatusDisplay(status);

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
    headerName: "Toplam Tutar",
    width: 180,
    align: "right",
    renderCell: (params: any) => (
      <div className="fw-semibold text-success">
        {formatCurrency(params.value, params.row.currency)}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Sipariş Tarihi",
    width: 180,
    renderCell: (params: any) => (
      <div className="text-muted">
        {params.value ? formatDateTime(params.value) : "-"}
      </div>
    ),
  },
  {
    field: "expectedDeliveryDate",
    headerName: "Tahmini Teslimat",
    width: 200,
    renderCell: (params: any) => (
      <div className="text-muted">
        {params.value ? formatDate(params.value) : "-"}
      </div>
    ),
  },
  {
    field: "trackingNumber",
    headerName: "Takip No",
    width: 170,
    renderCell: (params: any) => (
      <div className="text-truncate" title={params.value}>
        {params.value ? (
          <span className="badge bg-secondary-subtle text-secondary">
            {params.value}
          </span>
        ) : (
          "-"
        )}
      </div>
    ),
  },
  {
    field: "invoiceNumber",
    headerName: "Fatura No",
    width: 150,
    renderCell: (params: any) => (
      <div className="text-truncate fw-medium" title={params.value}>
        {params.value || "-"}
      </div>
    ),
  },
];
