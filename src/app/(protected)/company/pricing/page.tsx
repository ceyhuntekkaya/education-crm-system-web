"use client";
import React from "react";
import { PricingTable } from "./_shared";
import { CustomCard } from "@/components/ui";
import { usePageTitle } from "@/hooks";

const PricePage: React.FC = () => {
  usePageTitle("Fiyatlandırma");
  return (
    <CustomCard
      title="Fiyat Bilgileri Yönetimi"
      subtitle="Kurum fiyat bilgilerinizi oluşturun, düzenleyin ve yönetin"
      addButtonUrl="/company/pricing/add-edit/new"
    >
      <PricingTable />
    </CustomCard>
  );
};

export default PricePage;
