import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { formatDate, formatDateTime } from "@/utils";
import { RFQDto } from "../hooks/api";

/**
 * RFQ durumuna göre badge variant döndürür
 */
const getRFQStatusBadgeVariant = (
  status?: string
): "success" | "warning" | "danger" | "info" | "secondary" => {
  switch (status?.toUpperCase()) {
    case "PUBLISHED":
      return "success";
    case "DRAFT":
      return "warning";
    case "CLOSED":
      return "info";
    case "CANCELLED":
      return "danger";
    default:
      return "secondary";
  }
};

/**
 * RFQ durumunu Türkçe'ye çevirir
 */
const getRFQStatusDisplay = (status?: string): string => {
  switch (status?.toUpperCase()) {
    case "DRAFT":
      return "Taslak";
    case "PUBLISHED":
      return "Yayınlandı";
    case "CLOSED":
      return "Kapatıldı";
    case "CANCELLED":
      return "İptal Edildi";
    default:
      return status || "-";
  }
};

/**
 * RFQ tipini Türkçe'ye çevirir
 */
const getRFQTypeDisplay = (type?: string): string => {
  switch (type?.toUpperCase()) {
    case "OPEN":
      return "Açık İhale";
    case "INVITED":
      return "Davetli";
    default:
      return type || "-";
  }
};

// Main column definitions
export const createRFQColumns = (): GridColDef<RFQDto>[] => [
  {
    field: "title",
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
    field: "rfqType",
    headerName: "Tip",
    width: 120,
    align: "center",
    renderCell: (params: any) => {
      const type = params.value;
      const display = getRFQTypeDisplay(type);

      return (
        <Badge variant={type === "OPEN" ? "info" : "secondary"} size="sm">
          {display}
        </Badge>
      );
    },
  },
  {
    field: "status",
    headerName: "Durum",
    width: 130,
    align: "center",
    renderCell: (params: any) => {
      const status = params.value;
      const variant = getRFQStatusBadgeVariant(status);
      const display = getRFQStatusDisplay(status);

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
    field: "quotationCount",
    headerName: "Teklif",
    width: 120,
    align: "center",
    renderCell: (params: any) => (
      <div className="fw-medium text-success">{params.value || 0}</div>
    ),
  },
  {
    field: "invitationCount",
    headerName: "Davet",
    width: 120,
    align: "center",
    renderCell: (params: any) => {
      const value = params.value || 0;
      const isInvited = params.row.rfqType === "INVITED";

      return (
        <div
          className={`fw-medium ${isInvited && value > 0 ? "text-info" : ""}`}
        >
          {value}
        </div>
      );
    },
  },
  {
    field: "submissionDeadline",
    headerName: "Son Başvuru",
    width: 170,
    renderCell: (params: any) => (
      <div className="text-muted">
        {params.value ? formatDate(params.value) : "-"}
      </div>
    ),
  },
  {
    field: "expectedDeliveryDate",
    headerName: "Teslim Tarihi",
    width: 170,
    renderCell: (params: any) => (
      <div className="text-muted">
        {params.value ? formatDate(params.value) : "-"}
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
