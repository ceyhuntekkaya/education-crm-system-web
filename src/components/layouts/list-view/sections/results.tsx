"use client";

import React from "react";
import { useListViewContext } from "../contexts";
import { LoadingState, EmptyState } from "../components";
import { DataGrid } from "@/components/ui/data-grid";
import type { GridColDef } from "@/components/ui/data-grid";
import type { CardRenderProps } from "../types";

interface ResultsProps<T extends Record<string, any> = any> {
  data: T[];
  loading?: boolean;
  renderCard?: (props: CardRenderProps<T>) => React.ReactNode;
  columns?: GridColDef<T>[];
  gridCol?: 1 | 2 | 3 | 4 | 6;
  gridClassName?: string;
  cardClassName?: string;
  listClassName?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateIcon?: string;
  emptyStateAction?: {
    label: string;
    onClick: () => void;
  };
  loadingText?: string;
  customLoadingState?: React.ReactNode;
  customEmptyState?: React.ReactNode;
}

/**
 * 📊 RESULTS
 * Data gösterim bölümü (Grid veya List)
 */
export function Results<T extends Record<string, any>>({
  data,
  loading,
  renderCard,
  columns,
  gridCol,
  gridClassName,
  cardClassName,
  listClassName,
  emptyStateTitle,
  emptyStateDescription,
  emptyStateIcon,
  emptyStateAction,
  loadingText,
  customLoadingState,
  customEmptyState,
}: ResultsProps<T>) {
  const { viewMode } = useListViewContext();

  // gridCol prop'u varsa, otomatik className üret
  const computedGridClassName = gridCol
    ? "row row-gap-24"
    : gridClassName || "row row-gap-24";

  const computedCardClassName = gridCol
    ? `col-${gridCol}`
    : cardClassName || "col-12 col-md-6 col-lg-4";

  // 1️⃣ Loading State
  if (loading) {
    if (customLoadingState) {
      return <>{customLoadingState}</>;
    }
    return <LoadingState text={loadingText} />;
  }

  // 2️⃣ Empty State
  if (!data || data.length === 0) {
    if (customEmptyState) {
      return <>{customEmptyState}</>;
    }
    return (
      <EmptyState
        title={emptyStateTitle}
        description={emptyStateDescription}
        icon={emptyStateIcon}
        action={emptyStateAction}
      />
    );
  }

  // 3️⃣ Grid View
  if (viewMode === "grid") {
    if (!renderCard) {
      console.warn("PageLayout: renderCard prop is required for grid view");
      return null;
    }

    return (
      <div className={computedGridClassName}>
        {data.map((item, index) => {
          const cardProps: CardRenderProps<T> = { item, index };
          return (
            <div key={index} className={computedCardClassName}>
              {renderCard(cardProps)}
            </div>
          );
        })}
      </div>
    );
  }

  // 4️⃣ List View (DataGrid)
  if (!columns || columns.length === 0) {
    console.warn("PageLayout: columns prop is required for list view");
    return null;
  }

  return (
    <DataGrid
      columns={columns}
      rows={data}
      loading={loading}
      disableRowSelectionOnClick
      emptyState={{
        icon: emptyStateIcon || "ph-package",
        title: emptyStateTitle || "Veri Bulunamadı",
        description: emptyStateDescription || "Henüz veri bulunmamaktadır.",
        showActions: false,
      }}
    />
  );
}
