import React from "react";
import { FilterChipProps } from "../types";
import { formatTitle } from "@/utils/format-text";

const FilterChip: React.FC<FilterChipProps> = ({ label, value, onRemove }) => {
  return (
    <div className="filter-chip">
      <span className="filter-chip__value">{formatTitle(value)}</span>
      <button
        type="button"
        onClick={onRemove}
        className="filter-chip__remove"
        title={`${label}: ${value} filtresini kaldır`}
      >
        <i className="ph ph-x" />
      </button>
    </div>
  );
};

export default FilterChip;
