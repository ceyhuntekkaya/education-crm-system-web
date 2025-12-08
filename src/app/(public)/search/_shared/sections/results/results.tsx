"use client";

import { useRef, useState } from "react";
import { InstitutionCard } from "../institution-card/institution-card";
import { SchoolSearchResultDto } from "@/types/dto/institution/InstitutionSearch.types";
import { LoadingState } from "@/components/ui/loadings";
import NoResults from "./no-results";
import { Pagination } from "../pagination";
import { SearchPaginationState } from "../../types";

const CARDS_PER_ROW = 3;
const ANIMATION_DELAY_INCREMENT = 100;

interface ResultsProps {
  institutions: SchoolSearchResultDto[];
  loading?: boolean;
  pagination?: SearchPaginationState;
  showPagination?: boolean;
}

const Results = ({
  institutions,
  loading = false,
  pagination,
  showPagination = true,
}: ResultsProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

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

    // Scroll işlemi - kısa bir delay ile
    setTimeout(() => {
      if (scrollRef.current) {
        const element = scrollRef.current;
        const y = element.getBoundingClientRect().top + window.scrollY - 125;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  // Loading state - skeleton cards göster
  if (loading) {
    return <LoadingState count={6} />;
  }

  // No results state
  if (!loading && institutions.length === 0) {
    return <NoResults />;
  }

  // Split institutions into rows
  const rows: SchoolSearchResultDto[][] = [];
  for (let i = 0; i < institutions.length; i += CARDS_PER_ROW) {
    rows.push(institutions.slice(i, i + CARDS_PER_ROW));
  }

  const renderRow = (row: SchoolSearchResultDto[], rowIdx: number) => {
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
          ref={scrollRef}
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
        ref={scrollRef}
      />
    ));
  };

  return (
    <div>
      <div className="row">
        {rows.map((row: SchoolSearchResultDto[], rowIdx: number) =>
          renderRow(row, rowIdx)
        )}
      </div>

      {/* Pagination */}
      {showPagination && pagination && pagination.totalElements > 0 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          totalElements={pagination.totalElements}
          pageSize={pagination.size}
          onPageChange={pagination.goToPage}
          onPageSizeChange={pagination.changePageSize}
          loading={loading}
          showPageSizeSelector={true}
          showPageInfo={true}
        />
      )}
    </div>
  );
};

export default Results;
