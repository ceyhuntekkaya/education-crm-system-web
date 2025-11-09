import React, { useState } from "react";
import { NewListForm } from "./new-list-form";

export const NewListSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-32">
      <div
        className={`card border-2 border-dashed transition-3 cursor-pointer ${
          isExpanded
            ? "border-main-400 bg-main-25 shadow-sm"
            : "border-neutral-200 hover-border-main-300"
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="card-body p-20 text-center">
          <div
            className={`w-56 h-56 rounded-12 mx-auto mb-16 d-flex align-items-center justify-content-center transition-3 ${
              isExpanded ? "bg-main-600" : "bg-neutral-100"
            }`}
            style={{
              transform: isExpanded ? "scale(1.05)" : "scale(1)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <i
              className={`ph-bold ph-plus-circle text-2xl transition-3 ${
                isExpanded ? "text-white" : "text-neutral-500"
              }`}
              style={{
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.4s ease-in-out",
              }}
            />
          </div>
          <h6 className="text-neutral-700 fw-semibold mb-8">
            Yeni Liste Oluştur
          </h6>
          <p className="text-neutral-500 text-sm mb-0">
            Özel bir liste oluşturup okulu oraya kaydedin
          </p>
        </div>
      </div>

      {/* Yeni Liste Form Alanı */}
      <NewListForm isVisible={isExpanded} />
    </div>
  );
};
