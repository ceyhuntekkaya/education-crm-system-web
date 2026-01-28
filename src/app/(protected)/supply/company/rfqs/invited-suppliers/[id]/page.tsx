"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { Header, Results } from "./_shared";
import { RFQHeaderSection } from "../../_shared";

const RFQInvitedSuppliersPage: React.FC = () => {
  usePageTitle("Davet Edilen Tedarikçiler");

  return (
    <>
      {/* RFQ Header Section */}
      <RFQHeaderSection />

      <div className="d-flex flex-column gap-24">
        {/* Results Header */}
        <Header />
        {/* Results */}
        <Results />
      </div>
    </>
  );
};

export default RFQInvitedSuppliersPage;
