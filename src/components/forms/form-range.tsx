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
  direction?: "horizontal" | "vertical";
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
  direction = "vertical",
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
    // Sol değer sağ değerden büyük olamaz
    if (newMin <= maxValue) {
      onChange([newMin, maxValue] as any);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    // Sağ değer sol değerden küçük olamaz
    if (newMax >= minValue) {
      onChange([minValue, newMax] as any);
    }
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
      {label && <h6 className="text-lg mb-12 fw-medium">{label}</h6>}
      <div
        className={`custom--range ${
          direction === "horizontal"
            ? "d-flex flex-column flex-lg-row align-items-lg-end gap-lg-3 custom--range--horizontal"
            : ""
        }`}
      >
        {/* Sayı gösterimi - Horizontal modda sol tarafta col-4, mobilde full width */}
        <div
          className={`custom--range__content ${
            direction === "horizontal" ? "w-100 w-lg-auto flex-lg-shrink-0" : ""
          }`}
          style={direction === "horizontal" ? { flexBasis: "33.333333%" } : {}}
        >
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

        {/* Range inputları - Horizontal modda sağ tarafta col-8, mobilde full width */}
        <div
          className={`d-flex gap-12 custom--range__sliders ${
            direction === "horizontal"
              ? "w-100 flex-lg-grow-1 mt-12 mt-lg-0"
              : "mt-12"
          }`}
        >
          <div className="flex-grow-1 position-relative">
            <label className="text-sm text-neutral-500 mb-6">Min</label>
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
            <label className="text-sm text-neutral-500 mb-6">Max</label>
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
