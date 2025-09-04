"use client";

import { useState } from "react";
import useInstitutionSearch from "../_hooks/use-institution-search-hook";
import { InstitutionCard } from "./institution-card";
import Pagination from "./pagination";

const CARD_PER_ROW = 3;

function getRowIndex(index: number) {
  return Math.floor(index / CARD_PER_ROW);
}

function getExpandedIndex(institutions: any[], expandedCardId: string | null) {
  if (!expandedCardId) return -1;
  return institutions.findIndex(
    (inst) => inst.id?.toString() === expandedCardId
  );
}

function getCardClasses({
  isExpanded,
  expandedRow,
  currentRow,
  expandedCardId,
}: {
  isExpanded: boolean;
  expandedRow: number;
  currentRow: number;
  expandedCardId: string | null;
}) {
  const colClass = isExpanded ? "col-12" : "col-md-4 col-sm-6 col-xs-6";
  const orderClass = (() => {
    if (isExpanded) {
      return `order-${expandedRow * 2 + 1}`;
    } else if (expandedCardId && expandedRow === currentRow) {
      return `order-${currentRow * 2 + 2}`;
    } else if (expandedCardId && expandedRow !== -1) {
      return currentRow < expandedRow
        ? `order-${currentRow * 2 + 1}`
        : `order-${currentRow * 2 + 3}`;
    }
    return "";
  })();
  return `${colClass} ${orderClass} grid-item-transition`.trim();
}

const Results = () => {
  const { institutions } = useInstitutionSearch();
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const handleCardClick = (institutionId: string) => {
    const newExpandedId =
      expandedCardId === institutionId ? null : institutionId;
    setExpandedCardId(newExpandedId);
  };

  return (
    <div>
      <div className="row gy-24">
        {institutions.map((institution, index) => {
          const idStr = institution.id?.toString() || "";
          const isExpanded = expandedCardId === idStr;
          const expandedIndex = getExpandedIndex(institutions, expandedCardId);
          const currentRow = getRowIndex(index);
          const expandedRow =
            expandedIndex !== -1 ? getRowIndex(expandedIndex) : -1;

          const cardClass = getCardClasses({
            isExpanded,
            expandedRow,
            currentRow,
            expandedCardId,
          });

          return (
            <InstitutionCard
              key={institution.id}
              institution={institution}
              className={cardClass}
              isExpanded={isExpanded}
              onCardClick={() => handleCardClick(idStr)}
            />
          );
        })}
      </div>
      <Pagination />
    </div>
  );
};

export default Results;
