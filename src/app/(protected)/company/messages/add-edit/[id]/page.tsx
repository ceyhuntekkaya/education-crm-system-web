"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components";

const MessageAddEditPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const messageId = params.id as string;
  const isEditing = messageId && messageId !== "new";

  const handleBack = () => {
    router.push("/company/messages");
  };

  const handleSave = () => {
    // Save logic here
    console.log("Saving message...");
    router.push("/company/messages");
  };

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-24">
          <div>
            <h2 className="mb-8">
              {isEditing ? "Mesajı Düzenle" : "Yeni Mesaj Oluştur"}
            </h2>
            <p className="text-neutral-600 mb-0">
              {isEditing
                ? "Mevcut mesaj bilgilerini güncelleyin"
                : "Yeni bir mesaj oluşturun ve gönderin"}
            </p>
          </div>
          <div className="d-flex gap-2">
            <Button variant="outline" size="sm" onClick={handleBack}>
              İptal
            </Button>
            <Button variant="inline" size="sm" onClick={handleSave}>
              {isEditing ? "Güncelle" : "Oluştur"}
            </Button>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <p className="text-center text-muted">
                  Mesaj ekleme/düzenleme formu buraya gelecek.
                  <br />
                  Message ID: {messageId || "new"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageAddEditPage;
