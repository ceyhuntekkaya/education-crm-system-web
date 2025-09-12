import React from "react";
import FilterGroupComponent from "./filter-group";
import { useActiveFilters } from "../hooks";

const GroupedFiltersContainer: React.FC = () => {
  const { filterGroups, removeFilter } = useActiveFilters();

  return (
    <div className="grouped-filters-container">
      <div className="grouped-filters">
        {filterGroups.map((group) => (
          <FilterGroupComponent
            key={group.title}
            group={group}
            onRemoveFilter={removeFilter}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupedFiltersContainer;
