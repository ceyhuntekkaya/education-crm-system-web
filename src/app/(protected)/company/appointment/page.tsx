"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { AppointmentTable } from "./_shared";
import { Button } from "@/components";
import { usePageTitle } from "@/hooks";

const AppointmentPage: React.FC = () => {
  usePageTitle("Randevular");
  const router = useRouter();

  const handleAddAppointment = () => {
    router.push("/company/appointment/add-edit/new");
  };

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h2 className="mb-8">Randevu Bilgileri Yönetimi</h2>
            <p className="text-neutral-600 mb-0">
              Randevu bilgilerinizi görüntüleyin, düzenleyin ve yönetin
            </p>
          </div>
          <Button
            variant="inline"
            size="sm"
            rightIcon="ph-plus"
            onClick={handleAddAppointment}
          >
            Yeni Randevu
          </Button>
        </div>

        <span className="d-block border border-neutral-30 my-20 border-dashed" />

        <AppointmentTable />
      </div>
    </div>
  );
};

export default AppointmentPage;
