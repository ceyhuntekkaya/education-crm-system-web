"use client";
import React from "react";
import { CustomFeesTable } from "./_shared/sections";
import { CustomCard } from "@/components/ui";
import { usePageTitle } from "@/hooks";

const CustomFeesPage: React.FC = () => {
  usePageTitle("Özel Ücretler");
  return (
    <CustomCard
      title="Ek Ücretler Yönetimi"
      subtitle="Ek ücret bilgilerinizi oluşturun, düzenleyin ve yönetin"
      addButtonUrl="/company/custom-fees/add-edit/new"
    >
      <CustomFeesTable />
    </CustomCard>
  );
};

export default CustomFeesPage;
