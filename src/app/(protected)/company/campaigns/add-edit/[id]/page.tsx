"use client";

import React from "react";
import { Button } from "@/components";
import { useCampaignAddEdit } from "./_shared/context";
import { CampaignForm } from "./_shared/sections";

interface CampaignAddEditPageProps {}

const CampaignAddEditPage: React.FC<CampaignAddEditPageProps> = () => {
  const { isEditMode, campaignId, isLoading, handleSave, handleCancel } =
    useCampaignAddEdit();

  const pageTitle = isEditMode ? "Kampanya Düzenle" : "Yeni Kampanya";
  const pageDescription = isEditMode
    ? "Mevcut kampanyanızı düzenleyin ve güncelleyin"
    : "Yeni bir kampanya oluşturun ve hedef kitlenizi belirleyin";

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        {/* Header Section */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-24">
          <div>
            <h2 className="mb-8">{pageTitle}</h2>
            <p className="text-neutral-600 mb-0">{pageDescription}</p>
          </div>
          <div className="d-flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              İptal
            </Button>
            <Button
              variant="inline"
              size="sm"
              rightIcon="ph-check"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading
                ? "Kaydediliyor..."
                : isEditMode
                ? "Güncelle"
                : "Kaydet"}
            </Button>
          </div>
        </div>

        <span className="d-block border border-neutral-30 my-20 border-dashed" />

        {/* Form Content */}
        <div className="row">
          <div className="col-6">
            <CampaignForm />
          </div>
          <div className="col-6">
            {/* Sağ alan - sonradan doldurulacak */}
            <div className="sticky-top" style={{ top: "20px" }}>
              <div className="bg-white rounded-8 p-24">
                <h4 className="mb-16 text-neutral-400">Sağ Panel</h4>
                <p className="text-neutral-400 text-center py-40">
                  Bu alan sonradan doldurulacak
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignAddEditPage;
