import React from "react";
import { Icon } from "@/components/ui/icon";
import { useAddToList } from "../context";

export const ListOptions: React.FC = () => {
  const { listOptions, selectedListId, handleOptionSelect, showAllOptions } =
    useAddToList();

  const maxVisible = 4;
  const visibleOptions = showAllOptions
    ? listOptions
    : listOptions.slice(0, maxVisible);

  return (
    <div className="d-flex flex-column gap-8 pe-2">
      {visibleOptions.map((option) => (
        <div key={option.value}>
          <div
            className={`border rounded-8 p-16 cursor-pointer transition-2 ${
              selectedListId === option.value
                ? "border-main-400 bg-main-25"
                : "border-neutral-200 hover-border-main-300"
            }`}
            onClick={() => handleOptionSelect(option.value)}
          >
            <div className="d-flex align-items-center gap-12">
              {/* Liste İkonu */}
              <div>
                <Icon
                  icon={
                    selectedListId === option.value
                      ? "ph-check"
                      : option.icon || "ph-list-bullets"
                  }
                  size="md"
                  variant={
                    selectedListId !== option.value ? "inline" : "outline"
                  }
                />
              </div>

              {/* Content */}
              <div className="flex-grow-1">
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="text-neutral-700 fw-medium mb-0">
                    {option.label}
                  </h6>
                  {option.schoolCount !== undefined && (
                    <span className="text-neutral-500 text-sm">
                      {option.schoolCount} Kurum
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
