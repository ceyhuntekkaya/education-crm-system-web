import Image from "next/image";
import { CampaignDto } from "@/types";
import { getCampaignTypeDisplay, formatDate, calculateDaysRemaining, DISCOUNT_TYPE_CONFIG } from "../_utils";

interface CampaignCardProps {
  campaign: CampaignDto;
}

const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const renderDiscountInfo = () => {
    const config = DISCOUNT_TYPE_CONFIG[campaign.discountType as keyof typeof DISCOUNT_TYPE_CONFIG];
    if (!config) return null;

    const colorClass = config.getColorClass(campaign.isActive || false);

    return (
      <div className="d-flex align-items-center gap-6">
        <i className={`ph-bold ph-${config.icon} text-sm ${colorClass}`}></i>
        <span className={`fw-semibold text-sm ${colorClass}`}>
          {config.getText(campaign)}
        </span>
      </div>
    );
  };

  return (
    <div
      className={`bg-white rounded-12 p-24 box-shadow-sm border border-neutral-30 position-relative ${
        !campaign.isActive ? "opacity-80" : ""
      }`}
    >
      <div className="row align-items-start">
        {/* Campaign Image */}
        <div className="col-md-3 col-lg-2">
          <div className="position-relative">
            <div
              className="rounded-8 overflow-hidden"
              style={{ height: "100px", width: "100%" }}
            >
              {campaign.thumbnailImageUrl ? (
                <Image
                  src={campaign.thumbnailImageUrl}
                  alt={campaign.title || "Campaign"}
                  width={160}
                  height={100}
                  className="w-100 h-100 object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-main-25">
                  <i
                    className="ph ph-megaphone text-main-600"
                    style={{ fontSize: "28px" }}
                  ></i>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Campaign Content */}
        <div className="col-md-9 col-lg-10">
          <div className="d-flex flex-column h-100">
            {/* Header Row - Badges and Status */}
            <div className="d-flex align-items-center justify-content-between mb-8">
              <div className="d-flex align-items-center gap-8">
                {/* Campaign Badge */}
                {campaign.badgeText && (
                  <span
                    className="d-inline-flex align-items-center gap-4 px-10 py-4 rounded-6 text-xs fw-medium text-white"
                    style={{
                      backgroundColor: campaign.badgeColor,
                    }}
                  >
                    <i
                      className="ph ph-megaphone"
                      style={{ fontSize: "10px" }}
                    ></i>
                    {campaign.badgeText}
                  </span>
                )}

                {/* Campaign Type */}
                <span className="text-xs text-neutral-500 bg-neutral-50 px-8 py-3 rounded-4">
                  {getCampaignTypeDisplay(campaign.campaignType)}
                </span>
              </div>

              {/* Status Badge - Right Side */}
              <div className="d-flex align-items-center gap-12">
                <span
                  className={`d-inline-flex align-items-center gap-4 px-8 py-3 rounded-6 text-xs fw-medium ${
                    campaign.isActive
                      ? "bg-success-25 text-success-700"
                      : "bg-neutral-50 text-neutral-600"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-circle ${
                      campaign.isActive
                        ? "bg-success-600"
                        : "bg-neutral-400"
                    }`}
                  ></span>
                  {campaign.isActive ? "Aktif" : "Pasif"}
                </span>

                {/* Time Remaining */}
                <div className="d-flex align-items-center gap-4">
                  <i
                    className={`ph-bold ph-clock text-xs ${
                      campaign.isActive
                        ? "text-warning-600"
                        : "text-neutral-400"
                    }`}
                  ></i>
                  <span
                    className={`text-xs fw-medium ${
                      campaign.isActive
                        ? "text-warning-600"
                        : "text-neutral-400"
                    }`}
                  >
                    {campaign.isActive
                      ? calculateDaysRemaining(campaign.endDate)
                      : "Süresi Dolmuş"}
                  </span>
                </div>
              </div>
            </div>

            {/* Campaign Title */}
            <h5
              className={`mb-6 fw-semibold line-height-1-3 ${
                campaign.isActive
                  ? "text-neutral-900"
                  : "text-neutral-600"
              }`}
            >
              {campaign.title}
            </h5>

            {/* Campaign Description */}
            <p
              className={`text-sm mb-12 line-height-1-4 ${
                campaign.isActive
                  ? "text-neutral-600"
                  : "text-neutral-500"
              }`}
            >
              {campaign.description}
            </p>

            {/* Bottom Row - Info & Action */}
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-20">
                {/* Discount Information */}
                {renderDiscountInfo()}

                {/* Campaign Period */}
                <div className="d-flex align-items-center gap-6">
                  <i className="ph-bold ph-calendar text-neutral-400 text-sm"></i>
                  <span className="text-xs text-neutral-500">
                    {campaign.startDate && formatDate(campaign.startDate)}{" "}
                    - {campaign.endDate && formatDate(campaign.endDate)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                className={`btn px-16 py-6 rounded-6 text-xs fw-medium ${
                  campaign.isActive
                    ? "btn-main-600"
                    : "btn-outline-neutral-300"
                }`}
                disabled={!campaign.isActive}
              >
                {campaign.isActive ? (
                  <>
                    <i className="ph ph-eye me-4"></i>
                    Detay Gör
                  </>
                ) : (
                  <>
                    <i className="ph ph-archive me-4"></i>
                    Arşivlendi
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
