"use client";

import React from "react";
import { useForm } from "@/contexts";

// FormButton props tipi
interface FormButtonProps {
  children: React.ReactNode;
  type?: "submit" | "button" | "reset";
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  disableOnInvalid?: boolean;
  onClick?: () => void;
  className?: string;
}

// FormButton bileşeni
export const FormButton: React.FC<FormButtonProps> = ({
  children,
  type = "submit",
  variant = "primary",
  size = "md",
  disabled = false,
  disableOnInvalid = false,
  onClick,
  className = "",
}) => {
  const { isValid } = useForm();

  // Variant stilleri
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  // Boyut stilleri
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const isDisabled = disabled || (disableOnInvalid && !isValid);

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        font-medium rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        ${className}
      `}
    >
      {children}
    </button>
  );
};
