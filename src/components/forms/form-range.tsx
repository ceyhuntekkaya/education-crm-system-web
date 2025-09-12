"use client";

import React, { useState } from "react";
import { useFormField } from "@/contexts";
import { formatNumber } from "@/utils/format-number";

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
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);

  // Value should be an array [min, max] for range
  const rangeValue = Array.isArray(value) ? value : [min, max];
  const [minValue, maxValue] = rangeValue;

  // Format numbers for display
  const formatValue = (value: number) => {
    return formatNumber(value, "tr-TR");
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    onChange([newMin, maxValue] as any);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    onChange([minValue, newMax] as any);
  };

  const handleMinMouseDown = () => setIsDragging("min");
  const handleMaxMouseDown = () => setIsDragging("max");
  const handleMouseUp = () => setIsDragging(null);

  // Global mouse up event listener to handle when mouse is released outside the slider
  React.useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(null);
    const handleGlobalTouchEnd = () => setIsDragging(null);

    if (isDragging) {
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.addEventListener("touchend", handleGlobalTouchEnd);

      return () => {
        document.removeEventListener("mouseup", handleGlobalMouseUp);
        document.removeEventListener("touchend", handleGlobalTouchEnd);
      };
    }
  }, [isDragging]);

  return (
    <div className={className}>
      {label && <h6 className="text-lg mb-20 fw-medium">{label}</h6>}
      <div className="custom--range">
        <div className="custom--range__content">
          <input
            type="text"
            readOnly
            className="custom--range__prices text-neutral-600 text-start text-md fw-medium w-100 text-center bg-transparent border-0 outline-0"
            value={`${prefix}${formatValue(
              minValue
            )}${suffix} - ${prefix}${formatValue(maxValue)}${suffix}`}
          />

          {/* Tooltip for active slider */}
          {isDragging && (
            <div
              className="range-tooltip position-absolute bg-primary text-white px-2 py-1 rounded small fw-medium shadow-sm"
              style={{
                top: "-35px",
                left: isDragging === "min" ? "10%" : "90%",
                transform: "translateX(-50%)",
                zIndex: 1000,
                fontSize: "12px",
              }}
            >
              {prefix}
              {formatValue(isDragging === "min" ? minValue : maxValue)}
              {suffix}
            </div>
          )}
        </div>
        <div className="d-flex gap-12 mt-16">
          <div className="flex-grow-1 position-relative">
            <label className="text-sm text-neutral-500 mb-8">Min</label>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={minValue}
              onChange={handleMinChange}
              onMouseDown={handleMinMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleMinMouseDown}
              onTouchEnd={handleMouseUp}
              className="form-range w-100"
            />
          </div>
          <div className="flex-grow-1 position-relative">
            <label className="text-sm text-neutral-500 mb-8">Max</label>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={maxValue}
              onChange={handleMaxChange}
              onMouseDown={handleMaxMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleMaxMouseDown}
              onTouchEnd={handleMouseUp}
              className="form-range w-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
