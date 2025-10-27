"use client";
import React from "react";
import { CustomFeesTable } from "./_shared/sections";
import { CustomCard } from "@/components/ui";

const CustomFeesPage: React.FC = () => {
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
