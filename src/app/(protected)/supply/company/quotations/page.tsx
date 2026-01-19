"use client";

import React from "react";

import { usePageTitle } from "@/hooks";
import { Results } from "./_shared";

const QuotationsPage: React.FC = () => {
  usePageTitle("Teklifler");

  return (
    <div className="d-flex flex-column gap-24">
      {/* Results */}
      <Results />
    </div>
  );
};

export default QuotationsPage;
