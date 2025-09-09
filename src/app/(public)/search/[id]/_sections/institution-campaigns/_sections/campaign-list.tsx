import { CampaignDto } from "@/types";
import { EMPTY_STATE_CONFIG } from "../_config";
import { CampaignCard } from "./";

interface CampaignListProps {
  campaigns?: CampaignDto[];
  type: "all" | "active" | "inactive";
}

const CampaignList = ({ campaigns = [], type }: CampaignListProps) => {
  const renderEmptyState = () => {
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

  if (campaigns.length === 0) {
    return renderEmptyState();
  }

  return (
    <div className="row gy-20 gap-20">
      {campaigns.map((campaign) => (
        <div key={campaign.id} className="col-12">
          <CampaignCard campaign={campaign} />
        </div>
      ))}
    </div>
  );
};

export default CampaignList;
