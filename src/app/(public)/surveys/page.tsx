"use client";
import React from "react";
import { SurveyListTable } from "./_shared/sections";
import { CustomCard } from "@/components/ui";

const SurveyListPage: React.FC = () => {
  return (
    <div className="container py-40">
      <CustomCard
        title="Anketlerim"
        subtitle="Size atanan anketleri görüntüleyebilirsiniz"
      >
        <SurveyListTable />
      </CustomCard>
    </div>
  );
};

export default SurveyListPage;
