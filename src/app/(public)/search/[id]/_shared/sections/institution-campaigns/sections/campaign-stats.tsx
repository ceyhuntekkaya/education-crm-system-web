import { CampaignDto } from "@/types";
import { CustomCard } from "@/components/ui";
import { STATS_CONFIG } from "../utils";

interface CampaignStatsProps {
  campaigns?: CampaignDto[];
}

const CampaignStats = ({ campaigns = [] }: CampaignStatsProps) => {
  const renderStatCard = (config: (typeof STATS_CONFIG)[number]) => (
    <div className="col-lg-4 col-md-6" key={config.key}>
      <div className="bg-white rounded-8 p-12 border border-neutral-30 d-flex align-items-center gap-8 h-100 transition-all hover-shadow-sm">
        <div
          className={`w-32 h-32 rounded-8 ${config.bgColor} d-flex align-items-center justify-content-center flex-shrink-0`}
        >
          <i
            className={`ph-bold ph-${config.icon} ${config.textColor}`}
            style={{ fontSize: "16px" }}
          ></i>
        </div>
        <div className="flex-grow-1">
          <p className="text-xs text-neutral-500 mb-2 fw-normal">
            {config.title}
          </p>
          <h6 className={`${config.textColor} fw-semibold mb-0`}>
            {config.getValue(campaigns)}
          </h6>
        </div>
      </div>
    </div>
  );

  if (campaigns.length === 0) {
    return null;
  }

  return (
    <CustomCard
      title="Kampanya Özeti"
      size="xs"
      variant="outline"
      bgColor="bg-white"
      headerBgColor="bg-main-50"
      padding="p-0"
      headerPadding="p-12"
      spacing="mt-24"
      border="border border-neutral-30"
      borderRadius="rounded-12"
      className="campaign-stats-card"
    >
      <div className="p-12">
        <div className="row g-12 gy-12">{STATS_CONFIG.map(renderStatCard)}</div>
      </div>
    </CustomCard>
  );
};

export default CampaignStats;
