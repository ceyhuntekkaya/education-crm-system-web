"use client";

import React, { FormEvent } from "react";
import { useForm } from "@/contexts";
import { FormValues } from "@/types";

// Form props tipi
interface FormProps {
  onSubmit: (values: FormValues) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
  validateOnSubmit?: boolean;
}

// Form bileşeni
export const Form: React.FC<FormProps> = ({
  onSubmit,
  children,
  className = "",
  validateOnSubmit = true,
}) => {
  const { values, validate } = useForm();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation kontrolü
    if (validateOnSubmit) {
      const formIsValid = await validate();
      if (!formIsValid) {
        return;
      }
    }

    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {children}
    </form>
  );
};
