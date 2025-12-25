import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { formatDate, formatDateTime } from "@/utils";
import { OrderDto } from "../hooks/api";

/**
 * Sipariş durumuna göre badge variant döndürür
 */
const getOrderStatusBadgeVariant = (
  status?: string
): "success" | "warning" | "danger" | "info" | "secondary" => {
  switch (status?.toUpperCase()) {
    case "CONFIRMED":
      return "success";
    case "PREPARING":
      return "info";
    case "SHIPPED":
      return "info";
    case "DELIVERED":
      return "success";
    case "PENDING":
      return "warning";
    case "CANCELLED":
    case "RETURNED":
      return "danger";
    default:
      return "secondary";
  }
};

/**
 * Sipariş durumunu Türkçe'ye çevirir
 */
const getOrderStatusDisplay = (status?: string): string => {
  switch (status?.toUpperCase()) {
    case "PENDING":
      return "Beklemede";
    case "CONFIRMED":
      return "Onaylandı";
    case "PREPARING":
      return "Hazırlanıyor";
    case "SHIPPED":
      return "Kargoda";
    case "DELIVERED":
      return "Teslim Edildi";
    case "CANCELLED":
      return "İptal Edildi";
    case "RETURNED":
      return "İade Edildi";
    default:
      return status || "-";
  }
};

/**
 * Para birimi formatı
 */
const formatCurrency = (amount?: number, currency?: string): string => {
  if (!amount) return "-";

  const currencyMap: { [key: string]: string } = {
    TRY: "₺",
    USD: "$",
    EUR: "€",
    GBP: "£",
    SAR: "﷼",
    AED: "د.إ",
    QAR: "﷼",
    KWD: "د.ك",
    BHD: ".د.ب",
  };

  const symbol = currencyMap[currency || "TRY"] || currency || "₺";

  return `${new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)} ${symbol}`;
};

// Main column definitions
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
    field: "supplierCompanyName",
    headerName: "Tedarikçi",
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
