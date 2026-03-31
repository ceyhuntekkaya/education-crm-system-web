"use client";

import React from "react";

interface LoadingStateProps {
  text?: string;
  /** Grid column class (e.g. "col-6") */
  gridCol?: 1 | 2 | 3 | 4 | 6;
  /** Custom card class (e.g. "col-12 col-md-6 col-lg-4") */
  cardClassName?: string;
  /** Number of skeleton cards to show */
  count?: number;
}

/**
 * 📦 SKELETON CARD
 * Tek bir skeleton kart
 */
const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-12 p-20 box-shadow-md">
      {/* Image Skeleton */}
      <div
        className="skeleton-loader rounded-8 mb-16"
        style={{ height: "160px", width: "100%" }}
      />

      {/* Header Skeleton */}
      <div className="d-flex align-items-start gap-12 mb-16">
        <div
          className="skeleton-loader flex-shrink-0"
          style={{ width: "44px", height: "44px", borderRadius: "50%" }}
        />
        <div className="flex-grow-1">
          <div
            className="skeleton-loader mb-8"
            style={{ height: "18px", width: "75%" }}
          />
          <div
            className="skeleton-loader"
            style={{ height: "14px", width: "50%" }}
          />
        </div>
      </div>

      {/* Stats Row Skeleton */}
      <div className="d-flex gap-12 mb-16">
        <div
          className="skeleton-loader"
          style={{ height: "14px", width: "30%" }}
        />
        <div
          className="skeleton-loader"
          style={{ height: "14px", width: "30%" }}
        />
        <div
          className="skeleton-loader"
          style={{ height: "14px", width: "25%" }}
        />
      </div>

      {/* Description Skeleton */}
      <div className="mb-16">
        <div
          className="skeleton-loader mb-6"
          style={{ height: "14px", width: "100%" }}
        />
        <div
          className="skeleton-loader mb-6"
          style={{ height: "14px", width: "85%" }}
        />
        <div
          className="skeleton-loader"
          style={{ height: "14px", width: "60%" }}
        />
      </div>

      {/* Tags Skeleton */}
      <div className="d-flex gap-8 flex-wrap">
        <div
          className="skeleton-loader"
          style={{ height: "26px", width: "72px", borderRadius: "20px" }}
        />
        <div
          className="skeleton-loader"
          style={{ height: "26px", width: "96px", borderRadius: "20px" }}
        />
        <div
          className="skeleton-loader"
          style={{ height: "26px", width: "84px", borderRadius: "20px" }}
        />
      </div>
    </div>
  );
};

/**
 * 📦 LOADING STATE
 * Skeleton kart grid'i ile yükleniyor durumu
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  gridCol,
  cardClassName,
  count,
}) => {
  // gridCol'a göre satır başına kart sayısı hesapla
  const cardsPerRow = gridCol ? Math.floor(12 / gridCol) : 3;
  // 2 satır skeleton göster
  const skeletonCount = count ?? cardsPerRow * 2;

  const computedCardClassName = gridCol
    ? `col-${gridCol}`
    : cardClassName || "col-12 col-md-6 col-lg-4";

  return (
    <div className="row row-gap-24">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div key={`skeleton-${index}`} className={computedCardClassName}>
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
};
