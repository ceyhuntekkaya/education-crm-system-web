import React from "react";
import { useCampusDetail } from "../context";
import { CustomCard, CustomImage } from "@/components/ui";

/**
 * Kampüs kapak resmi bileşeni
 */
export const CampusCoverImage: React.FC = () => {
  const { currentCampus: campus } = useCampusDetail();

  if (!campus?.coverImageUrl) {
    return (
      <CustomCard className="p-0 overflow-hidden">
        <div
          className="w-100 bg-gradient-primary-light d-flex align-items-center justify-content-center"
          style={{ height: "200px" }}
        >
          <div className="text-center">
            <i
              className="ph ph-buildings"
              style={{ fontSize: "48px", color: "#6366f1" }}
            />
            <p className="mb-0 mt-12 text-neutral-600">
              Kampüs kapak görseli mevcut değil
            </p>
          </div>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard>
      <div className="position-relative" style={{ height: "250px" }}>
        <CustomImage
          src={campus.coverImageUrl}
          alt={campus.name || "Kampüs kapak görseli"}
          fill
          className="cover-img rounded-12"
        />
        <div
          className="position-absolute bottom-0 start-0 end-0 p-24 rounded-12"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 50%, transparent 100%)",
          }}
        >
          <h2
            className="text-white mb-0 fw-bold"
            style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)" }}
          >
            {campus.name}
          </h2>
          {campus.brand && (
            <p
              className="text-white mb-0 mt-8"
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                textShadow: "0 1px 4px rgba(0, 0, 0, 0.6)",
              }}
            >
              <i className="ph ph-buildings me-2"></i>
              {campus.brand.name}
            </p>
          )}
          {campus.description && (
            <p
              className="text-white mb-0 mt-8"
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                textShadow: "0 1px 4px rgba(0, 0, 0, 0.6)",
              }}
            >
              {campus.description}
            </p>
          )}
        </div>
      </div>
    </CustomCard>
  );
};
