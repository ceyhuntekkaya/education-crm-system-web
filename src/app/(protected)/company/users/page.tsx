"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { UsersTable } from "./_shared/sections/users-table";
import { Button } from "@/components";

const UsersPage: React.FC = () => {
  const router = useRouter();

  const handleAddUser = () => {
    router.push("/company/users/add-edit/new");
  };

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h2 className="mb-8">Kullanıcı Yönetimi</h2>
            <p className="text-neutral-600 mb-0">
              Sistem kullanıcılarını yönetin, düzenleyin ve yeni kullanıcı
              ekleyin
            </p>
          </div>
          <Button
            variant="inline"
            size="sm"
            rightIcon="ph-plus"
            onClick={handleAddUser}
          >
            Yeni Kullanıcı
          </Button>
        </div>

        <span className="d-block border border-neutral-30 my-20 border-dashed" />

        <UsersTable />
      </div>
    </div>
  );
};

export default UsersPage;
