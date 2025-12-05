import Image from "next/image";
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
    headerName: "Açıklama",
    width: 180,
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

  {
    field: "status",
    headerName: "Durum",
    width: 130,
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
    field: "discountAmount",
    headerName: "İndirim Miktarı",
    width: 200,
    align: "center",
    renderCell: (params: any) => {
      const amount = params.row.discountAmount;
      if (!amount || amount === 0) {
        return <span className="text-muted">-</span>;
      }
      return (
        <div className="text-center">
          <span className="fw-semibold text-success">
            {new Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }).format(amount)}
          </span>
        </div>
      );
    },
  },
  {
    field: "discountPercentage",
    headerName: "İndirim Yüzdesi",
    width: 200,
    align: "center",
    renderCell: (params: any) => {
      const percentage = params.row.discountPercentage;
      if (!percentage || percentage === 0) {
        return <span className="text-muted">-</span>;
      }
      return (
        <div className="text-center">
          <span className="fw-semibold text-primary">%{percentage}</span>
        </div>
      );
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
    headerName: "Kalan Gün",
    width: 160,
    align: "center",
    renderCell: (params: any) => {
      const { daysRemaining, isExpired } = params.row;

      // Süresi dolmuşsa
      if (isExpired) {
        return (
          <Badge variant="danger" size="sm">
            Süresi Doldu
          </Badge>
        );
      }

      // daysRemaining yoksa veya null ise
      if (daysRemaining === null || daysRemaining === undefined) {
        return <span className="text-muted">-</span>;
      }

      // Kalan güne göre renklendirme
      const getColorClass = () => {
        if (daysRemaining <= 3) return "text-danger";
        if (daysRemaining <= 7) return "text-warning";
        return "text-success";
      };

      return (
        <div className="text-center">
          <span className={`fw-semibold ${getColorClass()}`}>
            {daysRemaining} gün
          </span>
        </div>
      );
    },
  },
  {
    field: "campaignSchools",
    headerName: "Kurumlar",
    width: 140,
    align: "center",
    renderCell: (params: any) => {
      const schools = params.row.campaignSchools;
      const schoolCount = Array.isArray(schools) ? schools.length : 0;

      if (schoolCount === 0) {
        return <span className="text-muted">-</span>;
      }

      return (
        <Popover
          content={
            <div style={{ maxWidth: "200px" }}>
              {schools.slice(0, 5).map((school: any, index: number) => (
                <div key={school.id || index} className="py-1">
                  <small>{school.schoolName || school.campusName}</small>
                </div>
              ))}
              {schoolCount > 5 && (
                <div className="py-1 text-muted">
                  <small>+{schoolCount - 5} daha...</small>
                </div>
              )}
            </div>
          }
          placement="top"
          trigger="hover"
          size="sm"
        >
          <div className="cursor-pointer">
            <Badge variant="info" size="sm">
              {schoolCount} Kurum
            </Badge>
          </div>
        </Popover>
      );
    },
  },

  // Flags & Labels Column
  {
    field: "flags",
    headerName: "Özellikler",
    width: 160,
    align: "center",
    renderCell: (params: any) => {
      const { isFeatured, isPublic, isActive, requiresApproval } = params.row;
      const hasFlags = isFeatured || isPublic || isActive;

      if (!hasFlags) {
        return <span className="text-muted">-</span>;
      }

      return (
        <div className="d-flex justify-content-center gap-3">
          {isFeatured && (
            <Popover
              content="Öne çıkarılmış kampanya"
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
          {isPublic && (
            <Popover
              content="Herkese açık kampanya"
              placement="top"
              trigger="hover"
              size="sm"
            >
              <div className="cursor-pointer">
                <i
                  className="ph ph-globe text-primary"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </Popover>
          )}
          {isActive && (
            <Popover
              content="Aktif kampanya"
              placement="top"
              trigger="hover"
              size="sm"
            >
              <div className="cursor-pointer">
                <i
                  className="ph-fill ph-check-circle text-success"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </Popover>
          )}
          {requiresApproval && (
            <Popover
              content="Onay gerektiren kampanya"
              placement="top"
              trigger="hover"
              size="sm"
            >
              <div className="cursor-pointer">
                <i
                  className="ph ph-seal-check text-info"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </Popover>
          )}
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
