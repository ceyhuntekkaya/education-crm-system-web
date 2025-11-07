"use client";

import React from "react";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "neutral";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
}) => {
  const sizeClasses = {
    sm: "fs-12 px-8 py-2",
    md: "fs-14 px-12 py-4",
    lg: "fs-16 px-16 py-6",
  };

  return (
    <span
      className={`badge bg-${variant} d-inline-flex align-items-center justify-content-center text-center ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
