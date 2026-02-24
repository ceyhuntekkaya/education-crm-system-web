"use client";

import React from "react";
import { Footer } from "@/components";
import { IndividualHeader } from "../_shared/sections/header";

const IndividualCompanyLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="individual-company-layout d-flex flex-column min-vh-100 gap-24">
      <IndividualHeader />
      <main className="container mx-auto main-content flex-fill">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default IndividualCompanyLayout;
