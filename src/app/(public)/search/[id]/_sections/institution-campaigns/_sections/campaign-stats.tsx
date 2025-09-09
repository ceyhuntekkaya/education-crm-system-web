import { CampaignDto } from "@/types";
import { STATS_CONFIG } from "../_utils";

interface CampaignStatsProps {
  campaigns?: CampaignDto[];
}

const CampaignStats = ({ campaigns = [] }: CampaignStatsProps) => {
  const renderStatCard = (config: (typeof STATS_CONFIG)[number]) => (
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

  const renderCompactStatCard = (config: (typeof STATS_CONFIG)[number]) => (
    <div className="col-lg-4" key={config.key}>
      <div className="bg-white rounded-12 p-20 border border-neutral-30 d-flex align-items-center justify-content-between">
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

  if (campaigns.length === 0) {
    return null;
  }

  return (
    <>
      <span className="d-block border border-neutral-30 my-32 border-dashed" />
      <h5 className="mb-20">Kampanya Özeti</h5>

      <div className="row gy-16">
        {/* İlk iki stat - tam genişlik */}
        {STATS_CONFIG.slice(0, 2).map(renderStatCard)}

        {/* Son üç stat - grid düzeni */}
        <div className="col-12">
          <div className="row gy-16">
            {STATS_CONFIG.slice(2).map(renderCompactStatCard)}
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignStats;
