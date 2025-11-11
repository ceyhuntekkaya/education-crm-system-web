"use client";

import React from "react";

interface SkeletonCardProps {
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="institution-card-skeleton bg-white rounded-12 p-20 box-shadow-md ">
        {/* Cover Image Skeleton */}
        <div
          className="skeleton skeleton-image rounded-8 mb-16"
          style={{ height: "160px", width: "100%" }}
        ></div>

        {/* Header Skeleton */}
        <div className="d-flex align-items-start gap-12 mb-16">
          {/* Logo Skeleton */}
          <div
            className="skeleton skeleton-circle flex-shrink-0"
            style={{ width: "48px", height: "48px" }}
          ></div>

          <div className="flex-grow-1">
            {/* Title Skeleton */}
            <div
              className="skeleton skeleton-text mb-8"
              style={{ height: "20px", width: "80%" }}
            ></div>
            {/* Subtitle Skeleton */}
            <div
              className="skeleton skeleton-text"
              style={{ height: "14px", width: "60%" }}
            ></div>
          </div>
        </div>

        {/* Stats Row Skeleton */}
        <div className="d-flex gap-16 mb-16">
          <div
            className="skeleton skeleton-text"
            style={{ height: "14px", width: "30%" }}
          ></div>
          <div
            className="skeleton skeleton-text"
            style={{ height: "14px", width: "30%" }}
          ></div>
          <div
            className="skeleton skeleton-text"
            style={{ height: "14px", width: "30%" }}
          ></div>
        </div>

        {/* Description Skeleton */}
        <div className="mb-16">
          <div
            className="skeleton skeleton-text mb-6"
            style={{ height: "14px", width: "100%" }}
          ></div>
          <div
            className="skeleton skeleton-text mb-6"
            style={{ height: "14px", width: "90%" }}
          ></div>
          <div
            className="skeleton skeleton-text"
            style={{ height: "14px", width: "70%" }}
          ></div>
        </div>

        {/* Pills/Tags Skeleton */}
        <div className="d-flex gap-8 flex-wrap mb-16">
          <div
            className="skeleton skeleton-pill"
            style={{ height: "28px", width: "80px" }}
          ></div>
          <div
            className="skeleton skeleton-pill"
            style={{ height: "28px", width: "100px" }}
          ></div>
          <div
            className="skeleton skeleton-pill"
            style={{ height: "28px", width: "90px" }}
          ></div>
        </div>

        {/* Footer Actions Skeleton */}
        <div className="d-flex justify-content-between align-items-center pt-16 border-top border-neutral-100">
          <div
            className="skeleton skeleton-text"
            style={{ height: "18px", width: "40%" }}
          ></div>
          <div className="d-flex gap-8">
            <div
              className="skeleton skeleton-circle"
              style={{ width: "36px", height: "36px" }}
            ></div>
            <div
              className="skeleton skeleton-circle"
              style={{ width: "36px", height: "36px" }}
            ></div>
          </div>
        </div>
      </div>

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

        .skeleton-circle {
          border-radius: 50%;
        }

        .skeleton-image {
          border-radius: 8px;
        }

        .skeleton-pill {
          border-radius: 20px;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .institution-card-skeleton {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default SkeletonCard;
