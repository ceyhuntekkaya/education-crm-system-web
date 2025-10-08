"use client";
import React from "react";
import { CampaignTable } from "./_shared";

const CampaignsPage: React.FC = () => {
  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h2 className="mb-8">Kampanya Yönetimi</h2>
            <p className="text-neutral-600 mb-0">
              Kampanyalarınızı oluşturun, düzenleyin ve performanslarını takip
              edin
            </p>
          </div>
        </div>

        <span className="d-block border border-neutral-30 my-20 border-dashed" />

        <CampaignTable />
      </div>
    </div>
  );
};

export default CampaignsPage;
