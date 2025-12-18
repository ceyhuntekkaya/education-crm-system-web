import { TabContent, TabNavigation, type TabItem } from "@/components";
import { CustomCard, LoadingSpinner } from "@/components/ui";
import { useCampaigns } from "./hooks";
import { CampaignList } from "./sections";
import { useInstitutionDetail } from "../../contexts";
import { mapCampaignSchoolArrayToCampaignDtoArray } from "./utils";

const InstitutionCampaigns = () => {
  const { campaigns, loading } = useInstitutionDetail();

  // school.activeCampaigns'den kampanyaları al (ayrı API isteği yok)
  // CampaignSchoolDto'yu CampaignDto'ya dönüştür
  // const campaignSchools = school?.activeCampaigns || [];
  // const campaigns = mapCampaignSchoolArrayToCampaignDtoArray(campaignSchools);
  const { activeCampaigns, inactiveCampaigns } = useCampaigns(campaigns);

  // Tab items for campaigns
  const campaignTabs: TabItem[] = [
    {
      id: "pills-all-campaigns",
      icon: "ph-bold ph-list",
      title: `Tümü (${campaigns.length})`,
      label: `Tümü (${campaigns.length})`,
      content: <CampaignList campaigns={campaigns} type="all" />,
      isActive: true,
    },
    {
      id: "pills-active-campaigns",
      icon: "ph-bold ph-check-circle",
      title: `Aktif (${activeCampaigns.length})`,
      label: `Aktif (${activeCampaigns.length})`,
      content: <CampaignList campaigns={activeCampaigns} type="active" />,
    },
    {
      id: "pills-inactive-campaigns",
      icon: "ph-bold ph-clock",
      title: `Geçmiş (${inactiveCampaigns.length})`,
      label: `Geçmiş (${inactiveCampaigns.length})`,
      content: <CampaignList campaigns={inactiveCampaigns} type="inactive" />,
    },
  ];

  if (loading) {
    return (
      <div className="tutor-details__content">
        <CustomCard
          variant="outline"
          bgColor="bg-white"
          headerBgColor="bg-main-25"
          padding="p-8"
          headerPadding="p-32"
          spacing="mt-24"
        >
          <LoadingSpinner
            message="Kampanyalar yükleniyor..."
            size="lg"
            variant="dots"
          />
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="mt-24">
      <CustomCard title="Kampanyalar ve Fırsatlar">
        {/* Tab Navigation */}
        <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
          <TabNavigation tabs={campaignTabs} size="sm" />
        </div>

        {/* Tab Content */}
        <TabContent tabs={campaignTabs} />
      </CustomCard>
    </div>
  );
};

export default InstitutionCampaigns;
