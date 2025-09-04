import { memo, useState } from "react";
import Image from "next/image";
import { SchoolSearchResultDto } from "@/types/institution/InstitutionSearch.types";
import { Button } from "@/components";

interface InstitutionCardProps {
  institution: SchoolSearchResultDto;
  className?: string;
  isExpanded?: boolean;
  onCardClick?: () => void;
  animationDelay?: string;
}

export const InstitutionCard = memo(
  ({
    institution,
    className = "",
    isExpanded = false,
    onCardClick,
    animationDelay = "0ms",
  }: InstitutionCardProps) => {
    const [showAllHighlights, setShowAllHighlights] = useState(false);
    const [showAllProperties, setShowAllProperties] = useState(false);

    const hasActiveCampaign =
      institution.hasActiveCampaigns &&
      Array.isArray(institution.activeCampaigns) &&
      institution.activeCampaigns.length > 0 &&
      institution.activeCampaigns[0]?.badgeText;

    const visibleCardProperties =
      institution.cardProperties?.filter((prop) => prop.showInCard) || [];
    const visibleHighlights = institution.highlights || [];

    return (
      <div className={className}>
        <div
          className="bg-white rounded-16 p-16 h-100 box-shadow-md cursor-pointer card-expand-transition position-relative overflow-hidden d-flex flex-column"
          style={{ animationDelay, transitionDelay: animationDelay }}
        >
          {/* Normal Layout - Modern Compact Card */}
          {!isExpanded && (
            <div className="d-flex flex-column h-100">
              {/* Hero Cover Image - Temiz */}
              <div
                className="position-relative rounded-16 overflow-hidden mb-20 scale-hover-item"
                style={{ height: "180px" }}
              >
                <div className="w-100 h-100 d-block">
                  {institution.coverImageUrl ? (
                    <Image
                      src={institution.coverImageUrl}
                      alt={institution.name ?? "Institution Cover"}
                      fill
                      className="scale-hover-item__img object-cover transition-3"
                    />
                  ) : (
                    <div className="w-100 h-100 bg-main-600 d-flex align-items-center justify-content-center position-relative scale-hover-item__img transition-3">
                      <div className="text-center text-white z-2">
                        <i
                          className="ph ph-graduation-cap mb-8"
                          style={{ fontSize: "32px" }}
                        ></i>
                        <p className="text-sm fw-medium mb-0">Kurum Görseli</p>
                      </div>
                      <div className="position-absolute inset-0 bg-gradient-to-br from-main-600 to-main-800 opacity-90"></div>
                    </div>
                  )}
                </div>

                {/* Sadece Action Buttons */}
                <div className="position-absolute inset-block-end-12 inset-inline-end-12 d-flex gap-6">
                  <button
                    className={`w-32 h-32 rounded-8 d-flex align-items-center justify-content-center transition-3 backdrop-blur ${
                      institution.isFavorite
                        ? "bg-danger-600 text-white"
                        : "bg-white bg-opacity-90 text-neutral-700 hover-bg-danger-50 hover-text-danger-600"
                    }`}
                  >
                    <i
                      className={`ph ${
                        institution.isFavorite ? "ph-fill" : ""
                      } ph-heart text-sm`}
                    ></i>
                  </button>
                  {institution.isSubscribed && (
                    <button className="w-32 h-32 rounded-8 bg-success-600 text-white d-flex align-items-center justify-content-center backdrop-blur">
                      <i className="ph ph-check text-sm"></i>
                    </button>
                  )}
                </div>
              </div>

              {/* Content Card */}
              <div className="px-8 d-flex flex-column flex-grow-1">
                {/* Institution Type ve Campaign Badges */}
                <div className="mb-16">
                  <div className="d-flex flex-wrap gap-6">
                    {/* Institution Type Badge */}
                    {(institution.institutionTypeName ||
                      institution.institutionTypeIcon) && (
                      <span
                        className="d-flex align-items-center gap-4 px-8 py-4 rounded-pill text-xs fw-medium border"
                        style={{
                          backgroundColor: institution.institutionTypeColor
                            ? `${institution.institutionTypeColor}15`
                            : "#f8f9fa",
                          borderColor:
                            institution.institutionTypeColor ?? "#dee2e6",
                          color: institution.institutionTypeColor ?? "#6c757d",
                        }}
                      >
                        {institution.institutionTypeIcon && (
                          <i
                            className={`ph ${institution.institutionTypeIcon}`}
                          ></i>
                        )}
                        {institution.institutionTypeName}
                      </span>
                    )}

                    {/* Campaign Badge */}
                    {hasActiveCampaign && (
                      <span
                        className="d-flex align-items-center gap-4 px-8 py-4 rounded-pill text-xs fw-medium border"
                        style={{
                          backgroundColor: institution.activeCampaigns![0]
                            .badgeColor
                            ? `${institution.activeCampaigns![0].badgeColor}15`
                            : "#fff5f5",
                          borderColor:
                            institution.activeCampaigns![0].badgeColor ??
                            "#f56565",
                          color:
                            institution.activeCampaigns![0].badgeColor ??
                            "#f56565",
                        }}
                      >
                        <i className="ph ph-megaphone"></i>
                        {institution.activeCampaigns![0].badgeText}
                      </span>
                    )}
                  </div>
                </div>
                {/* Header - Logo and Title */}
                <div className="d-flex align-items-start gap-12 mb-16">
                  <div className="w-48 h-48 rounded-12 overflow-hidden flex-shrink-0 bg-neutral-50 border border-neutral-200">
                    {institution.logoUrl ? (
                      <Image
                        src={institution.logoUrl}
                        alt={`${institution.name ?? "Institution"} Logo`}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-100 h-100 bg-main-50 d-flex align-items-center justify-content-center">
                        <i className="ph ph-buildings text-main-400"></i>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow-1">
                    <h4 className="h6 mb-6 text-heading fw-bold line-clamp-2">
                      {institution.name ?? "İsim Yok"}
                    </h4>
                    {institution.campusName && (
                      <p className="text-xs text-neutral-600 mb-0 d-flex align-items-center gap-4">
                        <i className="ph ph-map-pin"></i>
                        {institution.campusName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Location Info */}
                <div className="d-flex align-items-center gap-8 mb-12 p-8 bg-neutral-25 rounded-8">
                  <i className="ph ph-map-pin text-neutral-500"></i>
                  <span className="text-sm text-neutral-700 fw-medium">
                    {[institution.district, institution.city]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                  {institution.distanceKm != null && (
                    <span className="text-xs text-neutral-500 ms-auto">
                      {institution.distanceKm} km
                    </span>
                  )}
                </div>

                {/* Stats Row */}
                <div className="row g-8 mb-16">
                  <div className="col-6">
                    <div className="text-center p-8 bg-warning-25 rounded-8">
                      <div className="d-flex align-items-center justify-content-center gap-4 mb-2">
                        <i className="ph-fill ph-star text-warning-600 text-sm"></i>
                        <span className="text-sm fw-bold text-warning-800">
                          {institution.ratingAverage ?? "-"}
                        </span>
                      </div>
                      <p className="text-xs text-warning-700 mb-0">
                        ({institution.ratingCount ?? 0})
                      </p>
                    </div>
                  </div>
                  <div className="col-6">
                    {institution.formattedPrice && (
                      <div className="text-center p-8 bg-main-25 rounded-8">
                        <div className="text-sm fw-bold text-main-800 mb-2">
                          {institution.formattedPrice}
                        </div>
                        <p className="text-xs text-main-600 mb-0">aylık</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Highlights Pills */}
                {visibleHighlights.length > 0 && (
                  <div className="mb-24">
                    <div className="d-flex flex-wrap gap-4">
                      {visibleHighlights.slice(0, 2).map((highlight, index) => (
                        <span
                          key={index}
                          className="px-8 py-4 bg-success-50 text-success-700 rounded-pill text-xs fw-medium d-flex align-items-center gap-4 border border-success-100"
                        >
                          <i
                            className="ph ph-check-circle text-success-600"
                            style={{ fontSize: "10px" }}
                          ></i>
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Expand Trigger - İçerik alanında */}
              <div className="border-top border-neutral-100">
                <Button
                  variant="outline"
                  onClick={onCardClick}
                  size="sm"
                  rightIcon="ph-caret-down"
                  fullWidth
                  className="mt-24"
                >
                  Detayları gör
                </Button>
              </div>
            </div>
          )}

          {/* Expanded Layout - Modern Card Design */}
          {isExpanded && (
            <div className="content-fade-in">
              <div className="row g-0">
                {/* Sol Kolon - Görsel ve Ana Bilgiler */}
                <div className="col-5">
                  <div className="pe-24">
                    {/* Hero Görsel - Temiz */}
                    <div
                      className="position-relative rounded-16 overflow-hidden mb-24 scale-hover-item"
                      style={{ height: "280px" }}
                    >
                      <div className="w-100 h-100 d-block">
                        {institution.coverImageUrl ? (
                          <Image
                            src={institution.coverImageUrl}
                            alt={institution.name ?? "Institution Cover"}
                            fill
                            className="scale-hover-item__img object-cover transition-3"
                          />
                        ) : (
                          <div className="w-100 h-100 bg-main-600 d-flex align-items-center justify-content-center position-relative scale-hover-item__img transition-3">
                            <div className="text-center text-white z-2">
                              <i
                                className="ph ph-graduation-cap mb-12"
                                style={{ fontSize: "64px" }}
                              ></i>
                              <p className="fw-medium">Kurum Görseli</p>
                            </div>
                            {/* Gradient overlay */}
                            <div className="position-absolute inset-0 bg-gradient-to-br from-main-600 to-main-800 opacity-90"></div>
                          </div>
                        )}
                      </div>

                      {/* Sadece Action Buttons - Bottom Right */}
                      <div className="position-absolute inset-block-end-16 inset-inline-end-16 d-flex gap-8">
                        <button
                          className={`w-40 h-40 rounded-12 d-flex align-items-center justify-content-center transition-3 backdrop-blur ${
                            institution.isFavorite
                              ? "bg-danger-600 text-white"
                              : "bg-white bg-opacity-90 text-neutral-700 hover-bg-danger-50 hover-text-danger-600"
                          }`}
                        >
                          <i
                            className={`ph ${
                              institution.isFavorite ? "ph-fill" : ""
                            } ph-heart`}
                          ></i>
                        </button>
                        {institution.isSubscribed && (
                          <button className="w-40 h-40 rounded-12 bg-success-600 text-white d-flex align-items-center justify-content-center backdrop-blur">
                            <i className="ph ph-check"></i>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Kurum Kimlik Kartı */}
                    <div className="bg-white border border-neutral-200 rounded-16 p-24 box-shadow-sm">
                      {/* Logo ve Başlık */}
                      <div className="d-flex align-items-start gap-16 mb-20">
                        <div className="w-64 h-64 rounded-16 overflow-hidden flex-shrink-0 bg-neutral-50 border border-neutral-200">
                          {institution.logoUrl ? (
                            <Image
                              src={institution.logoUrl}
                              alt={`${institution.name ?? "Institution"} Logo`}
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-100 h-100 bg-main-50 d-flex align-items-center justify-content-center">
                              <i
                                className="ph ph-buildings text-main-400"
                                style={{ fontSize: "28px" }}
                              ></i>
                            </div>
                          )}
                        </div>
                        <div className="flex-grow-1">
                          <h3 className="h5 mb-8 text-heading fw-bold line-clamp-2">
                            {institution.name ?? "İsim Yok"}
                          </h3>
                          {institution.campusName && (
                            <p className="text-sm text-neutral-600 mb-0 d-flex align-items-center gap-4">
                              <i className="ph ph-map-pin text-xs"></i>
                              {institution.campusName}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Bilgi Kartcıkları */}
                      <div className="row g-12">
                        {/* Lokasyon */}
                        <div className="col-12">
                          <div className="d-flex align-items-center gap-12 p-12 bg-neutral-25 rounded-12">
                            <div className="w-36 h-36 rounded-8 bg-main-100 d-flex align-items-center justify-content-center flex-shrink-0">
                              <i className="ph ph-map-pin text-main-600"></i>
                            </div>
                            <div className="flex-grow-1">
                              <p className="text-sm fw-medium text-neutral-800 mb-2">
                                {[institution.district, institution.city]
                                  .filter(Boolean)
                                  .join(", ")}
                              </p>
                              {institution.distanceKm != null && (
                                <p className="text-xs text-neutral-500 mb-0">
                                  <i className="ph ph-navigation-arrow me-4"></i>
                                  {institution.distanceKm} km uzaklıkta
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Puan ve Fiyat */}
                        <div className="col-6">
                          <div className="text-center p-16 bg-warning-25 rounded-12">
                            <div className="d-flex align-items-center justify-content-center gap-4 mb-4">
                              <i className="ph-fill ph-star text-warning-600"></i>
                              <span className="fw-bold text-warning-800">
                                {institution.ratingAverage ?? "-"}
                              </span>
                            </div>
                            <p className="text-xs text-warning-700 mb-0">
                              {institution.ratingCount ?? 0} değerlendirme
                            </p>
                          </div>
                        </div>

                        <div className="col-6">
                          {institution.formattedPrice && (
                            <div className="text-center p-16 bg-main-25 rounded-12">
                              <div className="fw-bold text-main-800 mb-4">
                                {institution.formattedPrice}
                              </div>
                              <p className="text-xs text-main-600 mb-0">
                                aylık ücret
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sağ Kolon - Detay Bilgiler */}
                <div className="col-7">
                  <div className="ps-24 d-flex flex-column h-100">
                    {/* Kurum Tipleri ve Kampanyalar */}
                    <div className="mb-24">
                      <div className="d-flex flex-wrap gap-8">
                        {/* Institution Type Badge */}
                        {(institution.institutionTypeName ||
                          institution.institutionTypeIcon) && (
                          <div
                            className="d-flex align-items-center gap-8 px-16 py-8 rounded-12 border"
                            style={{
                              backgroundColor: institution.institutionTypeColor
                                ? `${institution.institutionTypeColor}15`
                                : "#f8f9fa",
                              borderColor:
                                institution.institutionTypeColor ?? "#dee2e6",
                            }}
                          >
                            {institution.institutionTypeIcon && (
                              <i
                                className={`ph ${institution.institutionTypeIcon}`}
                                style={{
                                  color:
                                    institution.institutionTypeColor ??
                                    "#6c757d",
                                }}
                              ></i>
                            )}
                            <span
                              className="text-sm fw-medium"
                              style={{
                                color:
                                  institution.institutionTypeColor ?? "#6c757d",
                              }}
                            >
                              {institution.institutionTypeName}
                            </span>
                          </div>
                        )}

                        {/* Campaign Badge */}
                        {hasActiveCampaign && (
                          <div
                            className="d-flex align-items-center gap-8 px-16 py-8 rounded-12 border"
                            style={{
                              backgroundColor: institution.activeCampaigns![0]
                                .badgeColor
                                ? `${
                                    institution.activeCampaigns![0].badgeColor
                                  }15`
                                : "#fff5f5",
                              borderColor:
                                institution.activeCampaigns![0].badgeColor ??
                                "#f56565",
                            }}
                          >
                            <i
                              className="ph ph-megaphone"
                              style={{
                                color:
                                  institution.activeCampaigns![0].badgeColor ??
                                  "#f56565",
                              }}
                            ></i>
                            <span
                              className="text-sm fw-medium"
                              style={{
                                color:
                                  institution.activeCampaigns![0].badgeColor ??
                                  "#f56565",
                              }}
                            >
                              {institution.activeCampaigns![0].badgeText}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Açıklama Bölümü */}
                    {institution.description && (
                      <div className="mb-32">
                        <div className="d-flex align-items-center gap-12 mb-16">
                          <div className="w-8 h-8 rounded-circle bg-main-600"></div>
                          <h4 className="h6 mb-0 text-heading fw-bold">
                            Kurumumuz Hakkında
                          </h4>
                        </div>
                        <div className="ps-20">
                          <p className="text-neutral-700 line-height-relaxed mb-0">
                            {institution.description}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Yaş Aralığı */}
                    {institution.ageRange && (
                      <div className="mb-32">
                        <div className="item-hover bg-info-25 border border-info-100 rounded-16 p-20 transition-3">
                          <div className="d-flex align-items-center gap-16">
                            <div className="w-48 h-48 rounded-12 bg-info-600 d-flex align-items-center justify-content-center">
                              <i
                                className="ph ph-users text-white"
                                style={{ fontSize: "20px" }}
                              ></i>
                            </div>
                            <div>
                              <h6 className="fw-semibold text-info-800 mb-4">
                                Hedef Yaş Grubu
                              </h6>
                              <p className="text-lg fw-medium text-neutral-800 mb-0">
                                {institution.ageRange}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Öne Çıkan Özellikler */}
                    {visibleHighlights.length > 0 && (
                      <div className="mb-32">
                        <div className="d-flex align-items-center justify-content-between mb-16">
                          <div className="d-flex align-items-center gap-12">
                            <div className="w-8 h-8 rounded-circle bg-success-600"></div>
                            <h4 className="h6 mb-0 text-heading fw-bold">
                              Öne Çıkan Özellikler
                            </h4>
                          </div>
                          {visibleHighlights.length > 4 && (
                            <button
                              className="btn btn-sm btn-outline-success rounded-pill px-12 py-4"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowAllHighlights(!showAllHighlights);
                              }}
                            >
                              <span className="text-xs">
                                {showAllHighlights
                                  ? "Daha az"
                                  : `+${visibleHighlights.length - 4} daha`}
                              </span>
                            </button>
                          )}
                        </div>
                        <div className="ps-20">
                          <div className="d-flex flex-wrap gap-8">
                            {(showAllHighlights
                              ? visibleHighlights
                              : visibleHighlights.slice(0, 4)
                            ).map((highlight, index) => (
                              <span
                                key={index}
                                className="px-12 py-6 bg-success-50 text-success-700 rounded-pill text-xs fw-medium d-flex align-items-center gap-4 border border-success-200"
                              >
                                <i className="ph ph-check-circle text-success-600"></i>
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Detay Bilgiler */}
                    {visibleCardProperties.length > 0 && (
                      <div className="mb-32">
                        <div className="d-flex align-items-center justify-content-between mb-16">
                          <div className="d-flex align-items-center gap-12">
                            <div className="w-8 h-8 rounded-circle bg-main-600"></div>
                            <h4 className="h6 mb-0 text-heading fw-bold">
                              Teknik Detaylar
                            </h4>
                          </div>
                          {visibleCardProperties.length > 3 && (
                            <button
                              className="btn btn-sm btn-outline-main rounded-pill px-12 py-4"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowAllProperties(!showAllProperties);
                              }}
                            >
                              <span className="text-xs">
                                {showAllProperties
                                  ? "Daha az"
                                  : `+${visibleCardProperties.length - 3} daha`}
                              </span>
                            </button>
                          )}
                        </div>
                        <div className="ps-20">
                          <div className="row g-8">
                            {(showAllProperties
                              ? visibleCardProperties
                              : visibleCardProperties.slice(0, 3)
                            ).map((property) => (
                              <div key={property.id} className="col-6">
                                <div className="p-12 bg-main-25 border border-main-100 rounded-12">
                                  <p className="text-xs text-main-600 fw-medium mb-4">
                                    {property.propertyDisplayName}
                                  </p>
                                  <p className="text-sm text-main-800 fw-semibold mb-0">
                                    {property.formattedValue}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Spacer to push button to bottom */}
                    <div className="flex-grow-1"></div>

                    {/* Action Button - Bottom */}
                    <Button rightIcon="ph-eye" className="mt-12">
                      Kuruma Git
                    </Button>
                  </div>
                </div>
              </div>

              {/* Alt Çubuk - Collapse */}
              {/* Expand Trigger - İçerik alanında */}
              <div className="mt-24 pt-24 border-top border-neutral-200">
                <Button
                  variant="outline"
                  onClick={onCardClick}
                  size="sm"
                  rightIcon="ph-caret-up"
                  className="px-20 d-flex align-items-center gap-8 mx-auto"
                >
                  Daha Az Göster
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

InstitutionCard.displayName = "InstitutionCard";

export default InstitutionCard;
