"use client";

import { useState } from "react";
import useInstitutionSearch from "../_hooks/use-institution-search-hook";
import { InstitutionCard } from "./institution-card";
import Pagination from "./pagination";

const CARDS_PER_ROW = 3;
const ANIMATION_DELAY_INCREMENT = 100;

const Results = () => {
  const { institutions } = useInstitutionSearch();
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Helper functions
  const getRowIndex = (index: number) => Math.floor(index / CARDS_PER_ROW);
  const getAnimationDelay = (index: number) =>
    `${index * ANIMATION_DELAY_INCREMENT}ms`;

  // Calculate expanded card and row indices
  const expandedCardIndex = institutions.findIndex(
    (inst) => inst.id?.toString() === expandedCardId
  );
  const expandedRowIndex =
    expandedCardIndex !== -1 ? getRowIndex(expandedCardIndex) : -1;

  const handleCardClick = (institutionId: string) => {
    // Aynı karta tıklandıysa toggle işlemi yap
    if (expandedCardId === institutionId) {
      setExpandedCardId(null);
      return;
    }

    // Farklı bir karta tıklandıysa direkt olarak aç
    setExpandedCardId(institutionId);
  };

  // Split institutions into rows
  const rows: (typeof institutions)[] = [];
  for (let i = 0; i < institutions.length; i += CARDS_PER_ROW) {
    rows.push(institutions.slice(i, i + CARDS_PER_ROW));
  }

  const renderRow = (row: typeof institutions, rowIdx: number) => {
    // Handle expanded card row
    if (expandedCardId && rowIdx === expandedRowIndex) {
      const expandedCard = row.find(
        (inst) => inst.id?.toString() === expandedCardId
      );
      if (!expandedCard) return null;

      return (
        <InstitutionCard
          key={expandedCard.id}
          institution={expandedCard}
          className="col-12 grid-item-transition card-expand-transition"
          isExpanded={true}
          onCardClick={() => handleCardClick(expandedCard.id?.toString() || "")}
          animationDelay={getAnimationDelay(0)}
        />
      );
    }

    // Handle normal row
    return row.map((institution, idx) => (
      <InstitutionCard
        key={institution.id}
        institution={institution}
        className="col-md-4 col-sm-6 col-xs-6 grid-item-transition mb-24"
        isExpanded={false}
        onCardClick={() => handleCardClick(institution.id?.toString() || "")}
        animationDelay={getAnimationDelay(idx)}
      />
    ));
  };

  return (
    <div>
      <div className="row">
        {rows.map((row: typeof institutions, rowIdx: number) =>
          renderRow(row, rowIdx)
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default Results;
