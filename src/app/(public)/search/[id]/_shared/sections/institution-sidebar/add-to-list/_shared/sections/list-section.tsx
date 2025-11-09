import React from "react";
import { ListOptions } from "./list-options";
import { useAddToList } from "../context";

export const ListSection: React.FC = () => {
  const { listOptions, showAllOptions, setShowAllOptions } = useAddToList();

  return (
    <div className="mb-24">
      {/* Scroll yapılabilir liste container */}
      <div
        className={`overflow-auto save-options-scroll ${
          showAllOptions ? "max-h-280" : "max-h-200"
        }`}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#cbd5e1 #f8fafc",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <ListOptions />
      </div>

      {/* Daha Fazla Göster/Daha Az Göster Butonu */}
      {listOptions.length > 4 && (
        <div className="mt-12">
          <button
            type="button"
            onClick={() => setShowAllOptions(!showAllOptions)}
            className="w-100 btn btn-sm btn-outline-main d-flex align-items-center justify-content-center gap-8 transition-3 hover-bg-main-25 hover-border-main-400"
            style={{
              borderColor: showAllOptions ? "#0ea5e9" : undefined,
              backgroundColor: showAllOptions ? "#f0f9ff" : undefined,
            }}
          >
            <i
              className={`ph ph-caret-down text-sm transition-3`}
              style={{
                transform: showAllOptions ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            <span className="fw-medium transition-2">
              {showAllOptions
                ? "Daha Az Göster"
                : `Tüm Listeleri Göster (${listOptions.length - 4} tane daha)`}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
