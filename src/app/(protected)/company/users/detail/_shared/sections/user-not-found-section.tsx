"use client";
import React from "react";
import { CustomCard } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const UserDetailNotFoundSection: React.FC = () => {
  const router = useRouter();

  return (
    <CustomCard>
      <div className="text-center py-5">
        <i
          className="ph ph-user-circle-slash text-muted"
          style={{ fontSize: "48px" }}
        ></i>
        <h4 className="mt-3">Kullanıcı Bulunamadı</h4>
        <p className="text-muted">Aradığınız kullanıcı bulunamadı.</p>
        <Button onClick={() => router.push("/company/users")} className="mt-3">
          Kullanıcı Listesine Dön
        </Button>
      </div>
    </CustomCard>
  );
};
