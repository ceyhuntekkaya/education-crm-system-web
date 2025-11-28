"use client";
import React from "react";
import { BrandListTable } from "./_shared/sections";
import { CustomCard } from "@/components/ui";
import { usePageTitle } from "@/hooks";

const BrandListPage: React.FC = () => {
  usePageTitle("Markalar");
  return (
    <CustomCard
      title="Marka Yönetimi"
      subtitle="Markalarınızı oluşturun, düzenleyin ve yönetin"
      addButtonUrl="/company/brands/add-edit/new"
    >
      <BrandListTable />
    </CustomCard>
  );
};

export default BrandListPage;
