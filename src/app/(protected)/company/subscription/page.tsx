"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SubscriptionTable } from "./_shared/sections/subscription-table";
import { Button } from "@/components";

const SubscriptionPage: React.FC = () => {
  const router = useRouter();

  const handleAddSubscription = () => {
    router.push("/company/subscription/add-edit/new");
  };

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h2 className="mb-8">Üyelik Planları Yönetimi</h2>
            <p className="text-neutral-600 mb-0">
              Üyelik planlarını yönetin, düzenleyin ve yeni plan oluşturun
            </p>
          </div>
          <Button
            variant="inline"
            size="sm"
            rightIcon="ph-plus"
            onClick={handleAddSubscription}
          >
            Yeni Plan
          </Button>
        </div>

        <span className="d-block border border-neutral-30 my-20 border-dashed" />

        <SubscriptionTable />
      </div>
    </div>
  );
};

export default SubscriptionPage;
