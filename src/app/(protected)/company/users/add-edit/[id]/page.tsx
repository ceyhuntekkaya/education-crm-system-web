"use client";

import React from "react";

interface UsersAddEditPageProps {
  params: {
    id: string;
  };
}

const UsersAddEditPage: React.FC<UsersAddEditPageProps> = ({ params }) => {
  const { id } = params;
  const isNew = id === "new";

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        <h2 className="mb-24">
          {isNew ? "Yeni Kullanıcı Oluştur" : "Kullanıcı Düzenle"}
        </h2>
        <div className="card">
          <div className="card-body">
            <p className="text-muted">
              {isNew
                ? "Yeni kullanıcı oluşturma formu burada yer alacak."
                : `ID: ${id} olan kullanıcıyı düzenleme formu burada yer alacak.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersAddEditPage;
