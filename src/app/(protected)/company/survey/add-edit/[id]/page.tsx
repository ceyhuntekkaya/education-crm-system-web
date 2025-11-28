"use client";

import React from "react";
import { usePageTitle } from "@/hooks";

interface SurveyAddEditPageProps {
  params: {
    id: string;
  };
}

const SurveyAddEditPage: React.FC<SurveyAddEditPageProps> = ({ params }) => {
  usePageTitle("Anket Düzenle");
  const { id } = params;
  const isNew = id === "new";

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        <h2 className="mb-24">
          {isNew ? "Yeni Anket Oluştur" : "Anket Düzenle"}
        </h2>
        <div className="card">
          <div className="card-body">
            <p className="text-muted">
              {isNew
                ? "Yeni anket oluşturma formu burada yer alacak."
                : `ID: ${id} olan anketi düzenleme formu burada yer alacak.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyAddEditPage;
