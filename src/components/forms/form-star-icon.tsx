"use client";

import React, { useState } from "react";
import { useFormField } from "@/contexts/form-context";

export interface FormStarIconProps {
  name: string;
  label?: string;
  max?: number;
  size?: "sm" | "md" | "lg";
  required?: boolean;
  readOnly?: boolean;
  className?: string;
  value?: number;
  onChange?: (value: number) => void;
}

/**
 * Form Star Icon Component
 * Animasyonlu star rating bileşeni - Form context ile entegre
 * Hem standalone hem de form içinde kullanılabilir
 */
export const FormStarIcon: React.FC<FormStarIconProps> = ({
  name,
  label,
  max = 5,
  size = "md",
  required = false,
  readOnly = false,
  className,
  value: externalValue,
  onChange: externalOnChange,
}) => {
  // Internal state for standalone usage
  const [hoveredValue, setHoveredValue] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Form context'i her zaman çağır, sonra name kontrolü yap
  const formField = useFormField(name || "");

  // Value ve onChange'i belirleme - form context varsa onu kullan, yoksa external props
  const currentValue = name ? formField?.value ?? 0 : externalValue ?? 0;
  const handleValueChange = name ? formField?.onChange : externalOnChange;
  const error = name ? formField?.error : undefined;

  const handleStarClick = (starValue: number) => {
    if (!readOnly && handleValueChange) {
      setIsAnimating(true);
      handleValueChange(starValue);
      // Seçim animasyonunu sıfırla
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleMouseEnter = (starValue: number) => {
    if (!readOnly) {
      setHoveredValue(starValue);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoveredValue(0);
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case "sm":
        return { width: "18px", height: "18px" };
      case "lg":
        return { width: "36px", height: "36px" };
      default:
        return { width: "28px", height: "28px" };
    }
  };

  const getStarScale = (starValue: number) => {
    const displayValue = hoveredValue || currentValue;

    if (isAnimating && starValue <= currentValue) {
      return "1.3"; // Seçim anında büyüt
    }

    if (hoveredValue > 0 && starValue <= hoveredValue) {
      return "1.15"; // Hover'da hafif büyüt
    }

    return "1";
  };

  const containerClass = `star-rating-container ${className || ""}`;

  return (
    <div className={containerClass}>
      {/* Label */}
      {label && (
        <label className="form-label mb-2 d-block">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}

      <div
        className="d-flex flex-column align-items-end"
        style={{ minHeight: "60px" }}
      >
        {/* Yıldızlar */}
        <div className="d-flex align-items-center gap-2 mb-2">
          {Array.from({ length: max }, (_, index) => {
            const starValue = index + 1;
            const displayValue = hoveredValue || currentValue;
            const isFilled = starValue <= displayValue;
            const isCurrentlyHovered =
              hoveredValue > 0 && starValue <= hoveredValue;
            const isSelected = starValue <= currentValue;

            const starColor = isFilled
              ? isCurrentlyHovered
                ? "#ffb400"
                : "#ffc107"
              : "#e9ecef";

            const buttonClass = `star-button btn btn-link p-0 border-0 d-flex align-items-center justify-content-center ${
              isSelected ? "star-selected" : ""
            } ${isCurrentlyHovered ? "star-glow" : ""}`;

            const buttonStyle = {
              cursor: readOnly ? "default" : "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: `scale(${getStarScale(starValue)})`,
              filter: isCurrentlyHovered
                ? "drop-shadow(0 2px 8px rgba(255, 193, 7, 0.5))"
                : "none",
            };

            return (
              <button
                key={starValue}
                type="button"
                onClick={() => handleStarClick(starValue)}
                onMouseEnter={() => handleMouseEnter(starValue)}
                onMouseLeave={handleMouseLeave}
                disabled={readOnly}
                className={buttonClass}
                style={buttonStyle}
                data-aos={
                  isAnimating && starValue <= currentValue ? "pulse" : ""
                }
                data-aos-duration="200"
                data-aos-delay={starValue * 50}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill={starColor}
                  style={{
                    ...getSizeStyle(),
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    filter: isFilled
                      ? "drop-shadow(0 2px 4px rgba(255,193,7,0.3))"
                      : "none",
                  }}
                >
                  {/* Ana yıldız şekli */}
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    style={{
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />

                  {/* İç parıltı efekti */}
                  {isFilled && (
                    <>
                      <path
                        d="M12 5l2.12 4.26L18 10.18l-3 2.93 0.71 4.15L12 15.77l-3.71 1.95L9 13.57l-3-2.93 3.88-.92L12 5z"
                        fill="rgba(255, 255, 255, 0.4)"
                        style={{
                          opacity: isCurrentlyHovered ? "1" : "0.7",
                          transition: "opacity 0.2s ease",
                        }}
                      />

                      {/* Merkez parıltısı */}
                      <circle
                        cx="12"
                        cy="12"
                        r="2"
                        fill="rgba(255, 255, 255, 0.6)"
                        style={{
                          opacity: isCurrentlyHovered ? "1" : "0.5",
                          transition: "opacity 0.2s ease",
                        }}
                      />
                    </>
                  )}

                  {/* Hover parıltı efekti */}
                  {isCurrentlyHovered && (
                    <path
                      d="M12 1l3.5 7h7l-5.5 4 2 7L12 15l-7 4 2-7L1 8h7L12 1z"
                      fill="none"
                      stroke="rgba(255, 180, 0, 0.8)"
                      strokeWidth="0.5"
                      style={{
                        opacity: "0.8",
                        animation: "starShine 0.6s ease-in-out",
                      }}
                    />
                  )}
                </svg>
              </button>
            );
          })}
        </div>

        {/* Rating Info - Yıldızların Altında - Sabit Yükseklik */}
        {!readOnly && (
          <div
            className="text-end"
            style={{
              minHeight: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {hoveredValue > 0 ? (
              <div
                className="d-flex align-items-center justify-content-end gap-2 text-warning"
                style={{
                  animation: "fadeIn 0.2s ease",
                  textShadow: "0 1px 2px rgba(255,193,7,0.3)",
                  height: "24px",
                }}
              >
                <span
                  className="fw-bold"
                  style={{ fontSize: "0.85rem", lineHeight: "1" }}
                >
                  {hoveredValue}/{max}
                </span>
                <span
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1",
                    animation: "starPulse 0.8s ease-in-out infinite",
                  }}
                >
                  {hoveredValue >= 5
                    ? "🌟"
                    : hoveredValue >= 4
                    ? "⭐"
                    : hoveredValue >= 3
                    ? "👍"
                    : hoveredValue >= 2
                    ? "👌"
                    : "👎"}
                </span>
                <span
                  className="text-warning-600"
                  style={{
                    fontSize: "0.75rem",
                    fontStyle: "italic",
                    fontWeight: "500",
                    lineHeight: "1",
                  }}
                >
                  {hoveredValue >= 5
                    ? "Mükemmel!"
                    : hoveredValue >= 4
                    ? "Çok İyi!"
                    : hoveredValue >= 3
                    ? "İyi"
                    : hoveredValue >= 2
                    ? "Orta"
                    : "Zayıf"}
                </span>
              </div>
            ) : currentValue > 0 ? (
              <div
                className="d-flex align-items-center justify-content-end gap-2 text-success"
                style={{ height: "24px" }}
              >
                <span
                  className="fw-bold"
                  style={{ fontSize: "0.85rem", lineHeight: "1" }}
                >
                  {currentValue}/{max}
                </span>
                <span
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1",
                    animation: isAnimating
                      ? "ratingSuccess 0.5s ease-out"
                      : "none",
                  }}
                >
                  {currentValue >= 5
                    ? "🌟"
                    : currentValue >= 4
                    ? "⭐"
                    : currentValue >= 3
                    ? "👍"
                    : currentValue >= 2
                    ? "👌"
                    : "👎"}
                </span>
                <span
                  className="text-success-600"
                  style={{
                    fontSize: "0.75rem",
                    fontStyle: "italic",
                    fontWeight: "500",
                    lineHeight: "1",
                  }}
                >
                  {currentValue >= 5
                    ? "Mükemmel!"
                    : currentValue >= 4
                    ? "Çok İyi!"
                    : currentValue >= 3
                    ? "İyi"
                    : currentValue >= 2
                    ? "Orta"
                    : "Zayıf"}
                </span>
              </div>
            ) : (
              <div style={{ height: "24px" }}>
                <small
                  className="text-muted text-end"
                  style={{
                    fontSize: "0.7rem",
                    opacity: "0.7",
                    fontStyle: "italic",
                    lineHeight: "1",
                  }}
                >
                  Henüz puanlanmadı
                </small>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && <div className="text-danger small text-end mt-1">{error}</div>}
    </div>
  );
};
