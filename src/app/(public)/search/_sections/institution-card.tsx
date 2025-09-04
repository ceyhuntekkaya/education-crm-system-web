import Image from "next/image";
import { SchoolSearchResultDto } from "@/types/institution/InstitutionSearch.types";

interface InstitutionCardProps {
  institution: SchoolSearchResultDto;
  className?: string;
  isExpanded?: boolean;
  onCardClick?: () => void;
}

export const InstitutionCard = ({
  institution,
  className = "",
  isExpanded = false,
  onCardClick,
}: InstitutionCardProps) => (
  <div className={className}>
    <div
      className={`scale-hover-item bg-white rounded-16 p-16 h-100 box-shadow-md cursor-pointer `}
      onClick={onCardClick}
    >
      {/* Cover Image */}
      <div className="position-relative rounded-12 overflow-hidden mb-16 h-166-px">
        <div className="w-100 h-100 d-block">
          {institution.coverImageUrl ? (
            <Image
              src={institution.coverImageUrl}
              alt={institution.name ?? "Institution Cover"}
              fill
              className="scale-hover-item__img object-cover transition-2"
            />
          ) : (
            <div className="w-100 h-100 bg-neutral-100 d-flex align-items-center justify-content-center">
              <span className="text-neutral-400">No Image</span>
            </div>
          )}
        </div>

        {/* Institution Type Badge */}
        {(institution.institutionTypeName ||
          institution.institutionTypeIcon) && (
          <div className="position-absolute inset-block-start-16 inset-inline-start-16">
            <span
              className="px-12 py-6 rounded-8 text-white text-sm fw-medium d-flex align-items-center gap-8"
              style={{
                backgroundColor: institution.institutionTypeColor ?? "#888",
              }}
            >
              {institution.institutionTypeIcon && (
                <i className={`ph ${institution.institutionTypeIcon}`}></i>
              )}
              {institution.institutionTypeName}
            </span>
          </div>
        )}

        {/* Campaign Badge */}
        {institution.hasActiveCampaigns &&
          Array.isArray(institution.activeCampaigns) &&
          institution.activeCampaigns.length > 0 &&
          institution.activeCampaigns[0]?.badgeText && (
            <div className="position-absolute inset-block-start-16 inset-inline-end-16">
              <span
                className="px-12 py-6 rounded-8 text-white text-sm fw-semibold"
                style={{
                  backgroundColor:
                    institution.activeCampaigns[0].badgeColor ?? "#888",
                }}
              >
                {institution.activeCampaigns[0].badgeText}
              </span>
            </div>
          )}

        {/* Action Buttons */}
        <div className="position-absolute inset-block-end-16 inset-inline-end-16 d-flex gap-8">
          <button
            className={`w-36 h-36 rounded-8 d-flex justify-content-center align-items-center box-shadow-sm transition-2 ${
              institution.isFavorite
                ? "bg-danger-600 text-white"
                : "bg-white text-neutral-600 hover-bg-danger-50 hover-text-danger-600"
            }`}
          >
            <i
              className={`ph ${
                institution.isFavorite ? "ph-fill" : ""
              } ph-heart`}
            ></i>
          </button>
          {institution.isSubscribed && (
            <button className="w-36 h-36 rounded-8 d-flex justify-content-center align-items-center bg-success-600 text-white box-shadow-sm">
              <i className="ph ph-check"></i>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={`px-8 ${isExpanded ? "content-fade-in" : ""}`}>
        {/* Logo and Institution Name */}
        <div className="d-flex align-items-center gap-12 mb-12">
          <div className="w-40 h-40 rounded-8 overflow-hidden flex-shrink-0 bg-neutral-50">
            {institution.logoUrl ? (
              <Image
                src={institution.logoUrl}
                alt={`${institution.name ?? "Institution"} Logo`}
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <div className="w-100 h-100 bg-neutral-100 d-flex align-items-center justify-content-center">
                <span className="text-neutral-400">No Logo</span>
              </div>
            )}
          </div>
          <div className="flex-grow-1">
            <h5 className="mb-4 text-line-2">
              {institution.name ?? "İsim Yok"}
            </h5>
            <p className="text-sm text-neutral-600 mb-0">
              {institution.campusName ?? ""}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-700 mb-16 text-line-2">
          {institution.description ?? ""}
        </p>

        {/* Location and Distance */}
        <div className="d-flex align-items-center gap-8 mb-16">
          <i className="ph ph-map-pin text-neutral-500"></i>
          <span className="text-sm text-neutral-600">
            {institution.district ?? ""}, {institution.city ?? ""}
          </span>
          <span className="text-sm text-neutral-500">
            • {institution.distanceKm != null ? institution.distanceKm : "-"} km
          </span>
        </div>

        {/* Age Range */}
        <div className="d-flex align-items-center gap-8 mb-16">
          <i className="ph ph-users text-neutral-500"></i>
          <span className="text-sm text-neutral-600">
            {institution.ageRange ?? ""}
          </span>
        </div>

        {/* Card Properties */}
        {Array.isArray(institution.cardProperties) &&
          institution.cardProperties.filter((prop) => prop.showInCard).length >
            0 && (
            <div className="mb-16">
              <div className="d-flex flex-wrap gap-8">
                {institution.cardProperties
                  .filter((prop) => prop.showInCard)
                  .slice(0, 2)
                  .map((property) => (
                    <span
                      key={property.id}
                      className="px-8 py-4 bg-main-25 text-main-700 rounded-6 text-xs"
                    >
                      {property.propertyDisplayName}: {property.formattedValue}
                    </span>
                  ))}
              </div>
            </div>
          )}

        {/* Highlights */}
        {Array.isArray(institution.highlights) &&
          institution.highlights.length > 0 && (
            <div className="mb-16">
              <div className="d-flex flex-wrap gap-6">
                {institution.highlights.slice(0, 3).map((highlight, index) => (
                  <span
                    key={index}
                    className="px-8 py-4 bg-success-25 text-success-700 rounded-6 text-xs"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Rating and Price */}
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-8">
            <div className="d-flex align-items-center gap-4">
              <span className="text-lg fw-medium text-warning-600 d-flex">
                <i className="ph-fill ph-star"></i>
              </span>
              <span className="text-sm text-neutral-700">
                {institution.ratingAverage != null
                  ? institution.ratingAverage
                  : "-"}
              </span>
              <span className="text-xs text-neutral-500">
                ({institution.ratingCount != null ? institution.ratingCount : 0}
                )
              </span>
            </div>
          </div>
          <div className="text-end">
            <div className="text-lg fw-semibold text-main-600">
              {institution.formattedPrice ?? ""}
            </div>
            <div className="text-xs text-neutral-500">aylık</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default InstitutionCard;
