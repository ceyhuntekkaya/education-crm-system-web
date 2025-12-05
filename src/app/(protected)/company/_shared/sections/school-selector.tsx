"use client";

import React from "react";
import { FormSelect } from "@/components";
import { useCompany } from "../context";

interface SchoolSelectorProps {
  label?: string;
  placeholder?: string;
  showLabel?: boolean;
  className?: string;
  variant?: "inline" | "outline" | "primary";
}

export const SchoolSelector: React.FC<SchoolSelectorProps> = ({
  label = "Kurum Seçimi",
  placeholder = "Lütfen bir Kurum seçiniz",
  showLabel = true,
  className = "",
  variant = "inline",
}) => {
  const { schools, selectedSchool, setSelectedSchool, isInitialized } =
    useCompany();

  if (!isInitialized || schools.length === 0) {
    return (
      <div className={`${className}`}>
        {showLabel && (
          <label className="form-label fw-semibold text-neutral-900 mb-8">
            {label}
          </label>
        )}
        <select className="form-control" disabled>
          <option>Kurumlar yükleniyor...</option>
        </select>
      </div>
    );
  }

  const schoolOptions = schools
    .filter((school) => school.id !== undefined)
    .map((school) => ({
      value: school.id!.toString(),
      label: school.name || "",
    }));

  return (
    <div className={`${className}`}>
      {showLabel && (
        <label className="form-label fw-semibold text-neutral-900 mb-8">
          {label}
        </label>
      )}
      <select
        className="form-control"
        value={selectedSchool?.id?.toString() || ""}
        onChange={(e) => {
          const schoolId = parseInt(e.target.value);
          const school = schools.find((s) => s.id === schoolId);
          if (school) {
            setSelectedSchool(school);
          }
        }}
      >
        <option value="">{placeholder}</option>
        {schools
          .filter((school) => school.id !== undefined)
          .map((school) => (
            <option key={school.id} value={school.id!.toString()}>
              {school.name}
            </option>
          ))}
      </select>
    </div>
  );
};
