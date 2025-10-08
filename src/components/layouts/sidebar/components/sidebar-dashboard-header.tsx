"use client";

import React from "react";

interface SidebarDashboardHeaderProps {
  title?: string;
  icon?: string;
  className?: string;
}

const SidebarDashboardHeader: React.FC<SidebarDashboardHeaderProps> = ({
  title = "Kullanıcı Paneli",
  icon = "ph-squares-four",
  className = "",
}) => {
  return (
    <div className={`sidebar-dashboard-header ${className}`}>
      <div className="dashboard-content">
        <i className={`${icon} dashboard-icon`}></i>
        <span className="dashboard-title">{title}</span>
      </div>
    </div>
  );
};

export default SidebarDashboardHeader;
