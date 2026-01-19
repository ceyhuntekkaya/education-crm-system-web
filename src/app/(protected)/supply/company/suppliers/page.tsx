"use client";

import React from "react";

import { usePageTitle } from "@/hooks";
import { Header, Results } from "./_shared";

const SuppliersPage: React.FC = () => {
  usePageTitle("Tedarikçiler");

  return (
    <div className="d-flex flex-column gap-24">
      {/* Results Header */}
      <Header />
      {/* Results */}
      <Results />
    </div>
  );
};

export default SuppliersPage;
