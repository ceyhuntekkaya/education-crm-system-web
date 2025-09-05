import React from "react";
import { TabItem } from "./types";

// TabContent component props
interface TabContentProps {
  tabs: TabItem[];
  contentId?: string;
}

/**
 * TabContent Component
 * Tab yapısı için dinamik content container
 *
 * @param tabs - Tab item dizisi
 * @param contentId - Tab content container ID'si
 */
export default function TabContent({
  tabs,
  contentId = "pills-tabContent",
}: TabContentProps) {
  return (
    <div className="tab-content" id={contentId}>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          className={`tab-pane fade ${
            tab.isActive || index === 0 ? "show active" : ""
          }`}
          id={tab.id}
          role="tabpanel"
          aria-labelledby={`${tab.id}-tab`}
          tabIndex={0}
        >
          {tab.children}
        </div>
      ))}
    </div>
  );
}
