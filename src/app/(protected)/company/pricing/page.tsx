"use client";
import React from "react";
import { PricingTable } from "./_shared";
import { CustomCard } from "@/components/ui";

const PricePage: React.FC = () => {
  return (
    <CustomCard
      title="Fiyat Bilgileri Yönetimi"
      subtitle="Okul fiyat bilgilerinizi oluşturun, düzenleyin ve yönetin"
      addButtonUrl="/company/pricing/add-edit/new"
    >
      <PricingTable />
    </CustomCard>
  );
};

export default PricePage;
