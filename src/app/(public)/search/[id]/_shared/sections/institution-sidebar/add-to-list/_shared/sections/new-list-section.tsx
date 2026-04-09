import React, { useState, useRef, useEffect } from "react";
import { NewListForm } from "./new-list-form";

export const NewListSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Form açıldığında ModalBody scroll container'ı en alta kaydır
  useEffect(() => {
    if (isExpanded && sectionRef.current) {
      const timer = setTimeout(() => {
        const el = sectionRef.current;
        if (!el) return;
        // CSS animasyonu (300ms) bitince nearest scroll container'ı bul ve alta kaydır
        let parent = el.parentElement;
        while (parent) {
          const overflow = window.getComputedStyle(parent).overflowY;
          if (
            (overflow === "auto" || overflow === "scroll") &&
            parent.scrollHeight > parent.clientHeight
          ) {
            parent.scrollTo({ top: parent.scrollHeight, behavior: "smooth" });
            break;
          }
          parent = parent.parentElement;
        }
      }, 320); // 300ms CSS transition + 20ms buffer
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  return (
    <div ref={sectionRef} className="pb-4">
      <button
        type="button"
        className={`d-flex align-items-center gap-12 w-100 p-12 rounded-10 border-2 border-dashed transition-2 cursor-pointer ${
          isExpanded
            ? "border-main-400 bg-main-25"
            : "border-neutral-200 bg-transparent hover-border-main-300 hover-bg-neutral-25"
        }`}
        style={{ outline: "none" }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div
          className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 transition-2 ${
            isExpanded ? "bg-main-600" : "bg-neutral-100"
          }`}
          style={{ width: "32px", height: "32px" }}
        >
          <i
            className={`ph-bold ph-plus text-sm transition-2 ${
              isExpanded ? "text-white" : "text-neutral-500"
            }`}
            style={{
              transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.25s ease",
              display: "inline-block",
            }}
          />
        </div>
        <span
          className={`text-sm fw-semibold transition-2 ${
            isExpanded ? "text-main-700" : "text-neutral-600"
          }`}
        >
          Yeni liste oluştur
        </span>
        <i
          className={`ph ph-caret-down text-sm ms-auto transition-2 ${
            isExpanded ? "text-main-500" : "text-neutral-400"
          }`}
          style={{
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
            display: "inline-block",
          }}
        />
      </button>

      <NewListForm
        isVisible={isExpanded}
        onCollapse={() => setIsExpanded(false)}
      />
    </div>
  );
};
