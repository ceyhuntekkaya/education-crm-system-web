"use client";
import React, { useState } from "react";
import {
  AppointmentAvailabilityFilterForm,
  AppointmentAvailabilityRangeFilterForm,
  AppointmentAvailabilityTable,
  AppointmentAvailabilityProvider,
  AppointmentDetailsFilterForm,
} from "./_shared";
import TabNavigation from "@/components/ui/tab-navigation";
import { TabItem } from "@/components/ui/types";
import { CustomCard } from "@/components/ui";
import { usePageTitle } from "@/hooks";

type TabType = "single" | "range";

const AppointmentAvailabilityPageContent: React.FC = () => {
  usePageTitle("Randevu Müsaitliği");
  const [activeTab, setActiveTab] = useState<TabType>("single");

  // Tab yapısı için data
  const tabs: TabItem[] = [
    {
      id: "single",
      title: "Tekil Tarih",
      label: "Tekil Tarih Sorgulama",
      icon: "ph-calendar",
      isActive: activeTab === "single",
      content: <AppointmentAvailabilityFilterForm />,
    },
    {
      id: "range",
      title: "Tarih Aralığı",
      label: "Tarih Aralığı Sorgulama",
      icon: "ph-calendar-dots",
      isActive: activeTab === "range",
      content: <AppointmentAvailabilityRangeFilterForm />,
    },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as TabType);
  };

  return (
    <CustomCard
      title="Randevu Müsaitlik Sorgulama"
      subtitle="Kurum randevu müsaitlik durumlarını sorgulayın ve görüntüleyin"
      addButtonUrl="/company/appointment-availability/add-edit/new"
      mb="mb-24"
    >
      <div className="d-flex flex-column gap-12">
        {/* Tab Navigation Component */}
        <TabNavigation tabs={tabs} onTabChange={handleTabChange} size="md" />

        {/* Tab Content */}
        {tabs.find((tab) => tab.id === activeTab)?.content}

        {/* Appointment Details Filter - API'den veri çekildikten sonra göster */}
        <AppointmentDetailsFilterForm />

        {/* Results Table - Context'ten otomatik */}
        <AppointmentAvailabilityTable />
      </div>
    </CustomCard>
  );
};

const AppointmentAvailabilityPage: React.FC = () => {
  return (
    <AppointmentAvailabilityProvider>
      <AppointmentAvailabilityPageContent />
    </AppointmentAvailabilityProvider>
  );
};

export default AppointmentAvailabilityPage;
