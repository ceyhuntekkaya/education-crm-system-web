"use client";

import React from "react";
import { SkeletonCard } from "@/components/ui/loadings";

export const LoadingState: React.FC = () => {
  return (
    <div className="row row-gap-24">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={`skeleton-${index}`} className="col-4" />
      ))}
    </div>
  );
};
