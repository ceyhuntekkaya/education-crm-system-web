"use client";

import React from "react";
import { useFormField } from "@/contexts";

interface FormRangeProps {
  name: string;
  label?: string;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const FormRange: React.FC<FormRangeProps> = ({
  name,
  label,
  min,
  max,
  step = 1,
  prefix = "",
  suffix = "",
  className,
}) => {
  const { value, onChange } = useFormField(name);

  // Value should be an array [min, max] for range
  const rangeValue = Array.isArray(value) ? value : [min, max];
  const [minValue, maxValue] = rangeValue;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    onChange([newMin, maxValue] as any);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    onChange([minValue, newMax] as any);
  };

  return (
    <div className={className}>
      {label && <h6 className="text-lg mb-20 fw-medium">{label}</h6>}
      <div className="custom--range">
        <div className="custom--range__content">
          <input
            type="text"
            readOnly
            className="custom--range__prices text-neutral-600 text-start text-md fw-medium w-100 text-center bg-transparent border-0 outline-0"
            value={`${prefix}${minValue}${suffix} - ${prefix}${maxValue}${suffix}`}
          />
        </div>
        <div className="d-flex gap-12 mt-16">
          <div className="flex-grow-1">
            <label className="text-sm text-neutral-500 mb-8">Min</label>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={minValue}
              onChange={handleMinChange}
              className="form-range w-100"
            />
          </div>
          <div className="flex-grow-1">
            <label className="text-sm text-neutral-500 mb-8">Max</label>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={maxValue}
              onChange={handleMaxChange}
              className="form-range w-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
