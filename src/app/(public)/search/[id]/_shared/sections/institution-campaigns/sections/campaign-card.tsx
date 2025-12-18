import { CampaignDto } from "@/types";
import { CustomImage } from "@/components/ui";
import {
  getCampaignTypeDisplay,
  formatDate,
  calculateDaysRemaining,
} from "../utils";
import { DISCOUNT_TYPE_CONFIG } from "../config";

interface CampaignCardProps {
  campaign: CampaignDto;
}

const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const renderDiscountInfo = () => {
    const config =
      DISCOUNT_TYPE_CONFIG[
        campaign.discountType as keyof typeof DISCOUNT_TYPE_CONFIG
      ];
    if (!config) return null;

    const colorClass = config.getColorClass(campaign.isActive || false);

    return (
      <div className="d-flex align-items-center gap-6">
        <i
          className={`ph-bold ph-${config.icon} text-xs text-md-sm ${colorClass}`}
        ></i>
        <span className={`fw-semibold text-xs text-md-sm ${colorClass}`}>
          {config.getText(campaign)}
        </span>
      </div>
    );
  };

  return (
    <div
      className={`bg-white rounded-16 h-100 overflow-hidden transition-all ${
        !campaign.isActive ? "opacity-70" : ""
      }`}
      style={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        border: "1px solid hsl(var(--neutral-30))",
      }}
    >
      {/* Campaign Image */}
      <div className="position-relative" style={{ height: "200px" }}>
        {campaign.thumbnailImageUrl ? (
          <CustomImage
            src={campaign.thumbnailImageUrl}
            alt={campaign.title || "Campaign"}
            width={400}
            height={200}
            className="w-100 h-100"
            variant="card"
          />
        ) : (
          <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-main-25">
            <i
              className="ph-fill ph-megaphone text-main-600"
              style={{ fontSize: "48px", opacity: 0.2 }}
            ></i>
          </div>
        )}

        {/* Campaign Badge - Overlay on Image */}
        {campaign.badgeText && (
          <div
            className="position-absolute"
            style={{ top: "12px", left: "12px" }}
          >
            <span
              className="d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold text-white"
              style={{
                backgroundColor: campaign.badgeColor || "hsl(var(--main))",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }}
            >
              <i
                className="ph-fill ph-megaphone"
                style={{ fontSize: "12px" }}
              ></i>
              {campaign.badgeText}
            </span>
          </div>
        )}

        {/* Status Badge - Overlay on Image */}
        <div
          className="position-absolute"
          style={{ top: "12px", right: "12px" }}
        >
          <span
            className={`d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold ${
              campaign.isActive
                ? "bg-success-600 text-white"
                : "bg-neutral-600 text-white"
            }`}
            style={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <span className="w-4 h-4 rounded-circle bg-white"></span>
            {campaign.isActive ? "Aktif" : "Pasif"}
          </span>
        </div>
      </div>

      {/* Campaign Content */}
      <div className="p-20 p-md-24">
        {/* Top Meta Row */}
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-12 mb-16">
          {/* Campaign Type */}
          <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-700 bg-neutral-50 px-10 py-6 rounded-8 fw-medium">
            <i className="ph-bold ph-tag text-xs"></i>
            {getCampaignTypeDisplay(campaign.campaignType)}
          </span>

          {/* Time Remaining */}
          <div className="d-inline-flex align-items-center gap-6">
            <i
              className={`ph-bold ph-clock text-sm ${
                campaign.isActive ? "text-warning-600" : "text-neutral-400"
              }`}
            ></i>
            <span
              className={`text-xs fw-semibold ${
                campaign.isActive ? "text-warning-600" : "text-neutral-500"
              }`}
            >
              {campaign.isActive
                ? calculateDaysRemaining(campaign.endDate)
                : "Süresi Dolmuş"}
            </span>
          </div>
        </div>

        {/* Campaign Title */}
        <h5
          className={`mb-12 fw-semibold line-height-1-3 text-md text-lg-lg ${
            campaign.isActive ? "text-neutral-900" : "text-neutral-600"
          }`}
        >
          {campaign.title}
        </h5>

        {/* Campaign Description */}
        <p
          className={`text-sm mb-20 line-height-1-5 ${
            campaign.isActive ? "text-neutral-600" : "text-neutral-500"
          }`}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {campaign.shortDescription}
        </p>

        {/* Bottom Info Row */}
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-16 pt-16 border-top border-neutral-30">
          {/* Discount Information */}
          {renderDiscountInfo()}

          {/* Campaign Period */}
          <div className="d-flex align-items-center gap-6 ms-sm-auto">
            <i className="ph-bold ph-calendar text-neutral-400 text-sm"></i>
            <span className="text-xs text-neutral-500 fw-medium">
              {campaign.startDate && formatDate(campaign.startDate)} -{" "}
              {campaign.endDate && formatDate(campaign.endDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
