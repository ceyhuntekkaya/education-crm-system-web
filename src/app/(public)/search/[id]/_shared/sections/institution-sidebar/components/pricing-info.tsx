import React from "react";
import { useInstitutionSidebarData } from "../hooks/useInstitutionSidebarData";

export const PricingInfo: React.FC = () => {
  const { school } = useInstitutionSidebarData();

  return (
    <div className="bg-main-50 rounded-8 p-16 mb-20">
      <div className="text-center">
        <div className="text-neutral-500 text-sm mb-4">
          <span className="fw-medium text-main-600">Aylık Ücret:</span>{" "}
          {school.monthlyFee?.toLocaleString("tr-TR")} ₺
        </div>
        <div className="text-neutral-500 text-sm">
          <span className="fw-medium text-main-600">Yıllık Ücret:</span>{" "}
          {school.annualFee?.toLocaleString("tr-TR")} ₺
        </div>
        {school.registrationFee && (
          <div className="text-neutral-500 text-sm mt-4">
            <span className="fw-medium text-main-600">Kayıt Ücreti:</span>{" "}
            {school.registrationFee?.toLocaleString("tr-TR")} ₺
          </div>
        )}
      </div>
    </div>
  );
};
