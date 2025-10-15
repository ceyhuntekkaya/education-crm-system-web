"use client";

import React from "react";
import { CustomCard, LoadingSpinner } from "@/components/ui";
import { useMessageDetail, useMessageSections } from "./_shared";

/**
 * Message detay bilgilerini gösteren sayfa bileşeni
 */
const MessageDetailPage: React.FC = () => {
  const { message, isLoading, error } = useMessageDetail();

  // Ana section'ları oluştur - hook'u en üstte çağırıyoruz
  const allSections = useMessageSections(message);

  if (isLoading) {
    return (
      <CustomCard title="Mesaj Detayı">
        <LoadingSpinner message="Mesaj bilgisi yükleniyor..." />
      </CustomCard>
    );
  }

  if (error) {
    return (
      <CustomCard
        title="Hata"
        bgColor="bg-danger-25"
        border="border border-danger-30"
      >
        <div className="text-center py-8">
          <i className="ph ph-warning-circle text-danger fs-2 mb-3"></i>
          <p className="text-danger mb-0">
            Mesaj bilgisi yüklenirken hata oluştu: {error}
          </p>
        </div>
      </CustomCard>
    );
  }

  if (!message) {
    return (
      <CustomCard title="Bilgi">
        <div className="text-center py-8">
          <i className="ph ph-info text-neutral-500 fs-2 mb-3"></i>
          <p className="text-neutral-600 mb-0">Mesaj bilgisi bulunamadı.</p>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard
      title="Mesaj Detayı"
      subtitle={`Mesaj bilgilerini detaylı olarak görüntüleyin - ${
        message.referenceNumber || message.subject
      }`}
      multiItems={allSections}
    >
      {/* İsteğe bağlı olarak özel içerik buraya eklenebilir */}
    </CustomCard>
  );
};

export default MessageDetailPage;
