import Image from "next/image";
import { GridColDef } from "@/components/ui/data-grid";
import { CampaignDto } from "@/types/dto/campaign/CampaignDto";
import { CampaignSummaryDto } from "@/types/dto/campaign/CampaignSummaryDto";
import { formatDate, formatDateTime, formatNumber } from "@/utils";
import {
  getStatusBadgeVariant,
  getCampaignTypeDisplay,
  getStatusDisplay,
  getCampaignDiscountInfo,
} from "../utils";
import { Badge, Popover } from "@/components";

// Main column definitions
export const createCampaignColumns = (): GridColDef<
  CampaignDto | CampaignSummaryDto
>[] => [
  // Basic Information Columns
  {
    field: "thumbnailImageUrl",
    headerName: "",
    width: 70,
    sortable: false,
    renderCell: (params: any) => (
      <div className="d-flex align-items-center justify-content-center h-100">
        {params?.row?.thumbnailImageUrl || params?.row?.bannerImageUrl ? (
          <Image
            src={params.row.thumbnailImageUrl || params.row.bannerImageUrl}
            alt={params?.row?.title || "Kampanya Görseli"}
            width={44}
            height={32}
            className="rounded"
            style={{ objectFit: "cover", border: "1px solid #e5e7eb" }}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              const parent = img.parentElement;

              // Eğer zaten bir fallback element varsa, yenisini ekleme
              if (parent?.querySelector(".fallback-icon")) {
                img.style.display = "none";
                return;
              }

              img.style.display = "none";
              const fallback = document.createElement("div");
              fallback.className =
                "rounded d-flex align-items-center justify-content-center fallback-icon";
              fallback.style.cssText = `width: 44px; height: 32px; background-color: #9ca3af; color: white;`;
              fallback.innerHTML =
                '<i class="ph ph-tag" style="font-size: 16px;"></i>';
              parent?.appendChild(fallback);
            }}
          />
        ) : (
          <div
            className="rounded d-flex align-items-center justify-content-center"
            style={{
              width: "44px",
              height: "32px",
              backgroundColor: "#9ca3af",
              color: "white",
            }}
          >
            <i className="ph ph-tag" style={{ fontSize: "16px" }} />
          </div>
        )}
      </div>
    ),
  },
  {
    field: "title",
    headerName: "Kampanya Adı",
    width: 250,
    renderCell: (params: any) => (
      <div className="fw-semibold text-truncate" title={params.value}>
        {params.value || "-"}
      </div>
    ),
  },
  {
    field: "shortDescription",
    headerName: "Açıklama",
    width: 200,
    renderCell: (params: any) => (
      <div
        className="text-truncate text-muted"
        title={params.row.shortDescription}
      >
        {params.row.shortDescription || "-"}
      </div>
    ),
  },
  {
    field: "campaignType",
    headerName: "Tür",
    width: 160,
    renderCell: (params: any) => (
      <div
        className="text-truncate fw-medium"
        title={getCampaignTypeDisplay(params.value)}
      >
        {getCampaignTypeDisplay(params.value)}
      </div>
    ),
  },
  {
    field: "status",
    headerName: "Durum",
    width: 140,
    align: "center",
    renderCell: (params: any) => (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Badge variant={getStatusBadgeVariant(params.value)}>
          {getStatusDisplay(params.value)}
        </Badge>
      </div>
    ),
  },

  // Campaign Details Columns
  {
    field: "discount",
    headerName: "İndirim",
    width: 120,
    align: "center",
    renderCell: (params: any) => {
      const discountInfo = getCampaignDiscountInfo(params.row);

      return (
        <div className="text-center">
          <span className={`fw-semibold ${discountInfo.colorClass}`}>
            {discountInfo.text}
          </span>
        </div>
      );
    },
  },
  {
    field: "period",
    headerName: "Kampanya Dönemi",
    width: 220,
    renderCell: (params: any) => {
      const { startDate, endDate, campaignPeriod } = params.row;

      if (campaignPeriod) {
        return (
          <div className="text-truncate" title={campaignPeriod}>
            {campaignPeriod}
          </div>
        );
      }

      if (startDate && endDate) {
        return (
          <div>
            <div className="fw-semibold" style={{ fontSize: "0.85rem" }}>
              {formatDate(startDate)}
            </div>
            <small className="text-muted" style={{ fontSize: "0.75rem" }}>
              {formatDate(endDate)}
            </small>
          </div>
        );
      }

      return <span className="text-muted">-</span>;
    },
  },

  // Usage & Performance Columns
  {
    field: "usage",
    headerName: "Kullanım",
    width: 120,
    align: "center",
    renderCell: (params: any) => {
      const { usageCount = 0, usageLimit } = params.row;

      if (usageLimit) {
        const percentage = (usageCount / usageLimit) * 100;
        const isNearLimit = percentage >= 80;
        const isAtLimit = percentage >= 100;

        return (
          <div className="d-flex align-items-center justify-content-center gap-2">
            <span
              className={`fw-semibold ${
                isAtLimit
                  ? "text-danger"
                  : isNearLimit
                  ? "text-warning"
                  : "text-dark"
              }`}
              style={{ fontSize: "0.85rem" }}
            >
              {formatNumber(usageCount)}/{formatNumber(usageLimit)}
            </span>
            <div
              className={`rounded-circle ${
                isAtLimit
                  ? "bg-danger"
                  : isNearLimit
                  ? "bg-warning"
                  : "bg-success"
              }`}
              style={{
                width: "6px",
                height: "6px",
                opacity: 0.8,
              }}
            />
          </div>
        );
      }

      return (
        <div className="text-center">
          <span className="fw-semibold" style={{ fontSize: "0.85rem" }}>
            {formatNumber(usageCount)}
          </span>
        </div>
      );
    },
  },
  {
    field: "viewCount",
    headerName: "Görüntüleme",
    width: 170,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        <span className="fw-semibold text-primary">
          {formatNumber(params.row.viewCount || 0)}
        </span>
      </div>
    ),
  },
  {
    field: "applicationCount",
    headerName: "Başvuru",
    width: 140,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        <span className="fw-semibold text-info">
          {formatNumber(params.row.applicationCount || 0)}
        </span>
      </div>
    ),
  },
  {
    field: "conversionRate",
    headerName: "Dönüşüm",
    width: 140,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        <span className="fw-semibold text-success">
          %{(params.row.conversionRate || 0).toFixed(1)}
        </span>
      </div>
    ),
  },

  // Additional Info Columns
  {
    field: "flags",
    headerName: "Etiketler",
    width: 150,
    align: "center",
    renderCell: (params: any) => (
      <div className="d-flex justify-content-center gap-4">
        {params.row.isFeatured && (
          <Popover
            content="Bu kampanya öne çıkarılmıştır"
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="cursor-pointer">
              <i
                className="ph-fill ph-star text-warning"
                style={{ fontSize: "14px" }}
              />
            </div>
          </Popover>
        )}
        {params.row.isActive && (
          <Popover
            content="Bu kampanya aktiftir"
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="cursor-pointer">
              <i
                className="ph ph-check-circle text-success"
                style={{ fontSize: "14px" }}
              />
            </div>
          </Popover>
        )}
        {params.row.isLimited && (
          <Popover
            content="Bu kampanyanın kullanım limiti vardır"
            placement="top"
            trigger="hover"
            size="sm"
          >
            <div className="cursor-pointer">
              <i
                className="ph ph-clock text-info"
                style={{ fontSize: "14px" }}
              />
            </div>
          </Popover>
        )}
        {!params.row.isFeatured &&
          !params.row.isActive &&
          !params.row.isLimited && <span className="text-muted">-</span>}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Oluşturulma",
    width: 180,
    align: "center",
    renderCell: (params: any) => (
      <div className="text-center">
        {params.row.createdAt ? (
          <div className="fw-semibold" style={{ fontSize: "0.85rem" }}>
            {formatDateTime(params.row.createdAt)}
          </div>
        ) : (
          <span className="text-muted">-</span>
        )}
      </div>
    ),
  },

  // Status & Actions Columns
  // {
  //   field: "actions",
  //   headerName: "",
  //   width: 120,
  //   sortable: false,
  //   renderCell: (params) => renderActionButtons(params, handlers),
  // },
];
