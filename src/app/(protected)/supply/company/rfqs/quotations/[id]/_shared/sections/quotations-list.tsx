"use client";

import React from "react";
import { useRFQQuotationsContext } from "../contexts";
import { QuotationCard } from "./quotation-card/quotation-card";

export const QuotationsList: React.FC = () => {
  const { filteredQuotations } = useRFQQuotationsContext();

  return (
    <div className="row row-gap-24" style={{ position: "relative", zIndex: 1 }}>
      {filteredQuotations.map((quotation) => (
        <QuotationCard
          key={quotation.quotationId}
          quotation={quotation}
        />
      ))}
    </div>
  );
};
