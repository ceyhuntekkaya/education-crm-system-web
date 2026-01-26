"use client";

import React from "react";
import { Header, Results } from "./_shared";
import { RFQHeaderSection } from "../../detail/[id]/_shared";

const QuotationsPage: React.FC = () => {
  return (
    <>
      {/* RFQ Header Section */}
      <RFQHeaderSection />

      <div className="d-flex flex-column gap-24">
        <Header />
        <Results />
      </div>
    </>
  );
};

export default QuotationsPage;
