"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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
  const expandedCardRef = useRef<HTMLDivElement | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const pendingCardIdRef = useRef<string | null>(null);

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
    // Aynı karta tıklandıysa kapat
    if (expandedCardId === institutionId) {
      setExpandedCardId(null);
      setShouldScroll(false);
      pendingCardIdRef.current = null;
      return;
    }

    // Eğer başka bir kart zaten açıksa, önce kapat sonra yeni kartı aç
    if (expandedCardId !== null) {
      pendingCardIdRef.current = institutionId;
      setExpandedCardId(null);
      setShouldScroll(false);
      return;
    }

    // Hiçbir kart açık değilse direkt aç
    setExpandedCardId(institutionId);
    setShouldScroll(true);
  };

  // Pending card'ı açmak için useEffect
  useEffect(() => {
    if (expandedCardId === null && pendingCardIdRef.current !== null) {
      const pendingId = pendingCardIdRef.current;
      pendingCardIdRef.current = null;

      // Kısa bir gecikme ile yeni kartı aç
      const timer = setTimeout(() => {
        setExpandedCardId(pendingId);
        setShouldScroll(true);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [expandedCardId]);

  // Ref callback - element DOM'a eklendiğinde scroll yap
  const setExpandedCardRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      expandedCardRef.current = node;
      if (node && shouldScroll) {
        // DOM'a eklendikten sonra scroll yap
        requestAnimationFrame(() => {
          const headerOffset = window.innerWidth <= 768 ? 25 : 100;
          const elementPosition = node.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          setShouldScroll(false);
        });
      }
    },
    [shouldScroll]
  );

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
          ref={setExpandedCardRefCallback}
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
