"use client";

import React from "react";
import SkeletonCard from "./skeleton-card";

interface LoadingStateProps {
  count?: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ count = 6 }) => {
  return (
    <div>
      <div className="row">
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonCard
            key={`skeleton-${index}`}
            className="col-md-4 col-sm-6 col-xs-6 mb-24"
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingState;

