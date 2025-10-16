import { ReactNode } from "react";

interface CustomCardProps {
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
  // Combine all spacing classes
  const spacingClasses = [spacing, mt, mb, ms, me, pt, pb, ps, pe]
    .filter(Boolean)
    .join(" ");

  // Determine colors based on variant
  const cardBgColor = variant === "outline" ? headerBgColor : bgColor;
  const headerColor = variant === "outline" ? bgColor : headerBgColor;

  const hasHeader = title || subtitle || headerAction;
  const hasContent = children || items || multiItems;

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
              {title && <h2 className="mb-8">{title}</h2>}
              {subtitle && <p className="text-neutral-600 mb-0">{subtitle}</p>}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        )}
        {hasHeader && hasContent && showDivider && (
          <span className="d-block border border-neutral-30 my-24 border-dashed" />
        )}

        {/* Children Content */}
        {children && (
          <div className={items || multiItems ? "mb-24" : ""}>{children}</div>
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
                  className={`mb-16 ${section.titleColor || "text-main-600"}`}
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
      </div>
    </div>
  );
}

export type { CustomCardProps };
