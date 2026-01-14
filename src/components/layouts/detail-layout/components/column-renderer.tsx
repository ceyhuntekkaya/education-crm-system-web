import React from "react";
import { DetailColumn, DetailColumnsConfig } from "../types";

interface ColumnRendererProps {
  columnsConfig: DetailColumnsConfig<any>;
}

// Helper function to extract color prefix from iconColor
const getColorPrefix = (iconColor?: string) => {
  if (!iconColor) return "primary";
  const parts = iconColor.split("-");
  return parts[1] || "primary";
};

export const ColumnRenderer: React.FC<ColumnRendererProps> = ({
  columnsConfig,
}) => {
  const { data, columns } = columnsConfig;

  if (!data || !columns) return null;

  // Filter columns based on conditions and group by section
  const filteredColumns = columns.filter((column) => {
    if (column.condition && !column.condition(data)) return false;
    return true;
  });

  // Sort by order
  filteredColumns.sort((a, b) => (a.order || 0) - (b.order || 0));

  // Group by section
  const sections = filteredColumns.reduce((acc, column) => {
    if (!acc[column.section]) {
      acc[column.section] = [];
    }
    acc[column.section].push(column);
    return acc;
  }, {} as Record<string, DetailColumn[]>);

  const renderSection = (
    sectionType: keyof typeof sections,
    sectionColumns: DetailColumn[]
  ) => {
    // Meta section için özel render
    if (sectionType === "meta") {
      return (
        <div
          key={sectionType}
          className="meta-container bg-white rounded-12 p-12"
          style={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(17, 24, 39, 0.06)",
            transition:
              "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
          }}
        >
          {sectionColumns.map((column, index) => {
            // Backward compatibility için renderCell kontrolü
            if (column.renderCell) {
              return (
                <React.Fragment key={column.field}>
                  {column.renderCell(data)}
                  {index < sectionColumns.length - 1 && (
                    <div className="meta-item-divider"></div>
                  )}
                </React.Fragment>
              );
            }

            // URL veya clickable kontrolü (tek seferde hesaplanıyor)
            const clickUrl = column.url
              ? typeof column.url === "string"
                ? column.url
                : column.url(data)
              : null;
            const isClickable =
              clickUrl || (column.metaClickable && column.metaClickable(data));

            const handleClick = () => {
              if (clickUrl) {
                window.location.href = clickUrl;
              } else if (column.metaOnClick) {
                column.metaOnClick(data);
              }
            };

            return (
              <React.Fragment key={column.field}>
                <div
                  className={`meta-item ${
                    isClickable ? "meta-item-clickable" : ""
                  }`}
                  onClick={isClickable ? handleClick : undefined}
                  style={{ cursor: isClickable ? "pointer" : "default" }}
                  role={isClickable ? "button" : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                >
                  <div className="meta-icon-wrapper">
                    <div
                      className={`meta-icon bg-${getColorPrefix(
                        column.iconColor
                      )}-100 ${column.iconColor || "text-primary-700"}`}
                    >
                      <i className={column.icon}></i>
                    </div>
                  </div>
                  <div className="meta-content">
                    <p
                      className="meta-label mb-0"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {column.headerName}
                    </p>
                    <span
                      className="meta-value fw-bold"
                      style={{ fontSize: "1.25rem" }}
                    >
                      {(data as any)[column.field] || 0}
                    </span>
                  </div>
                </div>
                {index < sectionColumns.length - 1 && (
                  <div className="meta-item-divider"></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      );
    }

    // Dates section için özel render
    if (sectionType === "dates") {
      return (
        <div key={sectionType} className="rows gap-16">
          {sectionColumns.map((column) => {
            const gridClass = column.grid ? `col-${column.grid}` : "col-12";
            // Eğer renderCell varsa onu kullan
            if (column.renderCell) {
              return (
                <div key={column.field} className={gridClass}>
                  {column.renderCell(data)}
                </div>
              );
            }

            // Değeri al
            const value = (data as any)[column.field];
            if (!value) return null;

            const formatDate = (dateString: string) => {
              const date = new Date(dateString);
              return date.toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
            };

            // submissionDeadline için özel içerik
            if (column.field === "submissionDeadline") {
              // Tarih hesaplamaları
              const deadline = new Date(value);
              const now = new Date();
              const isExpired = deadline < now;
              const diffTime = deadline.getTime() - now.getTime();
              const daysUntilDeadline = Math.ceil(
                diffTime / (1000 * 60 * 60 * 24)
              );
              const isApproaching =
                !isExpired && daysUntilDeadline > 0 && daysUntilDeadline <= 7;

              const getStatusColor = () => {
                if (isExpired) return "text-danger-600";
                if (isApproaching) return "text-warning-600";
                return "text-success-600";
              };

              const getStatusText = () => {
                if (isExpired) return "Süresi Doldu";
                if (isApproaching) return `${daysUntilDeadline} gün kaldı`;
                return "Aktif";
              };

              return (
                <div key={column.field} className={gridClass}>
                  <div
                    className="bg-white rounded-12 p-12 h-100"
                    style={{
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                      border: "1px solid rgba(17, 24, 39, 0.06)",
                      transition:
                        "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 16px rgba(0, 0, 0, 0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0px)";
                      e.currentTarget.style.boxShadow =
                        "0 2px 8px rgba(0, 0, 0, 0.04)";
                    }}
                  >
                    <div className="d-flex align-items-center gap-8 mb-8">
                      <div
                        className={`d-flex align-items-center justify-content-center bg-${getColorPrefix(
                          column.iconColor
                        )}-100 ${column.iconColor || "text-primary-700"}`}
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "6px",
                          fontSize: "14px",
                        }}
                      >
                        <i className={column.icon}></i>
                      </div>
                      <h5
                        className="mb-0 fw-semibold text-neutral-900"
                        style={{ fontSize: "0.875rem" }}
                      >
                        {column.headerName}
                      </h5>
                    </div>
                    <div style={{ paddingTop: "4px" }}>
                      <div className="d-flex align-items-center gap-8">
                        <span
                          className={`fw-bold ${getStatusColor()}`}
                          style={{ fontSize: "1rem" }}
                        >
                          {formatDate(value)}
                        </span>
                        <span
                          className="text-neutral-600"
                          style={{ fontSize: "0.75rem" }}
                        >
                          • {getStatusText()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Diğer tarih alanları için standart render
            return (
              <div key={column.field} className={gridClass}>
                <div
                  className="bg-white rounded-12 p-12 h-100"
                  style={{
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                    border: "1px solid rgba(17, 24, 39, 0.06)",
                    transition:
                      "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(0, 0, 0, 0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0px)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0, 0, 0, 0.04)";
                  }}
                >
                  <div className="d-flex align-items-center gap-8 mb-8">
                    <div
                      className={`d-flex align-items-center justify-content-center bg-${getColorPrefix(
                        column.iconColor
                      )}-100 ${column.iconColor || "text-primary-700"}`}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    >
                      <i className={column.icon}></i>
                    </div>
                    <h5
                      className="mb-0 fw-semibold text-neutral-900"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {column.headerName}
                    </h5>
                  </div>
                  <div style={{ paddingTop: "4px" }}>
                    <span
                      className="fw-bold text-neutral-900"
                      style={{ fontSize: "1rem" }}
                    >
                      {formatDate(value)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Info section için özel render (badges ile)
    if (sectionType === "info") {
      return (
        <div key={sectionType} className="">
          {sectionColumns.map((column) => (
            <div key={column.field}>
              {column.renderCell
                ? column.renderCell(data)
                : (data as any)[column.field]}
            </div>
          ))}
        </div>
      );
    }

    // Rating section için özel render
    if (sectionType === "rating") {
      return (
        <div key={sectionType} className="rows gap-16">
          {sectionColumns.map((column) => {
            const gridClass = column.grid ? `col-${column.grid}` : "col-12";
            // Eğer renderCell varsa onu kullan
            if (column.renderCell) {
              return (
                <div key={column.field} className={gridClass}>
                  {column.renderCell(data)}
                </div>
              );
            }

            // Rating değerini al
            const rating = (data as any)[column.field];
            if (!rating && rating !== 0) return null;

            const roundedRating = Math.round(rating);
            const formattedRating =
              typeof rating === "number" ? rating.toFixed(1) : rating;

            return (
              <div key={column.field} className={gridClass}>
                <div
                  className="bg-white rounded-12 p-12 h-100"
                  style={{
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                    border: "1px solid rgba(17, 24, 39, 0.06)",
                    transition:
                      "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(0, 0, 0, 0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0px)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0, 0, 0, 0.04)";
                  }}
                >
                  <div className="d-flex align-items-center gap-8 mb-8">
                    <div
                      className={`d-flex align-items-center justify-content-center bg-${getColorPrefix(
                        column.iconColor
                      )}-100 ${column.iconColor || "text-warning-700"}`}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    >
                      <i className={column.icon || "ph-fill ph-star"}></i>
                    </div>
                    <h5
                      className="mb-0 fw-semibold text-neutral-900"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {column.headerName}
                    </h5>
                  </div>
                  <div style={{ paddingTop: "4px" }}>
                    <div className="d-flex align-items-center gap-8">
                      <span
                        className="fw-bold text-warning-700"
                        style={{ fontSize: "1rem" }}
                      >
                        {formattedRating}
                      </span>
                      <div className="d-flex align-items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i
                            key={star}
                            className={
                              star <= roundedRating
                                ? "ph-fill ph-star text-warning-500"
                                : "ph ph-star text-neutral-300"
                            }
                            style={{ fontSize: "1rem" }}
                          ></i>
                        ))}
                      </div>
                      <span
                        className="text-neutral-600"
                        style={{ fontSize: "0.75rem" }}
                      >
                        • 5 üzerinden
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Details section için genel render
    return (
      <div key={sectionType} className="rows gap-16">
        {sectionColumns.map((column) => {
          const gridClass = column.grid ? `col-${column.grid}` : "col-12";
          return (
            <div key={column.field} className={gridClass}>
              <div
                className="bg-white rounded-12 p-12 h-100"
                style={{
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  border: "1px solid rgba(17, 24, 39, 0.06)",
                  transition:
                    "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(0, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0, 0, 0, 0.04)";
                }}
              >
                <div className="d-flex align-items-center gap-8 mb-8">
                  <div
                    className={`d-flex align-items-center justify-content-center bg-${getColorPrefix(
                      column.iconColor
                    )}-100 ${column.iconColor || "text-primary-700"}`}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  >
                    <i className={column.icon}></i>
                  </div>
                  <h5
                    className="mb-0 fw-semibold text-neutral-900"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {column.headerName}
                  </h5>
                </div>
                <div style={{ paddingTop: "4px" }}>
                  {column.renderCell
                    ? column.renderCell(data)
                    : (data as any)[column.field]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="column-renderer d-flex flex-column gap-16">
      {/* Info Section - En üstte */}
      {sections.info && renderSection("info", sections.info)}

      {/* Meta Section - İkinci sırada */}
      {sections.meta && renderSection("meta", sections.meta)}

      {/* Dates Section - Üçüncü sırada */}
      {sections.dates && renderSection("dates", sections.dates)}

      {/* Rating Section - Dördüncü sırada */}
      {sections.rating && renderSection("rating", sections.rating)}

      {/* Details Section - En altta */}
      {sections.details && renderSection("details", sections.details)}
    </div>
  );
};
