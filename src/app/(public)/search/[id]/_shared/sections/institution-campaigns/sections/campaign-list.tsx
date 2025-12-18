import { CampaignDto, CampaignSchoolDto } from "@/types";
import { EMPTY_STATE_CONFIG } from "../config";
import { CampaignCard } from "./";
import { mapCampaignSchoolToCampaignDto } from "../utils";

interface CampaignListProps {
  campaigns?: CampaignDto[] | CampaignSchoolDto[];
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

  // CampaignSchoolDto'yu CampaignDto'ya dönüştür
  const normalizedCampaigns: CampaignDto[] = campaigns.map((campaign) => {
    // Eğer campaignTitle varsa CampaignSchoolDto'dur, dönüştür
    if ("campaignTitle" in campaign) {
      return mapCampaignSchoolToCampaignDto(campaign as CampaignSchoolDto);
    }
    // Zaten CampaignDto ise direkt döndür
    return campaign as CampaignDto;
  });

  return (
    <div className="row row-gap-24 pb-16">
      {normalizedCampaigns.map((campaign) => (
        <div key={campaign.id} className="col-12 col-md-6">
          <CampaignCard campaign={campaign} />
        </div>
      ))}
    </div>
  );
};

export default CampaignList;
