"use client";

import React from "react";
import { AppointmentDetailSection } from "./_shared";
import { usePageTitle } from "@/hooks";

/**
 * Randevu detay sayfası
 */
const AppointmentDetailPage: React.FC = () => {
  usePageTitle("Müsaitlik Detayı");
  return <AppointmentDetailSection />;
};

export default AppointmentDetailPage;
