import React from "react";
import { TabItem } from "./types";

// TabNavigation component props
interface TabNavigationProps {
  tabs: TabItem[];
  navigationId?: string;
}

/**
 * TabNavigation Component
 * Dinamik tab navigation yapısı
 *
 * @param tabs - Tab item dizisi
 * @param navigationId - Navigation container ID'si
 */
export default function TabNavigation({
  tabs,
  navigationId = "pills-tab",
}: TabNavigationProps) {
  return (
    <ul
      className="nav nav-pills common-tab d-inline-flex gap-16 bg-white p-12 border border-neutral-30 rounded-pill"
      id={navigationId}
      role="tablist"
    >
      {tabs.map((tab, index) => (
        <li key={tab.id} className="nav-item" role="presentation">
          <button
            className={`nav-link rounded-pill bg-main-25 text-md fw-medium text-neutral-500 flex-center w-100 gap-8 ${
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
            <i className={`text-xl text-main-600 d-flex ${tab.icon}`} />
            {tab.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
