import React from "react";
import { FilterGroupComponentProps } from "../types";
import FilterChip from "./filter-chip";
import { formatTitle } from "@/utils/format-text";

const FilterGroupComponent: React.FC<FilterGroupComponentProps> = ({
  group,
  onRemoveFilter,
}) => {
  if (group.filters.length === 0) return null;

  return (
    <div className="filter-group">
      <div className="filter-group-header">
        <i className={`${group.icon}`} />
        <h6>{formatTitle(group.title)}</h6>
        <span>({group.filters.length})</span>
        <h6>:</h6>
      </div>
      <div className="filter-chips-container">
        {group.filters.map((filter) => (
          <FilterChip
            key={filter.key}
            label={filter.label}
            value={filter.value}
            onRemove={() => onRemoveFilter(filter.key)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterGroupComponent;
