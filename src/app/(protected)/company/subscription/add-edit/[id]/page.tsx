"use client";

import React from "react";
import { usePageTitle } from "@/hooks";

interface SubscriptionAddEditPageProps {
  params: {
    id: string;
  };
}

const SubscriptionAddEditPage: React.FC<SubscriptionAddEditPageProps> = ({
  params,
}) => {
  usePageTitle("Abonelik Düzenle");
  const { id } = params;
  const isNew = id === "new";

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        <h2 className="mb-24">
          {isNew ? "Yeni Üyelik Planı Oluştur" : "Üyelik Planı Düzenle"}
        </h2>
        <div className="card">
          <div className="card-body">
            <p className="text-muted">
              {isNew
                ? "Yeni üyelik planı oluşturma formu burada yer alacak."
                : `ID: ${id} olan üyelik planını düzenleme formu burada yer alacak.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAddEditPage;
