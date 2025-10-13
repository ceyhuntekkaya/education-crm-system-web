"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { SidebarMenuItemProps } from "../types";
import {
  isActive,
  hasActiveChild,
  getTabItemClasses,
  getTabLinkClasses,
} from "../utils";

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  level = 0,
  pathname,
  expandedItems,
  onToggleExpanded,
}) => {
  const hasChildren = Boolean(item.children?.length);
  const isExpanded = expandedItems.has(item.href);
  const itemIsActive = isActive(item.href, pathname);
  const hasActiveChildItem = hasActiveChild(item.children, pathname);

  // Full tab render
  const renderFullTab = () => {
    const commonContent = (
      <>
        <div className="sidebar-tab-icon-container flex-shrink-0 sidebar-icon-animate">
          <i className={`${item.icon} text-sm`} />
        </div>

        <span className="sidebar-tab-text flex-grow-1 text-start sidebar-text-animate">
          {item.label}
        </span>

        {hasChildren && (
          <div className="sidebar-dropdown-icon flex-shrink-0 ms-auto">
            <i
              className={`ph-bold ph-caret-down sidebar-caret-animate ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        )}

        {/* Active indicator */}
        {itemIsActive && (
          <div className="sidebar-tab-indicator position-absolute top-50 start-0 translate-middle-y w-4 h-24 bg-white rounded-end-pill sidebar-indicator-animate"></div>
        )}
      </>
    );

    if (hasChildren) {
      return (
        <button
          type="button"
          onClick={() => onToggleExpanded(item.href)}
          className={`${getTabLinkClasses(
            itemIsActive,
            hasActiveChildItem,
            level
          )} sidebar-link-animate`}
        >
          {commonContent}
        </button>
      );
    }

    return (
      <Link
        href={item.href}
        className={`${getTabLinkClasses(
          itemIsActive,
          hasActiveChildItem,
          level
        )} sidebar-link-animate`}
      >
        {commonContent}
      </Link>
    );
  };

  return (
    <li key={item.href} className={getTabItemClasses(level)}>
      {renderFullTab()}

      {/* Alt menü */}
      {hasChildren && isExpanded && (
        <ul className="sidebar-submenu list-unstyled ms-12 sidebar-submenu-animate">
          {item.children?.map((child) => (
            <SidebarMenuItem
              key={child.href}
              item={child}
              level={level + 1}
              pathname={pathname}
              expandedItems={expandedItems}
              onToggleExpanded={onToggleExpanded}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarMenuItem;
