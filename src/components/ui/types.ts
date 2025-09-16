import React from "react";

/**
 * Tab item interface
 * TabNavigation ve TabContent component'leri için ortak interface
 */
export interface TabItem {
  id: string;
  icon: string;
  title: string;
  label: string;
  content: React.ReactNode;
  children?: React.ReactNode;
  isActive?: boolean;
}

/**
 * Tab sistem props
 */
export interface TabSystemProps {
  tabs: TabItem[];
}
