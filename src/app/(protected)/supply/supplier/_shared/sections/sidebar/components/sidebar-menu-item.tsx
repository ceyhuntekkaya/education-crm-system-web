"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { MenuItem } from "@/types";
import {
  isActive,
  hasActiveChild,
  getTabItemClasses,
  getTabLinkClasses,
} from "../utils";

interface SidebarMenuItemProps {
  item: MenuItem;
  level?: number;
  pathname: string;
  expandedItems: Set<string>;
  onToggleExpanded: (href: string) => void;
  isDisabled: boolean;
  onItemClick?: () => void;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  level = 0,
  pathname,
  expandedItems,
  onToggleExpanded,
  isDisabled,
  onItemClick,
}) => {
  const hasChildren = Boolean(item.children?.length);
  const isExpanded = expandedItems.has(item.href);
  const itemIsActive = isActive(item.href, pathname);
  const hasActiveChildItem = hasActiveChild(item.children, pathname);

  const shouldBeDisabled = isDisabled && item.requiresSchool !== false;

  const handleLinkClick = (e: React.MouseEvent) => {
    if (shouldBeDisabled) {
      e.preventDefault();
      return;
    }
    if (onItemClick) {
      onItemClick();
    }
  };

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

        {itemIsActive && !shouldBeDisabled && (
          <div className="sidebar-tab-indicator position-absolute top-50 start-0 translate-middle-y w-4 h-24 bg-white rounded-end-pill sidebar-indicator-animate"></div>
        )}
      </>
    );

    if (hasChildren) {
      return (
        <button
          type="button"
          onClick={
            shouldBeDisabled ? undefined : () => onToggleExpanded(item.href)
          }
          className={`${getTabLinkClasses(
            itemIsActive,
            hasActiveChildItem,
            level
          )} sidebar-link-animate`}
          style={
            shouldBeDisabled
              ? { opacity: 0.4, pointerEvents: "none", cursor: "not-allowed" }
              : {}
          }
          disabled={shouldBeDisabled}
        >
          {commonContent}
        </button>
      );
    }

    return (
      <Link
        href={shouldBeDisabled ? "#" : item.href}
        className={`${getTabLinkClasses(
          itemIsActive,
          hasActiveChildItem,
          level
        )} sidebar-link-animate`}
        onClick={handleLinkClick}
        style={
          shouldBeDisabled
            ? { opacity: 0.4, pointerEvents: "none", cursor: "not-allowed" }
            : {}
        }
      >
        {commonContent}
      </Link>
    );
  };

  return (
    <li className={getTabItemClasses(level)}>
      {renderFullTab()}
      {hasChildren && isExpanded && (
        <ul className="sidebar-tab-submenu list-unstyled sidebar-submenu-animate">
          {item.children?.map((child: any) => (
            <SidebarMenuItem
              key={child.href}
              item={child}
              level={level + 1}
              pathname={pathname}
              expandedItems={expandedItems}
              onToggleExpanded={onToggleExpanded}
              isDisabled={isDisabled}
              onItemClick={onItemClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarMenuItem;
