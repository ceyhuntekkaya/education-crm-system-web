import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import type { RFQInvitationDto } from "@/types";

// Helper function to format date
const formatDateString = (dateString: string, format: string): string => {
  const date = new Date(dateString);
  if (format === "DD/MM/YYYY") {
    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  if (format === "HH:mm") {
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return date.toLocaleString("tr-TR");
};

// Main column definitions
export const createInvitationColumns = (): GridColDef<RFQInvitationDto>[] => [
  {
    field: "id",
    headerName: "Davet ID",
    width: 120,
    align: "center",
    headerAlign: "center",
    renderCell: (params: any) => (
      <Badge variant="info" size="sm">
        #{params.value || "-"}
      </Badge>
    ),
  },
  {
    field: "supplierCompanyName",
    headerName: "Tedarikçi Şirketi",
    minWidth: 280,
    renderCell: (params: any) => (
      <div className="w-100">
        <div
          className="fw-semibold text-dark mb-1"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={params.value || "Tedarikçi Adı Yok"}
        >
          {params.value || "Tedarikçi Adı Yok"}
        </div>
        {params.row.supplierId && (
          <div className="text-muted" style={{ fontSize: "0.75rem" }}>
            Tedarikçi ID: #{params.row.supplierId}
          </div>
        )}
      </div>
    ),
  },
  {
    field: "rfqTitle",
    headerName: "RFQ Başlığı",
    width: 280,
    renderCell: (params: any) => (
      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={params.value || "Başlık Yok"}
      >
        {params.value || "Başlık Yok"}
      </div>
    ),
  },
  {
    field: "invitedAt",
    headerName: "Davet Tarihi",
    width: 180,
    align: "center",
    headerAlign: "center",
    renderCell: (params: any) => (
      <div className="d-flex flex-column align-items-center gap-1">
        <span className="fw-medium">
          {params.value ? formatDateString(params.value, "DD/MM/YYYY") : "-"}
        </span>
        {params.value && (
          <span className="text-muted" style={{ fontSize: "0.75rem" }}>
            {formatDateString(params.value, "HH:mm")}
          </span>
        )}
      </div>
    ),
  },
];
