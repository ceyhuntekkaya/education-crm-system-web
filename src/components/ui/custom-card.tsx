"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Icon from "./icon";
import { Button } from "@/components";
import { useDelete, useScroll } from "@/hooks";
import { LoadingSpinner } from "./loadings";

interface CustomCardProps {
  /** Card type (default: "card") */
  type?: "card" | "accordion";
  /** Card size (default: "xl") */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Card header title */
  title?: string;
  /** Card header subtitle */
  subtitle?: string | ReactNode;
  /** Header action component (buttons, etc.) */
  headerAction?: ReactNode;

  // State Props
  /** Loading state - shows loading spinner */
  isLoading?: boolean;
  /** Loading message (default: "Yükleniyor...") */
  loadingMessage?: string;
  /** Loading spinner variant */
  loadingVariant?: "spinner" | "dots" | "pulse";
  /** Error state - shows error message */
  isError?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Error icon (default: "ph-warning-circle") */
  errorIcon?: string;
  /** Empty state - shows when no data */
  isEmpty?: boolean;
  /** Empty message */
  emptyMessage?: string;
  /** Empty description */
  emptyDescription?: string;
  /** Empty icon (default: "ph-clipboard-text") */
  emptyIcon?: string;

  /** Add button URL - if provided, "Yeni Ekle" button will be shown */
  addButtonUrl?: string;
  /** Edit button URL - if provided, "Düzenle" button will be shown */
  editButtonUrl?: string;
  /** Delete API URL - if provided, "Sil" button will be shown and delete handled internally */
  deleteUrl?: string;
  /** Delete confirmation message - shown before delete (optional) */
  deleteConfirmMessage?: string;
  /** Back button - if true, shows back button with router.back(). If string (URL), navigates to that URL */
  isBack?: boolean | string;
  /** Forward button - if true, shows forward button with router.forward(). If string (URL), navigates to that URL */
  isForward?: boolean | string;
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
  /** Mobile header padding (applies on mobile only) */
  mobileHeaderPadding?: string;
  /** Mobile padding (applies on mobile only) */
  mobilePadding?: string;
  /** Show divider line after header (default: true) */
  showDivider?: boolean;
  /** Item layout direction (default: "row") */
  itemDirection?: "row" | "column";

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
  // State Props
  isLoading = false,
  loadingMessage = "Yükleniyor...",
  loadingVariant = "dots",
  isError = false,
  errorMessage = "Bir hata oluştu",
  errorIcon = "ph-warning-circle",
  isEmpty = false,
  emptyMessage = "Veri bulunamadı",
  emptyDescription,
  emptyIcon = "ph-clipboard-text",
  addButtonUrl,
  editButtonUrl,
  deleteUrl,
  deleteConfirmMessage,
  isBack,
  isForward,
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
  headerPadding,
  mobileHeaderPadding,
  mobilePadding,
  showDivider = true,
  itemDirection = "row",
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
  // Router for navigation
  const router = useRouter();

  // Delete hook - only initialize if deleteUrl is provided
  const { mutate: deleteItem, loading: deleteLoading } = useDelete(
    deleteUrl || "",
  );

  // Scroll hook for accordion
  const { ref: cardRef, scrollToElement } = useScroll<HTMLDivElement>({
    behavior: "smooth",
    block: "start",
  });

  // Accordion state
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevOpenRef = useRef(false); // Önceki açık durumunu takip eder

  // Combine all spacing classes
  const spacingClasses = [spacing, mt, mb, ms, me, pt, pb, ps, pe]
    .filter(Boolean)
    .join(" ");

  // Size-based padding classes
  const getHeaderPaddingClass = (size: string) => {
    if (headerPadding) return headerPadding;
    switch (size) {
      case "xs":
        return "p-12";
      case "sm":
        return "p-16";
      case "md":
        return "p-24";
      case "lg":
        return "p-28";
      case "xl":
      default:
        return "p-32";
    }
  };

  const getDividerSpacing = (size: string) => {
    switch (size) {
      case "xs":
        return "my-8";
      case "sm":
        return "my-12";
      case "md":
        return "my-16";
      case "lg":
        return "my-20";
      case "xl":
      default:
        return "my-24";
    }
  };

  // Size-based font classes
  const getTitleClass = (size: string) => {
    switch (size) {
      case "xs":
        return "custom-card-title-xs mb-2"; // Smallest title
      case "sm":
        return "custom-card-title-sm mb-4"; // Small title
      case "md":
        return "custom-card-title-md mb-6"; // Medium title
      case "lg":
        return "custom-card-title-lg mb-8"; // Large title
      case "xl":
      default:
        return "custom-card-title-xl mb-8"; // Extra large title (default)
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

  // Dynamic subtitle based on state
  const getSubtitle = () => {
    if (isLoading) return "Yükleniyor...";
    if (isError) return "Hata oluştu";
    if (isEmpty) return "Veri bulunamadı";
    return subtitle;
  };

  const hasHeader =
    title ||
    subtitle ||
    headerAction ||
    addButtonUrl ||
    editButtonUrl ||
    deleteUrl ||
    isBack ||
    isForward;
  const hasContent = children || items || multiItems;

  // Navigation handlers
  const handleBackClick = () => {
    if (typeof isBack === "string") {
      router.push(isBack);
    } else {
      router.back();
    }
  };

  const handleForwardClick = () => {
    if (typeof isForward === "string") {
      router.push(isForward);
    } else {
      router.forward();
    }
  };

  // Delete handler
  const handleDeleteClick = async () => {
    if (!deleteUrl) return;

    const confirmMessage =
      deleteConfirmMessage || "Silmek istediğinize emin misiniz?";
    const confirmDelete = window.confirm(confirmMessage);

    if (confirmDelete) {
      try {
        await deleteItem(null);
        router.back();
      } catch (error) {
        console.error("Silme işlemi sırasında hata oluştu:", error);
      }
    }
  };

  // Render State Content (Loading, Error, Empty)
  const renderStateContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-5">
          <LoadingSpinner
            message={loadingMessage}
            variant={loadingVariant}
            size="md"
          />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center py-8">
          <div className="mb-4">
            <i
              className={`ph ${errorIcon} text-danger`}
              style={{ fontSize: "4rem" }}
            ></i>
          </div>
          <h5 className="text-danger fw-semibold mb-2">{errorMessage}</h5>
          {errorMessage === "Bir hata oluştu" && (
            <p className="text-neutral-500 mb-0">
              Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.
            </p>
          )}
        </div>
      );
    }

    if (isEmpty) {
      return (
        <div className="text-center py-8">
          <div className="mb-4">
            <i
              className={`ph ${emptyIcon} text-neutral-400`}
              style={{ fontSize: "4rem" }}
            ></i>
          </div>
          <h5 className="text-neutral-700 fw-semibold mb-2">{emptyMessage}</h5>
          {emptyDescription && (
            <p
              className="text-neutral-500 mb-0"
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              {emptyDescription}
            </p>
          )}
        </div>
      );
    }

    return null;
  };

  // Calculate content height for smooth animation
  useEffect(() => {
    if (contentRef.current) {
      if (type === "accordion") {
        setContentHeight(isAccordionOpen ? contentRef.current.scrollHeight : 0);
      } else {
        setContentHeight(contentRef.current.scrollHeight);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAccordionOpen, type]);

  // Accordion toggle function
  const toggleAccordion = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    if (type === "accordion") {
      setIsAccordionOpen(!isAccordionOpen);
    }
  };

  // Scroll to accordion when opened (only when state changes from closed to open)
  useEffect(() => {
    if (type === "accordion" && isAccordionOpen && !prevOpenRef.current) {
      // Delay scroll to ensure content is rendered
      setTimeout(() => {
        scrollToElement({ delay: 100 });
      }, 100);
    }
    // Update previous state
    prevOpenRef.current = isAccordionOpen;
  }, [isAccordionOpen, type, scrollToElement]);

  // Responsive padding classes
  const responsivePadding = mobilePadding
    ? `${padding} mobile-custom-padding`
    : padding;
  const responsiveHeaderPadding = mobileHeaderPadding
    ? `${getHeaderPaddingClass(size)} mobile-custom-header-padding`
    : getHeaderPaddingClass(size);

  return (
    <div
      ref={cardRef}
      className={
        variant === "outline"
          ? ``
          : `${border} ${borderRadius} ${cardBgColor} ${responsivePadding} ${spacingClasses} ${className}`
      }
      style={{
        ["--mobile-padding" as any]: mobilePadding,
        ["--mobile-header-padding" as any]: mobileHeaderPadding,
      }}
    >
      <div
        className={`${border} ${borderRadius} ${headerColor} ${responsiveHeaderPadding}`}
      >
        {hasHeader && (
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div>
              {title && <h2 className={getTitleClass(size)}>{title}</h2>}
              {getSubtitle() && (
                <p className={getSubtitleClass(size)}>{getSubtitle()}</p>
              )}
            </div>
            <div className="d-flex align-items-center gap-12">
              {headerAction && <div>{headerAction}</div>}

              {/* Navigation Buttons (Geri/İleri) */}
              {isBack && (
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon="ph-arrow-left"
                  onClick={handleBackClick}
                >
                  Geri Dön
                </Button>
              )}

              {editButtonUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon="ph-pencil-simple"
                  href={editButtonUrl}
                >
                  Düzenle
                </Button>
              )}

              {deleteUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon="ph-trash"
                  onClick={handleDeleteClick}
                  loading={deleteLoading}
                  disabled={deleteLoading}
                  className="btn-danger-outline"
                >
                  Sil
                </Button>
              )}

              {/* Action Buttons (Yeni Ekle/Düzenle) */}
              {addButtonUrl && (
                <Button
                  variant="inline"
                  size="sm"
                  leftIcon="ph-plus"
                  href={addButtonUrl}
                >
                  Yeni Ekle
                </Button>
              )}

              {isForward && (
                <Button
                  variant="outline"
                  size="sm"
                  rightIcon="ph-arrow-right"
                  onClick={handleForwardClick}
                >
                  İleri Git
                </Button>
              )}

              {/* Accordion Toggle */}
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
                } ${responsivePadding}`
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
                <span
                  className={`d-block border border-neutral-30 ${getDividerSpacing(
                    size,
                  )} border-dashed`}
                />
              )}

              {/* State Content (Loading, Error, Empty) */}
              {renderStateContent()}

              {/* Normal Content - only show if not in a state */}
              {!isLoading && !isError && !isEmpty && (
                <>
                  {/* Children Content */}
                  {children && (
                    <div
                      className={
                        items || multiItems
                          ? size === "xs"
                            ? "mb-12"
                            : size === "sm"
                              ? "mb-16"
                              : "mb-24"
                          : ""
                      }
                    >
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
                            className={`d-flex px-32 py-16 ${
                              itemDirection === "column"
                                ? "flex-column align-items-start"
                                : "align-items-start"
                            }`}
                          >
                            <span
                              className={`fw-semibold text-neutral-700 ${
                                itemDirection === "column"
                                  ? "w-100 mb-8"
                                  : "w-50-percent"
                              }`}
                            >
                              {item.label}
                              {item.sublabel && (
                                <span className="d-block text-xs text-neutral-500 fw-normal mt-4">
                                  {item.sublabel}
                                </span>
                              )}
                            </span>
                            <span
                              className={`fw-normal text-neutral-500 text-md ${
                                itemDirection === "column"
                                  ? "w-100"
                                  : "w-50-percent"
                              }`}
                            >
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
                        (item) => item.isShowing,
                      );

                      if (filteredItems.length === 0) return null;

                      return (
                        <div key={sectionIndex}>
                          {/* Section Title */}
                          <h4
                            className={`${
                              size === "xs"
                                ? "mb-8"
                                : size === "sm"
                                  ? "mb-12"
                                  : "mb-16"
                            } ${section.titleColor || "text-main-600"}`}
                          >
                            {section.titleIcon && (
                              <i className={`${section.titleIcon} me-8`}></i>
                            )}
                            {section.title}
                          </h4>
                          <span
                            className={`d-block border border-neutral-30 ${getDividerSpacing(
                              size,
                            )} border-dashed`}
                          />

                          {/* Section Items */}
                          <ul
                            className={`tution-info-list bg-white rounded-8 ${
                              sectionIndex < multiItems.length - 1
                                ? size === "xs"
                                  ? "mb-16"
                                  : size === "sm"
                                    ? "mb-20"
                                    : "mb-32"
                                : ""
                            }`}
                          >
                            {filteredItems.map((item, index) => (
                              <li
                                key={index}
                                className={`d-flex px-32 py-16 ${
                                  itemDirection === "column"
                                    ? "flex-column align-items-start"
                                    : "align-items-start"
                                }`}
                              >
                                <span
                                  className={`fw-semibold text-neutral-700 ${
                                    itemDirection === "column"
                                      ? "w-100 mb-8"
                                      : "w-50-percent"
                                  }`}
                                >
                                  {item.label}
                                  {item.sublabel && (
                                    <span className="d-block text-xs text-neutral-500 fw-normal mt-4">
                                      {item.sublabel}
                                    </span>
                                  )}
                                </span>
                                <span
                                  className={`fw-normal text-neutral-500 text-md ${
                                    itemDirection === "column"
                                      ? "w-100"
                                      : "w-50-percent"
                                  }`}
                                >
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export type { CustomCardProps };
