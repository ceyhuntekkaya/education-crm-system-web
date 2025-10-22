"use client";
import React from "react";
import { BrandListTable } from "./_shared/sections";
import { CustomCard } from "@/components/ui";

const BrandListPage: React.FC = () => {
  return (
    <CustomCard
      title="Marka Yönetimi"
      subtitle="Markalarınızı oluşturun, düzenleyin ve yönetin"
      addButtonUrl="/company/brand-detail/add-edit/new"
    >
      <BrandListTable />
    </CustomCard>
  );
};

export default BrandListPage;
