"use client";

import React from "react";
import { CustomCard } from "@/components";

interface LoadingSectionProps {
  pageTitle?: string;
}

export const LoadingSection: React.FC<LoadingSectionProps> = ({
  pageTitle = "Yükleniyor...",
}) => {
  return (
    <CustomCard title={pageTitle} isBack>
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    </CustomCard>
  );
};
