import React from "react";
import { useRouter } from "next/navigation";
import { CustomCard, CustomImage } from "@/components/ui";
import { useBrandDetail } from "../context/brand-detail-context";
import { renderStars } from "@/utils";

const BrandCampusSection: React.FC = () => {
  const { currentBrand } = useBrandDetail();
  const router = useRouter();

  if (!currentBrand?.campuses || currentBrand.campuses.length === 0) {
    return null;
  }

  const handleCampusClick = (campusId: number) => {
    router.push(`/company/campus-detail/${campusId}`);
  };

  return (
    <CustomCard title={`Kampüsler (${currentBrand.campuses.length})`}>
      <div className="row g-16">
        {currentBrand.campuses.map((campus, index) => (
          <div key={campus.id || index} className="col-12 col-md-6 col-xl-4">
            <div
              className="bg-white border border-neutral-30 rounded-12 h-100 d-flex flex-column overflow-hidden box-shadow-sm"
              style={{
                cursor: campus.id ? "pointer" : "default",
                transition: "all 0.25s ease-in-out",
              }}
              onClick={() => campus.id && handleCampusClick(campus.id)}
              onMouseEnter={(e) => {
                if (campus.id) {
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.12)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "var(--main-600)";
                }
              }}
              onMouseLeave={(e) => {
                if (campus.id) {
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "";
                }
              }}
              role={campus.id ? "button" : undefined}
              tabIndex={campus.id ? 0 : undefined}
              onKeyDown={(e) => {
                if (campus.id && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  handleCampusClick(campus.id);
                }
              }}
            >
              {/* Card Header with Image/Logo */}
              <div className="position-relative bg-main-25 border-bottom border-neutral-30">
                <div
                  className="d-flex align-items-center justify-content-center p-24"
                  style={{ minHeight: "140px" }}
                >
                  {campus.logoUrl ? (
                    <CustomImage
                      src={campus.logoUrl}
                      alt={campus.name || "Kampüs logosu"}
                      width={100}
                      height={100}
                      className="rounded-12 border border-neutral-30 bg-white object-cover"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center rounded-12 bg-main-600 text-white"
                      style={{ width: "100px", height: "100px" }}
                    >
                      <i
                        className="ph-bold ph-buildings"
                        style={{ fontSize: "40px" }}
                      />
                    </div>
                  )}
                </div>

                {/* Subscription Badge - Top Right Corner */}
                {campus.isSubscribed && (
                  <div
                    className="position-absolute d-inline-flex align-items-center gap-6 bg-success-600 text-white px-10 py-6 rounded-8 shadow-sm"
                    style={{ top: "12px", right: "12px" }}
                  >
                    <i
                      className="ph-fill ph-check-circle"
                      style={{ fontSize: "12px" }}
                    />
                    <span
                      className="fw-semibold"
                      style={{ fontSize: "10px", letterSpacing: "0.3px" }}
                    >
                      AKTİF ABONELİK
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-20 d-flex flex-column flex-grow-1">
                {/* Campus Name */}
                <div className="mb-16">
                  <h5 className="mb-8 text-neutral-800 fw-bold text-center">
                    {campus.name}
                  </h5>

                  {/* Location Info */}
                  {(campus.province || campus.district) && (
                    <div className="d-flex align-items-center justify-content-center gap-8 text-neutral-600">
                      <i
                        className="ph-fill ph-map-pin text-main-600"
                        style={{ fontSize: "14px" }}
                      />
                      <span className="text-sm">
                        {[campus.province?.name, campus.district?.name]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="d-flex flex-column gap-12 mb-16 flex-grow-1">
                  {/* Rating */}
                  {campus.ratingAverage && campus.ratingAverage > 0 ? (
                    <div className="d-flex align-items-center gap-12 p-12 rounded-8 bg-warning-50 border border-warning-100">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-8 bg-warning-600 text-white flex-shrink-0"
                        style={{ width: "32px", height: "32px" }}
                      >
                        <i
                          className="ph-fill ph-star"
                          style={{ fontSize: "16px" }}
                        />
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center gap-8">
                          <span className="text-sm fw-bold text-warning-800">
                            {campus.ratingAverage.toFixed(1)}
                          </span>
                          <div className="d-flex align-items-center">
                            {renderStars(campus.ratingAverage)}
                          </div>
                        </div>
                        <span
                          className="text-warning-700"
                          style={{ fontSize: "10px" }}
                        >
                          Değerlendirme
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center gap-12 p-12 rounded-8 bg-neutral-50 border border-neutral-100">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-8 bg-neutral-400 text-white flex-shrink-0"
                        style={{ width: "32px", height: "32px" }}
                      >
                        <i
                          className="ph ph-star"
                          style={{ fontSize: "16px" }}
                        />
                      </div>
                      <div className="flex-grow-1">
                        <span className="text-sm text-neutral-600">
                          Henüz değerlendirilmedi
                        </span>
                      </div>
                    </div>
                  )}

                  {/* School Count */}
                  {campus.schoolCount && campus.schoolCount > 0 ? (
                    <div className="d-flex align-items-center gap-12 p-12 rounded-8 bg-primary-50 border border-primary-100">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-8 bg-primary-600 text-white flex-shrink-0"
                        style={{ width: "32px", height: "32px" }}
                      >
                        <i
                          className="ph-fill ph-graduation-cap"
                          style={{ fontSize: "16px" }}
                        />
                      </div>
                      <div className="flex-grow-1">
                        <div className="text-sm fw-bold text-primary-800">
                          {campus.schoolCount} Okul
                        </div>
                        <span
                          className="text-primary-700"
                          style={{ fontSize: "10px" }}
                        >
                          Toplam Okul Sayısı
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center gap-12 p-12 rounded-8 bg-neutral-50 border border-neutral-100">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-8 bg-neutral-400 text-white flex-shrink-0"
                        style={{ width: "32px", height: "32px" }}
                      >
                        <i
                          className="ph ph-graduation-cap"
                          style={{ fontSize: "16px" }}
                        />
                      </div>
                      <div className="flex-grow-1">
                        <span className="text-sm text-neutral-600">
                          Okul bilgisi mevcut değil
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer - View Details */}
                {campus.id && (
                  <div className="d-flex align-items-center justify-content-center gap-8 pt-12 border-top border-neutral-100">
                    <span className="text-xs text-main-600 fw-medium">
                      Detayları Görüntüle
                    </span>
                    <i
                      className="ph-bold ph-arrow-right text-main-600"
                      style={{ fontSize: "14px" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CustomCard>
  );
};

export default BrandCampusSection;
