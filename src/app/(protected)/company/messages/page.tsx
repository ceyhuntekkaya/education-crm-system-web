"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MessagesTable } from "./_shared/sections/messages-table";
import { Button } from "@/components";

const MessagesPage: React.FC = () => {
  const router = useRouter();

  const handleAddMessage = () => {
    router.push("/company/messages/add-edit/new");
  };

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h2 className="mb-8">Mesaj Yönetimi</h2>
            <p className="text-neutral-600 mb-0">
              Gelen mesajları yönetin, yanıtlayın ve takip edin
            </p>
          </div>
          <Button
            variant="inline"
            size="sm"
            rightIcon="ph-plus"
            onClick={handleAddMessage}
          >
            Yeni Mesaj
          </Button>
        </div>

        <span className="d-block border border-neutral-30 my-20 border-dashed" />

        <MessagesTable />
      </div>
    </div>
  );
};

export default MessagesPage;
