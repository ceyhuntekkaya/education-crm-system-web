import Image from "next/image";
import { CampaignDto } from "@/types";
import { TabContent, TabNavigation, type TabItem } from "@/components";

interface InstitutionCampaignsProps {
  campaigns: CampaignDto[];
}

// Campaign type configurations
const CAMPAIGN_TYPE_CONFIG = {
  EARLY_BIRD: "Erken Kayıt",
  SIBLING_DISCOUNT: "Kardeş İndirimi",
  SUMMER_SCHOOL: "Yaz Okulu",
  FREE_TRIAL: "Ücretsiz Deneme",
  LOYALTY_REWARD: "Sadakat Ödülü",
  REFERRAL_BONUS: "Tavsiye Bonusu",
  WINTER_CAMP: "Kış Kampı",
  SCHOLARSHIP: "Burs",
} as const;

// Empty state configurations
const EMPTY_STATE_CONFIG = {
  all: {
    icon: "ph-list",
    title: "Kampanya Bulunmuyor",
    description: "Bu kurum için herhangi bir kampanya bulunmamaktadır.",
  },
  active: {
    icon: "ph-tag",
    title: "Aktif Kampanya Bulunmuyor",
    description: "Şu anda bu kurum için aktif bir kampanya bulunmamaktadır.",
  },
  inactive: {
    icon: "ph-clock",
    title: "Geçmiş Kampanya Bulunmuyor",
    description: "Bu kurum için geçmiş kampanya bulunmamaktadır.",
  },
} as const;

// Statistics card configurations
const STATS_CONFIG = [
  {
    key: "total",
    title: "Toplam Kampanya",
    icon: "ph-list",
    bgColor: "bg-main-25",
    textColor: "text-main-600",
    getValue: (campaigns: CampaignDto[]) => campaigns.length,
  },
  {
    key: "active",
    title: "Aktif Kampanya",
    icon: "ph-check-circle",
    bgColor: "bg-success-25",
    textColor: "text-success-600",
    getValue: (campaigns: CampaignDto[]) =>
      campaigns.filter((c) => c.isActive).length,
  },
  {
    key: "percentage",
    title: "Yüzde İndirimi",
    icon: "ph-percent",
    bgColor: "bg-warning-25",
    textColor: "text-warning-600",
    getValue: (campaigns: CampaignDto[]) =>
      campaigns.filter((c) => c.discountType === "PERCENTAGE").length,
  },
  {
    key: "fixed",
    title: "Sabit İndirim",
    icon: "ph-currency-circle-dollar",
    bgColor: "bg-primary-25",
    textColor: "text-primary-600",
    getValue: (campaigns: CampaignDto[]) =>
      campaigns.filter((c) => c.discountType === "FIXED_AMOUNT").length,
  },
  {
    key: "special",
    title: "Özel Fırsat",
    icon: "ph-gift",
    bgColor: "bg-info-25",
    textColor: "text-info-600",
    getValue: (campaigns: CampaignDto[]) =>
      campaigns.filter((c) => c.discountType === "NO_DISCOUNT").length,
  },
] as const;

export default function InstitutionCampaigns({
  campaigns,
}: InstitutionCampaignsProps) {
  const activeCampaigns = campaigns.filter((campaign) => campaign.isActive);
  const inactiveCampaigns = campaigns.filter((campaign) => !campaign.isActive);

  const getCampaignTypeDisplay = (type: string | undefined): string => {
    return (
      CAMPAIGN_TYPE_CONFIG[type as keyof typeof CAMPAIGN_TYPE_CONFIG] || "Genel"
    );
  };

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const calculateDaysRemaining = (endDate: string | undefined): string => {
    if (!endDate) return "Süresiz";

    try {
      const end = new Date(endDate);
      const now = new Date();
      const diffTime = end.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 0) return "Süresi Dolmuş";
      if (diffDays === 1) return "Son 1 gün";
      if (diffDays <= 7) return `${diffDays} gün kaldı`;
      return `${diffDays} gün kaldı`;
    } catch {
      return "Süresiz";
    }
  };

  const renderEmptyState = (type: keyof typeof EMPTY_STATE_CONFIG) => {
    const config = EMPTY_STATE_CONFIG[type];
    return (
      <div className="text-center py-40">
        <div className="mb-16">
          <i
            className={`ph-light ph-${config.icon} text-neutral-400`}
            style={{ fontSize: "48px" }}
          ></i>
        </div>
        <h6 className="mb-8 text-neutral-600">{config.title}</h6>
        <p className="text-neutral-500 text-sm">{config.description}</p>
      </div>
    );
  };

  const renderDiscountInfo = (campaign: CampaignDto) => {
    const discountConfigs = {
      PERCENTAGE: {
        icon: "ph-percent",
        text: `%${campaign.discountPercentage} İndirim`,
        colorClass: campaign.isActive ? "text-success-600" : "text-neutral-400",
      },
      FIXED_AMOUNT: {
        icon: "ph-currency-circle-dollar",
        text: `${campaign.discountAmount} TL İndirim`,
        colorClass: campaign.isActive ? "text-success-600" : "text-neutral-400",
      },
      NO_DISCOUNT: {
        icon: "ph-gift",
        text: "Özel Fırsat",
        colorClass: campaign.isActive ? "text-primary-600" : "text-neutral-400",
      },
    };

    const config =
      discountConfigs[campaign.discountType as keyof typeof discountConfigs];
    if (!config) return null;

    return (
      <div className="d-flex align-items-center gap-6">
        <i
          className={`ph-bold ph-${config.icon} text-sm ${config.colorClass}`}
        ></i>
        <span className={`fw-semibold text-sm ${config.colorClass}`}>
          {config.text}
        </span>
      </div>
    );
  };

  const renderStatCard = (
    config: (typeof STATS_CONFIG)[number],
    campaigns: CampaignDto[]
  ) => (
    <div className="col-lg-6" key={config.key}>
      <div className="bg-white rounded-12 p-20 border border-neutral-30 d-flex align-items-center justify-content-between mb-16">
        <div className="d-flex align-items-center gap-12">
          <div
            className={`w-40 h-40 rounded-8 ${config.bgColor} d-flex align-items-center justify-content-center`}
          >
            <i className={`ph-bold ph-${config.icon} ${config.textColor}`}></i>
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-2">{config.title}</p>
            <h6 className={`${config.textColor} fw-semibold mb-0`}>
              {config.getValue(campaigns)}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCampaignsList = (
    campaignList: CampaignDto[],
    type: "all" | "active" | "inactive"
  ) => {
    if (campaignList.length === 0) {
      return renderEmptyState(type);
    }

    return (
      <div className="row gy-20 gap-20">
        {campaignList.map((campaign) => (
          <div key={campaign.id} className="col-12">
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
                        {renderDiscountInfo(campaign)}

                        {/* Campaign Period */}
                        <div className="d-flex align-items-center gap-6">
                          <i className="ph-bold ph-calendar text-neutral-400 text-sm"></i>
                          <span className="text-xs text-neutral-500">
                            {campaign.startDate &&
                              formatDate(campaign.startDate)}{" "}
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
          </div>
        ))}
      </div>
    );
  };

  // Tab items for campaigns
  const campaignTabs: TabItem[] = [
    {
      id: "pills-all-campaigns",
      icon: "ph-bold ph-list",
      title: `Tümü (${campaigns.length})`,
      children: renderCampaignsList(campaigns, "all"),
      isActive: true,
    },
    {
      id: "pills-active-campaigns",
      icon: "ph-bold ph-check-circle",
      title: `Aktif (${activeCampaigns.length})`,
      children: renderCampaignsList(activeCampaigns, "active"),
    },
    {
      id: "pills-inactive-campaigns",
      icon: "ph-bold ph-clock",
      title: `Geçmiş (${inactiveCampaigns.length})`,
      children: renderCampaignsList(inactiveCampaigns, "inactive"),
    },
  ];

  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          <h4 className="mb-16">Kampanyalar ve Fırsatlar</h4>
          <span className="d-block border border-neutral-30 my-24 border-dashed" />

          {/* Tab Navigation */}
          <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
            <TabNavigation tabs={campaignTabs} size="sm" />
          </div>

          {/* Tab Content */}
          <TabContent tabs={campaignTabs} />

          {/* Campaign Statistics */}
          {campaigns.length > 0 && (
            <>
              <span className="d-block border border-neutral-30 my-32 border-dashed" />
              <h5 className="mb-20">Kampanya Özeti</h5>

              <div className="row gy-16">
                {/* İlk iki stat - tam genişlik */}
                {STATS_CONFIG.slice(0, 2).map((config) =>
                  renderStatCard(config, campaigns)
                )}

                {/* Son üç stat - grid düzeni */}
                <div className="col-12">
                  <div className="row gy-16">
                    {STATS_CONFIG.slice(2).map((config) => (
                      <div className="col-lg-4" key={config.key}>
                        <div className="bg-white rounded-12 p-20 border border-neutral-30 d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-12">
                            <div
                              className={`w-40 h-40 rounded-8 ${config.bgColor} d-flex align-items-center justify-content-center`}
                            >
                              <i
                                className={`ph-bold ph-${config.icon} ${config.textColor}`}
                              ></i>
                            </div>
                            <div>
                              <p className="text-sm text-neutral-600 mb-2">
                                {config.title}
                              </p>
                              <h6
                                className={`${config.textColor} fw-semibold mb-0`}
                              >
                                {config.getValue(campaigns)}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
