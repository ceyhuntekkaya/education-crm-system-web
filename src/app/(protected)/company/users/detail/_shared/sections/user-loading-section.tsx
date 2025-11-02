"use client";
import React from "react";
import { LoadingSpinner } from "@/components";

export const UserLoadingSection: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <LoadingSpinner
        message="Kullanıcı bilgileri yükleniyor..."
        size="lg"
        variant="dots"
      />
    </div>
  );
};
