import React from "react";
import { TabItem } from "./types";

// TabNavigation component props
interface TabNavigationProps {
  tabs: TabItem[];
  navigationId?: string;
  allowMultiline?: boolean;
  size?: "sm" | "md" | "lg";
}

/**
 * TabNavigation Component
 * Dinamik tab navigation yapısı
 *
 * @param tabs - Tab item dizisi
 * @param navigationId - Navigation container ID'si
 * @param allowMultiline - Çoklu satır desteği
 * @param size - Tab boyutu
 */
export default function TabNavigation({
  tabs,
  navigationId = "pills-tab",
  allowMultiline = true,
  size = "md",
}: TabNavigationProps) {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "gap-8 p-8";
      case "lg":
        return "gap-20 p-20";
      default:
        return "gap-16 p-16";
    }
  };

  const getButtonSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-12 py-6 text-sm";
      case "lg":
        return "px-20 py-12 text-lg";
      default:
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
              tab.isActive || index === 0 ? "active" : ""
            }`}
            id={`${tab.id}-tab`}
            data-bs-toggle="pill"
            data-bs-target={`#${tab.id}`}
            type="button"
            role="tab"
            aria-controls={tab.id}
            aria-selected={tab.isActive || index === 0 ? "true" : "false"}
          >
            <i
              className={`${
                size === "sm"
                  ? "text-lg"
                  : size === "lg"
                  ? "text-2xl"
                  : "text-xl"
              } text-main-600 d-flex flex-shrink-0 ${tab.icon}`}
            />
            <span className="text-nowrap">{tab.title}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
