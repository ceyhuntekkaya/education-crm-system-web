"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { Header, Results } from "./_shared";
import { RFQHeaderSection } from "../../detail/[id]/_shared";

/**
 * RFQ Comparison Page
 *
 * Teklifleri karşılaştırma sayfası
 */
const ComparisonPage: React.FC = () => {
  usePageTitle("Teklif Karşılaştırma");

  return (
    <div className="comparison-page">
      {/* RFQ Header Section */}
      <RFQHeaderSection />

      <div className="d-flex flex-column gap-24">
        {/* Header */}
        <Header />
        {/* Results */}
        <Results />
      </div>
    </div>
  );
};

export default ComparisonPage;
