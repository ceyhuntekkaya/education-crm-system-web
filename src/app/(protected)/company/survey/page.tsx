"use client";

import React from "react";
import { SurveyTable } from "./_shared/sections/survey-table";
import { CustomCard } from "@/components";

const SurveyPage: React.FC = () => {
  return (
    <CustomCard
      title="Anket Yönetimi"
      subtitle="Anketlerinizi yönetin, düzenleyin ve yeni anket oluşturun"
    >
      <SurveyTable />
    </CustomCard>
  );
};

export default SurveyPage;
