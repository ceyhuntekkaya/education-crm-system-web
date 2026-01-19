"use client";

import React from "react";
import { SkeletonCard } from "@/components/ui";
import { useRFQInvitationsContext } from "../contexts";

/**
 * 🔄 LOADING STATE COMPONENT
 * Davet edilen tedarikçiler yüklenirken gösterilen skeleton kartlar
 */
export const LoadingState: React.FC = () => {
  const { viewMode } = useRFQInvitationsContext();

  // Grid View Loading
  if (viewMode === "grid") {
    return (
      <div className="row row-gap-24">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-4">
            <SkeletonCard />
          </div>
        ))}
      </div>
    );
  }

  // List View Loading (Table Skeleton)
  return (
    <div
      className="bg-white rounded-16 transition-all"
      style={{
        border: "1.5px solid hsl(var(--neutral-40))",
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        padding: "20px",
      }}
    >
      {/* Table Header Skeleton */}
      <div
        className="d-flex align-items-center gap-12 mb-16 pb-12"
        style={{ borderBottom: "1px solid hsl(var(--neutral-100))" }}
      >
        <div
          className="skeleton skeleton-text"
          style={{ height: "16px", width: "60px" }}
        ></div>
        <div
          className="skeleton skeleton-text"
          style={{ height: "16px", width: "180px" }}
        ></div>
        <div
          className="skeleton skeleton-text flex-grow-1"
          style={{ height: "16px", width: "200px" }}
        ></div>
        <div
          className="skeleton skeleton-text"
          style={{ height: "16px", width: "140px" }}
        ></div>
      </div>

      {/* Table Rows Skeleton */}
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="d-flex align-items-center gap-12 py-16"
          style={{
            borderBottom:
              index < 7 ? "1px solid hsl(var(--neutral-50))" : "none",
          }}
        >
          <div
            className="skeleton skeleton-text"
            style={{ height: "14px", width: "60px" }}
          ></div>
          <div
            className="skeleton skeleton-text"
            style={{ height: "14px", width: "180px" }}
          ></div>
          <div
            className="skeleton skeleton-text flex-grow-1"
            style={{ height: "14px", width: "200px" }}
          ></div>
          <div
            className="skeleton skeleton-text"
            style={{ height: "14px", width: "140px" }}
          ></div>
        </div>
      ))}

      <style jsx>{`
        .skeleton {
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: loading 1.5s ease-in-out infinite;
        }

        .skeleton-text {
          border-radius: 4px;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
};
