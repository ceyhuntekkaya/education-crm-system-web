import React from "react";
import { TabItem } from "./types";

// TabNavigation component props
interface TabNavigationProps {
  tabs: TabItem[];
  navigationId?: string;
  allowMultiline?: boolean;
  size?: "xxs" | "xs" | "sm" | "md" | "lg";
  onTabChange?: (tabId: string) => void;
}

/**
 * TabNavigation Component
 * Dinamik tab navigation yapısı
 *
 * @param tabs - Tab item dizisi
 * @param navigationId - Navigation container ID'si
 * @param allowMultiline - Çoklu satır desteği
 * @param size - Tab boyutu (xxs, xs, sm, md, lg)
 * @param onTabChange - Tab değişim callback fonksiyonu
 */
export default function TabNavigation({
  tabs,
  navigationId = "pills-tab",
  allowMultiline = true,
  size = "md",
  onTabChange,
}: TabNavigationProps) {
  const getSizeClasses = () => {
    switch (size) {
      case "xxs":
        return "gap-4 p-4";
      case "xs":
        return "gap-6 p-6";
      case "sm":
        return "gap-8 p-8";
      case "lg":
        return "gap-20 p-20";
      default: // md
        return "gap-16 p-16";
    }
  };

  const getButtonSizeClasses = () => {
    switch (size) {
      case "xxs":
        return "px-8 py-4 text-xs";
      case "xs":
        return "px-10 py-5 text-sm";
      case "sm":
        return "px-12 py-6 text-sm";
      case "lg":
        return "px-20 py-12 text-lg";
      default: // md
        return "px-16 py-8 text-md";
    }
  };

  return (
    <ul
      className={`nav nav-pills common-tab d-flex ${
        allowMultiline ? "flex-wrap" : "overflow-auto"
      } ${getSizeClasses()} bg-white border border-neutral-30 rounded-12 ${
        allowMultiline ? "multiline" : ""
      }`}
      id={navigationId}
      role="tablist"
    >
      {tabs.map((tab, index) => (
        <li key={tab.id} className="nav-item flex-shrink-0" role="presentation">
          <button
            className={`nav-link rounded-pill bg-main-25 fw-medium text-neutral-500 flex-center gap-8 border-0 transition-all ${getButtonSizeClasses()} ${
              tab.isActive === true ? "active" : ""
            }`}
            id={`${tab.id}-tab`}
            data-bs-toggle="pill"
            data-bs-target={`#${tab.id}`}
            type="button"
            role="tab"
            aria-controls={tab.id}
            aria-selected={tab.isActive === true ? "true" : "false"}
            onClick={() => onTabChange?.(tab.id)}
          >
            <i
              className={`${
                size === "xxs"
                  ? "text-sm"
                  : size === "xs"
                  ? "text-md"
                  : size === "sm"
                  ? "text-lg"
                  : size === "lg"
                  ? "text-2xl"
                  : "text-xl" // md
              } text-main-600 d-flex flex-shrink-0 ${tab.icon}`}
            />
            <span className="text-nowrap">{tab.label || tab.title}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
