"use client";

import React from "react";

interface SocialMediaAddEditPageProps {
  params: {
    id: string;
  };
}

const SocialMediaAddEditPage: React.FC<SocialMediaAddEditPageProps> = ({
  params,
}) => {
  const { id } = params;
  const isNew = id === "new";

  return (
    <div>
      <h1 className="h3 mb-24">
        {isNew ? "Yeni Gönderi Oluştur" : "Gönderi Düzenle"}
      </h1>
      <div className="card">
        <div className="card-body">
          <p className="text-muted">
            {isNew
              ? "Yeni sosyal medya gönderisi oluşturma formu burada yer alacak."
              : `ID: ${id} olan gönderiyi düzenleme formu burada yer alacak.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaAddEditPage;
