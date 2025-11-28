"use client";
import React from "react";
import { SchoolTable } from "./_shared";
import { CustomCard } from "@/components";
import { usePageTitle } from "@/hooks";

const SchoolListPage: React.FC = () => {
  usePageTitle("Okul Listesi");
  return (
    <CustomCard
      title="Okul Listesi Yönetimi"
      subtitle="Okul bilgilerinizi görüntüleyin, düzenleyin ve yönetin"
      addButtonUrl="/company/school-list/add-edit/new"
    >
      <SchoolTable />
    </CustomCard>
  );
};

export default SchoolListPage;
