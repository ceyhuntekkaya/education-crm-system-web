"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import Icon from "./icon";

interface CustomCardProps {
  /** Card type (default: "card") */
  type?: "card" | "accordion";
  /** Card size (default: "xl") */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Card header title */
  title?: string;
  /** Card header subtitle */
  subtitle?: string;
  /** Header action component (buttons, etc.) */
  headerAction?: ReactNode;
  /** Card variant (default: "default") */
  variant?: "default" | "outline";
  /** Card background color class (default: bg-white) */
  bgColor?: string;
  /** Card padding class (default: p-8) */
  padding?: string;
  /** Card border class (default: border border-neutral-30) */
  border?: string;
  /** Card border radius class (default: rounded-12) */
  borderRadius?: string;
  /** Margin and padding classes (mt-24, mb-16, pt-8, pb-8, px-16, etc.) */
  spacing?: string;
  /** Additional custom classes */
  className?: string;
  /** Card content */
  children?: ReactNode;
  /** Single list of items with label-value pairs */
  items?: Array<{
    label: string;
    sublabel?: string;
    value: ReactNode;
    isShowing?: boolean | string | number;
  }>;
  /** Multiple sections with their own titles and items */
  multiItems?: Array<{
    title: string;
    titleColor?: string;
    titleIcon?: string;
    items: Array<{
      label: string;
      sublabel?: string;
      value: ReactNode;
      isShowing?: boolean | string | number;
    }>;
  }>;
  /** Header container background color (default: bg-main-25) */
  headerBgColor?: string;
  /** Header container padding (default: p-32) */
  headerPadding?: string;
  /** Show divider line after header (default: true) */
  showDivider?: boolean;

  // Margin props
  /** Margin top (mt-4, mt-8, mt-16, etc.) */
  mt?: string;
  /** Margin bottom (mb-4, mb-8, mb-16, etc.) */
  mb?: string;
  /** Margin start/left (ms-4, ms-8, ms-16, etc.) */
  ms?: string;
  /** Margin end/right (me-4, me-8, me-16, etc.) */
  me?: string;

  // Padding props
  /** Padding top (pt-4, pt-8, pt-16, etc.) */
  pt?: string;
  /** Padding bottom (pb-4, pb-8, pb-16, etc.) */
  pb?: string;
  /** Padding start/left (ps-4, ps-8, ps-16, etc.) */
  ps?: string;
  /** Padding end/right (pe-4, pe-8, pe-16, etc.) */
  pe?: string;
}

export default function CustomCard({
  type = "card",
  size = "xl",
  title,
  subtitle,
  headerAction,
  variant = "default",
  bgColor = "bg-white",
  padding = "p-8",
  border = "border border-neutral-30",
  borderRadius = "rounded-12",
  spacing = "",
  className = "",
  children,
  items,
  multiItems,
  headerBgColor = "bg-main-25",
  headerPadding = "p-32",
  showDivider = true,
  // Margin props
  mt,
  mb,
  ms,
  me,
  // Padding props
  pt,
  pb,
  ps,
  pe,
}: CustomCardProps) {
  // Accordion state
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Combine all spacing classes
  const spacingClasses = [spacing, mt, mb, ms, me, pt, pb, ps, pe]
    .filter(Boolean)
    .join(" ");

  // Size-based font classes
  const getTitleClass = (size: string) => {
    switch (size) {
      case "xs":
        return "h6 mb-4"; // Smallest title
      case "sm":
        return "h5 mb-6"; // Small title
      case "md":
        return "h4 mb-8"; // Medium title
      case "lg":
        return "h3 mb-8"; // Large title
      case "xl":
      default:
        return "h2 mb-8"; // Extra large title (default)
    }
  };

  const getSubtitleClass = (size: string) => {
    switch (size) {
      case "xs":
        return "text-xs text-neutral-600 mb-0"; // Smallest subtitle
      case "sm":
        return "text-sm text-neutral-600 mb-0"; // Small subtitle
      case "md":
        return "text-base text-neutral-600 mb-0"; // Medium subtitle
      case "lg":
        return "text-lg text-neutral-600 mb-0"; // Large subtitle
      case "xl":
      default:
        return "text-neutral-600 mb-0"; // Default subtitle (current)
    }
  };

  // Determine colors based on variant
  const cardBgColor = variant === "outline" ? headerBgColor : bgColor;
  const headerColor = variant === "outline" ? bgColor : headerBgColor;

  const hasHeader = title || subtitle || headerAction;
  const hasContent = children || items || multiItems;

  // Calculate content height for smooth animation
  useEffect(() => {
    if (contentRef.current) {
      if (type === "accordion") {
        setContentHeight(isAccordionOpen ? contentRef.current.scrollHeight : 0);
      } else {
        setContentHeight(contentRef.current.scrollHeight);
      }
    }
  }, [isAccordionOpen, type, children, items, multiItems]);

  // Accordion toggle function
  const toggleAccordion = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    if (type === "accordion") {
      setIsAccordionOpen(!isAccordionOpen);
    }
  };

  return (
    <div
      className={
        variant === "outline"
          ? ``
          : `${border} ${borderRadius} ${cardBgColor} ${padding} ${spacingClasses} ${className}`
      }
    >
      <div
        className={`${border} ${borderRadius} ${headerColor} ${headerPadding}`}
      >
        {hasHeader && (
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div>
              {title && <h2 className={getTitleClass(size)}>{title}</h2>}
              {subtitle && <p className={getSubtitleClass(size)}>{subtitle}</p>}
            </div>
            <div className="d-flex align-items-center gap-3">
              {headerAction && <div>{headerAction}</div>}
              {type === "accordion" && (
                <Icon
                  icon={isAccordionOpen ? "ph-caret-up" : "ph-caret-down"}
                  variant="inline"
                  size="md"
                  onClick={toggleAccordion}
                  className="accordion-toggle-icon"
                  animate={false}
                />
              )}
            </div>
          </div>
        )}
        {/* Accordion Content Container with Animation */}
        <div
          ref={contentRef}
          className={`accordion-content ${
            type === "accordion"
              ? `overflow-hidden transition-all duration-500 ease-in-out ${
                  isAccordionOpen
                    ? "card-expand-transition opacity-100"
                    : "opacity-0"
                }`
              : ""
          }`}
          style={{
            maxHeight: type === "accordion" ? `${contentHeight}px` : "none",
            transition:
              type === "accordion"
                ? "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out"
                : "none",
          }}
        >
          {(type === "card" || hasContent) && (
            <>
              {hasHeader && hasContent && showDivider && (
                <span className="d-block border border-neutral-30 my-24 border-dashed" />
              )}

              {/* Children Content */}
              {children && (
                <div className={items || multiItems ? "mb-24" : ""}>
                  {children}
                </div>
              )}

              {/* Custom Items List */}
              {items && (
                <ul className="tution-info-list bg-white rounded-8">
                  {items
                    .filter((item) => item.isShowing)
                    .map((item, index) => (
                      <li
                        key={index}
                        className="d-flex align-items-start px-32 py-16"
                      >
                        <span className="w-50-percent fw-semibold text-neutral-700">
                          {item.label}
                          {item.sublabel && (
                            <span className="d-block text-xs text-neutral-500 fw-normal mt-4">
                              {item.sublabel}
                            </span>
                          )}
                        </span>
                        <span className="w-50-percent fw-normal text-neutral-500 text-md">
                          {item.value}
                        </span>
                      </li>
                    ))}
                </ul>
              )}

              {/* Multiple Items Sections */}
              {multiItems &&
                multiItems.map((section, sectionIndex) => {
                  const filteredItems = section.items.filter(
                    (item) => item.isShowing
                  );

                  if (filteredItems.length === 0) return null;

                  return (
                    <div key={sectionIndex}>
                      {/* Section Title */}
                      <h4
                        className={`mb-16 ${
                          section.titleColor || "text-main-600"
                        }`}
                      >
                        {section.titleIcon && (
                          <i className={`${section.titleIcon} me-8`}></i>
                        )}
                        {section.title}
                      </h4>
                      <span className="d-block border border-neutral-30 my-24 border-dashed" />

                      {/* Section Items */}
                      <ul
                        className={`tution-info-list bg-white rounded-8 ${
                          sectionIndex < multiItems.length - 1 ? "mb-32" : ""
                        }`}
                      >
                        {filteredItems.map((item, index) => (
                          <li
                            key={index}
                            className="d-flex align-items-start px-32 py-16"
                          >
                            <span className="w-50-percent fw-semibold text-neutral-700">
                              {item.label}
                              {item.sublabel && (
                                <span className="d-block text-xs text-neutral-500 fw-normal mt-4">
                                  {item.sublabel}
                                </span>
                              )}
                            </span>
                            <span className="w-50-percent fw-normal text-neutral-500 text-md">
                              {item.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export type { CustomCardProps };
