import React from "react";
import { CustomCard, CustomImage } from "@/components/ui";
import { useBrandDetail } from "../context/brand-detail-context";
import { renderStars } from "@/utils";

const BrandCampusSection: React.FC = () => {
  const { currentBrand } = useBrandDetail();

  if (!currentBrand?.campuses || currentBrand.campuses.length === 0) {
    return null;
  }

  const campusCards = currentBrand.campuses.map((campus, index) => ({
    title: "",
    items: [
      {
        label: "",
        value: (
          <div className="p-3">
            <div className="row align-items-center">
              {/* Sol Taraf - Kampüs Bilgileri */}
              <div className="col-md-8 pe-4">
                <div className="d-flex align-items-start gap-16">
                  {campus.logoUrl && (
                    <CustomImage
                      src={campus.logoUrl}
                      alt={campus.name || "Kampüs logosu"}
                      width={44}
                      height={44}
                      className="rounded-8 border border-neutral-30 flex-shrink-0"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <div className="flex-grow-1 min-w-0">
                    <h6 className="mb-6 text-neutral-800 fw-semibold lh-sm text-truncate">
                      {campus.name}
                    </h6>

                    {campus.ratingAverage && campus.ratingAverage > 0 && (
                      <div className="d-flex align-items-center gap-6 mb-8">
                        {renderStars(campus.ratingAverage)}
                        <span className="text-xs text-neutral-500 fw-medium">
                          ({campus.ratingAverage.toFixed(1)})
                        </span>
                      </div>
                    )}

                    {/* Lokasyon Bilgileri */}
                    {(campus.province || campus.district) && (
                      <div className="d-flex flex-wrap gap-6">
                        {campus.province && (
                          <span
                            className="badge bg-primary-50 text-primary-600 px-8 py-4"
                            style={{ fontSize: "11px" }}
                          >
                            <i
                              className="ph ph-map-pin me-4"
                              style={{ fontSize: "11px" }}
                            ></i>
                            {campus.province.name}
                          </span>
                        )}
                        {campus.district && (
                          <span
                            className="badge bg-info-50 text-info-600 px-8 py-4"
                            style={{ fontSize: "11px" }}
                          >
                            <i
                              className="ph ph-buildings me-4"
                              style={{ fontSize: "11px" }}
                            ></i>
                            {campus.district.name}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sağ Taraf - İstatistikler */}
              <div className="col-md-4">
                <div className="row g-1">
                  {campus.schoolCount && campus.schoolCount > 0 && (
                    <div className="col-4">
                      <div className="text-center p-6 bg-primary-25 rounded-4">
                        <i
                          className="ph ph-graduation-cap text-primary-600 d-block mb-1"
                          style={{ fontSize: "14px" }}
                        ></i>
                        <div
                          className="fw-semibold text-primary-700"
                          style={{ fontSize: "11px" }}
                        >
                          {campus.schoolCount}
                        </div>
                        <div
                          style={{ fontSize: "8px" }}
                          className="text-neutral-500"
                        >
                          Okul
                        </div>
                      </div>
                    </div>
                  )}

                  {campus.slug && (
                    <div className="col-4">
                      <div className="text-center p-6 bg-info-25 rounded-4">
                        <i
                          className="ph ph-link text-info-600 d-block mb-1"
                          style={{ fontSize: "14px" }}
                        ></i>
                        <div
                          className="fw-semibold text-info-700"
                          style={{ fontSize: "10px" }}
                        >
                          {campus.slug.length > 6
                            ? campus.slug.substring(0, 6) + "..."
                            : campus.slug}
                        </div>
                        <div
                          style={{ fontSize: "8px" }}
                          className="text-neutral-500"
                        >
                          URL
                        </div>
                      </div>
                    </div>
                  )}

                  {typeof campus.isSubscribed !== "undefined" && (
                    <div className="col-4">
                      <div className="text-center p-6 bg-success-25 rounded-4">
                        <i
                          className={`ph ${
                            campus.isSubscribed
                              ? "ph-check-circle"
                              : "ph-x-circle"
                          } text-success-600 d-block mb-1`}
                          style={{ fontSize: "14px" }}
                        ></i>
                        <div
                          className="fw-semibold text-success-700"
                          style={{ fontSize: "11px" }}
                        >
                          {campus.isSubscribed ? "Aktif" : "Pasif"}
                        </div>
                        <div
                          style={{ fontSize: "8px" }}
                          className="text-neutral-500"
                        >
                          Durum
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ),
        isShowing: true,
      },
    ],
  }));

  return (
    <CustomCard
      title="Kampüsler"
      multiItems={campusCards}
      itemDirection="column"
    />
  );
};

export default BrandCampusSection;
