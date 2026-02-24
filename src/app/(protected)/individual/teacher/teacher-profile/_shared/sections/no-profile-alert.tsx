"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

/**
 * Öğretmen profili olmadığında gösterilen uyarı bileşeni
 */
export const NoProfileAlert: React.FC = () => {
  const router = useRouter();

  const handleCreateProfile = () => {
    router.push("/individual/teacher/teacher-profile/add-edit/new");
  };

  return (
    <div className="text-center py-48">
      <i
        className="ph-duotone ph-user-circle text-warning-600 mb-24"
        style={{ fontSize: "80px" }}
      ></i>
      <h5 className="mb-12 text-neutral-900">Öğretmen Profili Oluşturun</h5>
      <p
        className="text-neutral-600 mb-32 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        İş ilanlarına başvuru yapabilmek için önce profilinizi oluşturmanız
        gerekmektedir. Profilinizde deneyimlerinizi, eğitim bilgilerinizi ve
        daha fazlasını paylaşabilirsiniz.
      </p>
      <Button variant="inline" onClick={handleCreateProfile}>
        <i className="ph ph-user-plus me-2"></i>
        Profil Oluştur
      </Button>
    </div>
  );
};
