import React from "react";
import { useAddToList } from "../context";

export const ListOptions: React.FC = () => {
  const { listOptions, selectedListId, handleOptionSelect, showAllOptions } =
    useAddToList();

  const maxVisible = 4;
  const visibleOptions = showAllOptions
    ? listOptions
    : listOptions.slice(0, maxVisible);

  return (
    <div className="d-flex flex-column gap-6">
      {visibleOptions.map((option) => {
        const isSelected = selectedListId === option.value;
        return (
          <div
            key={option.value}
            role="button"
            className={`d-flex align-items-center gap-10 px-12 py-10 rounded-8 border cursor-pointer transition-2 ${
              isSelected
                ? "border-main-400 bg-main-25"
                : "border-neutral-200 hover-border-main-300 hover-bg-neutral-25"
            }`}
            onClick={() => handleOptionSelect(option.value)}
          >
            {/* Seçim indikatörü */}
            <div
              className={`rounded-circle border d-flex align-items-center justify-content-center flex-shrink-0 transition-2 ${
                isSelected
                  ? "border-main-500 bg-main-600"
                  : "border-neutral-200 bg-neutral-100"
              }`}
              style={{ width: "18px", height: "18px" }}
            >
              {isSelected && (
                <i
                  className="ph-bold ph-check text-white"
                  style={{ fontSize: "10px" }}
                />
              )}
            </div>

            {/* Liste adı */}
            <span
              className={`text-sm flex-grow-1 ${
                isSelected
                  ? "fw-semibold text-main-700"
                  : "fw-medium text-neutral-700"
              }`}
            >
              {option.label}
            </span>

            {/* Kurum sayısı */}
            {option.schoolCount !== undefined && (
              <span
                className={`text-xs flex-shrink-0 ${
                  isSelected ? "text-main-500" : "text-neutral-400"
                }`}
              >
                {option.schoolCount} Kurum
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
