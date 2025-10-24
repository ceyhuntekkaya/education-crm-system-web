"use client";

import React from "react";
import Image from "next/image";
import { LoadingStateProps } from "../types/component.types";

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Dosyalar yükleniyor...",
  subMessage = "Lütfen bekleyin, dosyalarınız işleniyor",
}) => {
  return (
    <div className="d-flex flex-column align-items-center gap-8">
      <div
        className="position-relative"
        style={{ width: "80px", height: "80px" }}
      >
        <Image
          src="/assets/images/icons/preloader.gif"
          alt="Loading..."
          width={80}
          height={80}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
      <div className="text-center">
        <div className="fw-medium text-main-600">{message}</div>
        <div className="text-sm text-neutral-500 mt-4">{subMessage}</div>
      </div>
    </div>
  );
};
