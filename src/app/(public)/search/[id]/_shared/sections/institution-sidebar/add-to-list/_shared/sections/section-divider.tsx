import React from "react";

export const SectionDivider: React.FC = () => {
  return (
    <div className="d-flex align-items-center gap-16 mb-24">
      <hr className="flex-grow-1 border-neutral-200 my-0" />
      <span className="text-neutral-400 text-xs fw-medium px-8">
        VEYA YENİ LİSTE
      </span>
      <hr className="flex-grow-1 border-neutral-200 my-0" />
    </div>
  );
};

