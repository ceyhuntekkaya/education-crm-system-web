import { TabContent, TabNavigation, type TabItem } from "@/components";
import { useCampaigns } from "./_hooks";
import { CampaignList, CampaignStats } from "./_sections";
import { campaignMockData } from "./_mock";

const InstitutionCampaigns = () => {
  const { activeCampaigns, inactiveCampaigns } = useCampaigns(campaignMockData);

  // Tab items for campaigns
  const campaignTabs: TabItem[] = [
    {
      id: "pills-all-campaigns",
      icon: "ph-bold ph-list",
      title: `Tümü (${campaignMockData.length})`,
      children: <CampaignList campaigns={campaignMockData} type="all" />,
      isActive: true,
    },
    {
      id: "pills-active-campaigns",
      icon: "ph-bold ph-check-circle",
      title: `Aktif (${activeCampaigns.length})`,
      children: <CampaignList campaigns={activeCampaigns} type="active" />,
    },
    {
      id: "pills-inactive-campaigns",
      icon: "ph-bold ph-clock",
      title: `Geçmiş (${inactiveCampaigns.length})`,
      children: <CampaignList campaigns={inactiveCampaigns} type="inactive" />,
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
          <CampaignStats campaigns={campaignMockData} />
        </div>
      </div>
    </div>
  );
};

export default InstitutionCampaigns;
