"use client";

import React from "react";
import { Header, Results } from "./_shared";

const QuotationsPage: React.FC = () => {
  return (
    <div className="d-flex flex-column gap-24">
      <Header />
      <Results />
    </div>
  );
};

export default QuotationsPage;
