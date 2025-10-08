"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SurveyTable } from "./_shared/sections/survey-table";
import { Button } from "@/components";

const SurveyPage: React.FC = () => {
  const router = useRouter();

  const handleAddSurvey = () => {
    router.push("/company/survey/add-edit/new");
  };

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h2 className="mb-8">Anket Yönetimi</h2>
            <p className="text-neutral-600 mb-0">
              Anketlerinizi yönetin, düzenleyin ve yeni anket oluşturun
            </p>
          </div>
          <Button
            variant="inline"
            size="sm"
            rightIcon="ph-plus"
            onClick={handleAddSurvey}
          >
            Yeni Anket
          </Button>
        </div>

        <span className="d-block border border-neutral-30 my-20 border-dashed" />

        <SurveyTable />
      </div>
    </div>
  );
};

export default SurveyPage;
