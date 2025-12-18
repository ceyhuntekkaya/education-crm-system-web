import { GridColDef } from "@/components/ui/data-grid";
import { CampaignDto } from "@/types/dto/campaign/CampaignDto";
import { CampaignSummaryDto } from "@/types/dto/campaign/CampaignSummaryDto";
import { formatDate, formatDateTime } from "@/utils";
import {
  getStatusBadgeVariant,
  getCampaignTypeDisplay,
  getStatusDisplay,
  getCampaignDiscountInfo,
} from "../utils";
import { Badge, Popover, CustomImage } from "@/components";

// Main column definitions
export const createCampaignColumns = (): GridColDef<
  CampaignDto | CampaignSummaryDto
>[] => [
  // Basic Information Columns
  {
    field: "thumbnailImageUrl",
    headerName: "",
    width: 80,
    sortable: false,
    renderCell: (params: any) => (
      <div className="d-flex align-items-center justify-content-center h-100">
        <CustomImage
          src={params.row.thumbnailImageUrl || params.row.bannerImageUrl}
          alt={params?.row?.title || "Kampanya Görseli"}
          width={75}
          height={50}
          variant="rounded"
          style={{ objectFit: "cover", border: "1px solid #e5e7eb" }}
        />
      </div>
    ),
  },
  {
    field: "title",
    headerName: "Kampanya Adı",
    width: 220,
    renderCell: (params: any) => (
      <div className="fw-semibold text-truncate" title={params.value}>
        {params.value || "-"}
      </div>
    ),
  },
  {
    field: "campaignType",
    headerName: "Tür",
    width: 200,
    renderCell: (params: any) => {
      const typeDisplay = getCampaignTypeDisplay(params.value);
      return (
        <div className="text-truncate fw-medium" title={typeDisplay}>
          {typeDisplay}
        </div>
      );
    },
  },
  {
    field: "shortDescription",
    headerName: "Kısa Açıklama",
    width: 200,
    renderCell: (params: any) => {
      const description = params.row.shortDescription;
      if (!description) return <span className="text-muted">-</span>;
      return (
        <div className="text-truncate text-muted" title={description}>
          {description}
        </div>
      );
    },
  },

  // Campaign Details Columns
  {
    field: "discountInfo",
    headerName: "İndirim",
    width: 200,
    align: "center",
    renderCell: (params: any) => {
      const amount = params.row.discountAmount;
      const percentage = params.row.discountPercentage;

      // Hem miktar hem yüzde varsa
      if (amount > 0 && percentage > 0) {
        return (
          <div className="text-center">
            <div className="fw-semibold text-success">
              {new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(amount)}
            </div>
            <small className="text-primary">veya %{percentage}</small>
          </div>
        );
      }

      // Sadece miktar varsa
      if (amount > 0) {
        return (
          <div className="text-center">
            <span className="fw-semibold text-success">
              {new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(amount)}
            </span>
          </div>
        );
      }

      // Sadece yüzde varsa
      if (percentage > 0) {
        return (
          <div className="text-center">
            <span className="fw-semibold text-primary">%{percentage}</span>
          </div>
        );
      }

      return <span className="text-muted">-</span>;
    },
  },
  {
    field: "campaignPeriod",
    headerName: "Kampanya Dönemi",
    width: 220,
    renderCell: (params: any) => {
      const { startDate, endDate, campaignPeriod } = params.row;

      // campaignPeriod varsa direkt göster
      if (campaignPeriod) {
        return (
          <div className="text-truncate fw-medium" title={campaignPeriod}>
            {campaignPeriod}
          </div>
        );
      }

      // startDate ve endDate varsa formatla
      if (startDate && endDate) {
        const periodText = `${formatDate(startDate)} - ${formatDate(endDate)}`;
        return (
          <div className="text-truncate fw-medium" title={periodText}>
            {periodText}
          </div>
        );
      }

      return <span className="text-muted">-</span>;
    },
  },
  {
    field: "daysRemaining",
    headerName: "Kalan Süre",
    width: 170,
    align: "center",
    renderCell: (params: any) => {
      const { daysRemaining, isExpired, endDate } = params.row;

      // Süresi dolmuşsa
      if (isExpired) {
        return (
          <Badge variant="danger" size="sm">
            <i className="ph ph-x-circle me-1"></i>
            Sona Erdi
          </Badge>
        );
      }

      // daysRemaining yoksa veya null ise
      if (daysRemaining === null || daysRemaining === undefined) {
        return <span className="text-muted">-</span>;
      }

      // Kalan güne göre badge rengi ve icon
      const getBadgeVariant = () => {
        if (daysRemaining <= 3) return "danger";
        if (daysRemaining <= 7) return "warning";
        return "success";
      };

      const getIcon = () => {
        if (daysRemaining <= 3) return "ph-fire";
        if (daysRemaining <= 7) return "ph-clock";
        return "ph-check-circle";
      };

      return (
        <Badge variant={getBadgeVariant()} size="sm">
          <i className={`ph ${getIcon()} me-1`}></i>
          {daysRemaining} gün
        </Badge>
      );
    },
  },
  // Flags & Status Column
  {
    field: "flags",
    headerName: "Özellikler",
    width: 170,
    align: "center",
    renderCell: (params: any) => {
      const { isFeatured, isPublic, requiresApproval } = params.row;
      const flags = [];

      if (isFeatured)
        flags.push({
          icon: "ph-star-fill",
          color: "text-warning",
          tooltip: "Öne Çıkan",
        });
      if (isPublic)
        flags.push({
          icon: "ph-globe",
          color: "text-primary",
          tooltip: "Herkese Açık",
        });
      if (requiresApproval)
        flags.push({
          icon: "ph-seal-check",
          color: "text-info",
          tooltip: "Onay Gerekli",
        });

      if (flags.length === 0) {
        return <span className="text-muted">-</span>;
      }

      return (
        <div className="d-flex justify-content-center gap-2">
          {flags.map((flag, index) => (
            <Popover
              key={index}
              content={flag.tooltip}
              placement="top"
              trigger="hover"
              size="sm"
            >
              <div className="cursor-pointer">
                <i
                  className={`ph ${flag.icon} ${flag.color}`}
                  style={{ fontSize: "16px" }}
                />
              </div>
            </Popover>
          ))}
        </div>
      );
    },
  },
  {
    field: "createdByUserName",
    headerName: "Oluşturan",
    width: 200,
    renderCell: (params: any) => {
      const createdBy = params.row.createdByUserName;
      if (!createdBy) return <span className="text-muted">-</span>;

      return (
        <div className="text-truncate" title={createdBy}>
          {createdBy}
        </div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Oluşturulma",
    width: 180,
    align: "center",
    renderCell: (params: any) => {
      const createdAt = params.row.createdAt;
      if (!createdAt) return <span className="text-muted">-</span>;

      return (
        <div className="text-center">
          <div className="fw-medium" style={{ fontSize: "0.85rem" }}>
            {formatDateTime(createdAt)}
          </div>
        </div>
      );
    },
  },
];
