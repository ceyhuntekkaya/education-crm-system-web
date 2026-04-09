import React from "react";
import { ListOptions } from "./list-options";
import { useAddToList } from "../context";

export const ListSection: React.FC = () => {
  const { listOptions, showAllOptions, setShowAllOptions, listSectionRef } =
    useAddToList();

  return (
    <div ref={listSectionRef} className="mb-20">
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
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setShowAllOptions(!showAllOptions)}
            className="w-100 bg-transparent border-0 d-flex align-items-center justify-content-center gap-6 py-6 cursor-pointer transition-2"
          >
            <span
              className={`text-xs fw-medium transition-2 ${
                showAllOptions ? "text-main-600" : "text-neutral-500"
              }`}
            >
              {showAllOptions
                ? "Daha Az Göster"
                : `${listOptions.length - 4} liste daha`}
            </span>
            <i
              className={`ph ph-caret-down text-xs transition-2 ${
                showAllOptions ? "text-main-500" : "text-neutral-400"
              }`}
              style={{
                transform: showAllOptions ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.25s ease",
                display: "inline-block",
              }}
            />
          </button>
        </div>
      )}
    </div>
  );
};
