"use client";

import React from "react";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "primary",
  children,
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "badge-sm",
    md: "",
    lg: "badge-lg",
  };

  return (
    <span
      className={`badge bg-${variant} ${sizeClasses[size]} ${className}`.trim()}
    >
      {children}
    </span>
  );
};

export default Badge;
