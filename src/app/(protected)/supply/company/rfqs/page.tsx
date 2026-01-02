"use client";

import React from "react";

import { usePageTitle } from "@/hooks";
import { Results } from "./_shared";

const RFQsPage: React.FC = () => {
  usePageTitle("Fiyat Teklifleri");

  return (
    <div className="d-flex flex-column gap-24">
      {/* Results */}
      <Results />
    </div>
  );
};

export default RFQsPage;
