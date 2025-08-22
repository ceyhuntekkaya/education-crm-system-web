"use client";

import React from "react";
import { useForm } from "@/contexts";
import Button from "@/components/ui/button";

// FormButton props tipi
interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "submit" | "button" | "reset";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  disableOnInvalid?: boolean;
}

// FormButton bileşeni
export const FormButton: React.FC<FormButtonProps> = ({
  children,
  type = "submit",
  variant = "primary",
  size = "md",
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disableOnInvalid = false,
  onClick,
  className = "",
  ...rest
}) => {
  const { isValid } = useForm();

  const isDisabled = disabled || isLoading || (disableOnInvalid && !isValid);

  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      disabled={isDisabled}
      isLoading={isLoading}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      fullWidth={fullWidth}
      onClick={onClick}
      className={className}
      {...rest}
    >
      {children}
    </Button>
  );
};
