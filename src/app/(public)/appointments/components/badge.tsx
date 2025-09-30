"use client";

import React from "react";

export interface BadgeProps {
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "primary",
  children,
  className = "",
}) => {
  return <span className={`badge bg-${variant} ${className}`}>{children}</span>;
};

export default Badge;
