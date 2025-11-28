"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ReportsTable } from "./_shared/sections/reports-table";
import { Button } from "@/components";
import { usePageTitle } from "@/hooks";

const ReportsPage: React.FC = () => {
  usePageTitle("Raporlar");
  const router = useRouter();

  const handleAddReport = () => {
    router.push("/company/reports/add-edit/new");
  };

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h2 className="mb-8">Analitik Raporları Yönetimi</h2>
            <p className="text-neutral-600 mb-0">
              Analitik raporlarınızı görüntüleyin, düzenleyin ve yeni raporlar
              oluşturun
            </p>
          </div>
          <Button
            variant="inline"
            size="sm"
            rightIcon="ph-plus"
            onClick={handleAddReport}
          >
            Yeni Rapor
          </Button>
        </div>

        <span className="d-block border border-neutral-30 my-20 border-dashed" />

        <ReportsTable />
      </div>
    </div>
  );
};

export default ReportsPage;
