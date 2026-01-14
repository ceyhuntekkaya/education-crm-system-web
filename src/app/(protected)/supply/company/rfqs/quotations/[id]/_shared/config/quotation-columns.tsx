import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { QuotationComparisonDto } from "@/types/dto/supply/quotation.dto";
import { formatCurrency, formatDate } from "@/utils";
import { getStatusColor, getStatusLabel } from "../utils";

// Main column definitions for DataGrid
export const createQuotationColumns =
  (): GridColDef<QuotationComparisonDto>[] => [
    {
      field: "quotationId",
      headerName: "Teklif No",
      width: 120,
      renderCell: (params: any) => (
        <div className="w-100">
          <div
            className="fw-semibold text-dark"
            style={{
              fontSize: "0.9rem",
            }}
          >
            #{params.value || "-"}
          </div>
        </div>
      ),
    },
    {
      field: "supplierCompanyName",
      headerName: "Tedarikçi",
      minWidth: 200,
      renderCell: (params: any) => (
        <div
          className="fw-medium text-dark"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={params.value || "Tedarikçi Yok"}
        >
          {params.value || "Tedarikçi Yok"}
        </div>
      ),
    },
    {
      field: "totalAmount",
      headerName: "Toplam Tutar",
      width: 160,
      align: "right",
      headerAlign: "right",
      renderCell: (params: any) => {
        const { totalAmount, currency } = params.row;
        if (!totalAmount || !currency) return "-";
        return (
          <div className="fw-bold text-dark" style={{ fontSize: "0.95rem" }}>
            {formatCurrency(totalAmount, currency)}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Durum",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
        const statusConfig = getStatusColor(params.value);
        return (
          <Badge variant={statusConfig.variant} size="sm">
            {getStatusLabel(params.value)}
          </Badge>
        );
      },
    },
    {
      field: "items",
      headerName: "Kalem Sayısı",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
        const itemsCount = params.value?.length || 0;
        return (
          <div className="d-flex align-items-center justify-content-center">
            <Badge variant="primary" size="sm">
              {itemsCount} Kalem
            </Badge>
          </div>
        );
      },
    },
    {
      field: "averageRating",
      headerName: "Değerlendirme",
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
        if (!params.value) return "-";
        return (
          <div className="d-flex align-items-center justify-content-center gap-1">
            <span style={{ fontSize: "1rem" }}>⭐</span>
            <span className="fw-semibold text-dark">
              {params.value.toFixed(1)}
            </span>
          </div>
        );
      },
    },
    {
      field: "deliveryDays",
      headerName: "Teslimat Süresi",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
        if (!params.value) return "-";
        return (
          <Badge variant="info" size="sm">
            {params.value} gün
          </Badge>
        );
      },
    },
    {
      field: "validUntil",
      headerName: "Geçerlilik Tarihi",
      width: 160,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
        if (!params.value) return "-";
        return (
          <div className="text-muted" style={{ fontSize: "0.875rem" }}>
            {formatDate(params.value)}
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Oluşturulma",
      width: 160,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
        if (!params.value) return "-";
        return (
          <div className="text-muted" style={{ fontSize: "0.875rem" }}>
            {formatDate(params.value)}
          </div>
        );
      },
    },
  ];

export const QUOTATION_STATUS_OPTIONS = [
  { value: "DRAFT", label: "Taslak" },
  { value: "SUBMITTED", label: "Gönderildi" },
  { value: "UNDER_REVIEW", label: "İnceleniyor" },
  { value: "ACCEPTED", label: "Kabul Edildi" },
  { value: "REJECTED", label: "Reddedildi" },
  { value: "EXPIRED", label: "Süresi Doldu" },
];

export const CURRENCY_OPTIONS = [
  { value: "TRY", label: "₺ TRY" },
  { value: "USD", label: "$ USD" },
  { value: "EUR", label: "€ EUR" },
  { value: "GBP", label: "£ GBP" },
];

export const SORT_OPTIONS = [
  { value: "createdAt", label: "Oluşturulma Tarihi" },
  { value: "totalAmount", label: "Toplam Tutar" },
  { value: "supplierName", label: "Tedarikçi Adı" },
  { value: "averageRating", label: "Değerlendirme" },
  { value: "deliveryDays", label: "Teslimat Süresi" },
  { value: "validUntil", label: "Geçerlilik Tarihi" },
];
