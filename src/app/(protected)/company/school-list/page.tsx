"use client";
import React from "react";
import { SchoolTable } from "./_shared";
import { CustomCard } from "@/components";
import { usePageTitle } from "@/hooks";

const SchoolListPage: React.FC = () => {
  usePageTitle("Kurum Listesi");
  return (
    <CustomCard
      title="Kurum Listesi Yönetimi"
      subtitle="Kurum bilgilerinizi görüntüleyin, düzenleyin ve yönetin"
      addButtonUrl="/company/school-list/add-edit/new"
    >
      <SchoolTable />
    </CustomCard>
  );
};

export default SchoolListPage;
