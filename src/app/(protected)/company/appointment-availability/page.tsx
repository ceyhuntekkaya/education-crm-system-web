"use client";
import React, { useState } from "react";
import {
  AppointmentAvailabilityFilterForm,
  AppointmentAvailabilityRangeFilterForm,
  AppointmentAvailabilityTable,
  AppointmentAvailabilityProvider,
} from "./_shared";
import TabNavigation from "@/components/ui/tab-navigation";
import { TabItem } from "@/components/ui/types";

type TabType = "single" | "range";

const AppointmentAvailabilityPageContent: React.FC = () => {
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
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-6">
          <div>
            <h2 className="mb-8">Randevu Müsaitlik Sorgulama</h2>
            <p className="text-neutral-600 mb-0">
              Okul randevu müsaitlik durumlarını sorgulayın ve görüntüleyin
            </p>
          </div>
        </div>

        {/* Tab Navigation Component */}
        <div>
          <TabNavigation tabs={tabs} onTabChange={handleTabChange} size="md" />
        </div>

        {/* Tab Content */}
        <div className="my-8">
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>

        {/* Results Table - Context'ten otomatik */}
        <AppointmentAvailabilityTable />
      </div>
    </div>
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
