import { memo } from "react";
import Image from "next/image";
import { SchoolSearchResultDto } from "@/types/institution/InstitutionSearch.types";

interface InstitutionCardProps {
  institution: SchoolSearchResultDto;
  className?: string;
  isExpanded?: boolean;
  onCardClick?: () => void;
  animationDelay?: string;
}

const ImagePlaceholder = ({ children }: { children: React.ReactNode }) => (
  <div className="w-100 h-100 bg-neutral-100 d-flex align-items-center justify-content-center">
    <span className="text-neutral-400">{children}</span>
  </div>
);

const Badge = ({
  text,
  color,
  icon,
  position = "left",
}: {
  text: string;
  color?: string;
  icon?: string;
  position?: "left" | "right";
}) => (
  <div
    className={`position-absolute inset-block-start-16 ${
      position === "left" ? "inset-inline-start-16" : "inset-inline-end-16"
    }`}
  >
    <span
      className="px-12 py-6 rounded-8 text-white text-sm fw-medium d-flex align-items-center gap-8"
      style={{ backgroundColor: color ?? "#888" }}
    >
      {icon && <i className={`ph ${icon}`}></i>}
      {text}
    </span>
  </div>
);

const ActionButton = ({
  icon,
  isActive = false,
  variant = "default",
}: {
  icon: string;
  isActive?: boolean;
  variant?: "default" | "success" | "danger";
}) => {
  const getButtonClasses = () => {
    const baseClasses =
      "w-36 h-36 rounded-8 d-flex justify-content-center align-items-center box-shadow-sm transition-2";

    if (variant === "success") {
      return `${baseClasses} bg-success-600 text-white`;
    }

    if (variant === "danger" && isActive) {
      return `${baseClasses} bg-danger-600 text-white`;
    }

    return `${baseClasses} bg-white text-neutral-600 hover-bg-danger-50 hover-text-danger-600`;
  };

  return (
    <button className={getButtonClasses()}>
      <i
        className={`ph ${
          isActive && variant === "danger" ? "ph-fill" : ""
        } ph-${icon}`}
      ></i>
    </button>
  );
};

const PropertyTag = ({
  label,
  value,
  variant = "primary",
}: {
  label: string;
  value: string;
  variant?: "primary" | "success";
}) => {
  const colorClasses =
    variant === "success"
      ? "bg-success-25 text-success-700"
      : "bg-main-25 text-main-700";

  return (
    <span className={`px-8 py-4 ${colorClasses} rounded-6 text-xs`}>
      {label}: {value}
    </span>
  );
};

export const InstitutionCard = memo(
  ({
    institution,
    className = "",
    isExpanded = false,
    onCardClick,
    animationDelay = "0ms",
  }: InstitutionCardProps) => {
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
          className="scale-hover-item bg-white rounded-16 p-16 h-100 box-shadow-md cursor-pointer card-expand-transition"
          onClick={onCardClick}
          style={{ animationDelay, transitionDelay: animationDelay }}
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
                <ImagePlaceholder>No Image</ImagePlaceholder>
              )}
            </div>

            {/* Institution Type Badge */}
            {(institution.institutionTypeName ||
              institution.institutionTypeIcon) && (
              <Badge
                text={institution.institutionTypeName || ""}
                color={institution.institutionTypeColor}
                icon={institution.institutionTypeIcon}
                position="left"
              />
            )}

            {/* Campaign Badge */}
            {hasActiveCampaign && (
              <Badge
                text={institution.activeCampaigns![0].badgeText!}
                color={institution.activeCampaigns![0].badgeColor}
                position="right"
              />
            )}

            {/* Action Buttons */}
            <div className="position-absolute inset-block-end-16 inset-inline-end-16 d-flex gap-8">
              <ActionButton
                icon="heart"
                isActive={institution.isFavorite}
                variant="danger"
              />
              {institution.isSubscribed && (
                <ActionButton icon="check" variant="success" />
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
                  <ImagePlaceholder>No Logo</ImagePlaceholder>
                )}
              </div>
              <div className="flex-grow-1">
                <h5 className="mb-4 text-line-2">
                  {institution.name ?? "İsim Yok"}
                </h5>
                {institution.campusName && (
                  <p className="text-sm text-neutral-600 mb-0">
                    {institution.campusName}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            {institution.description && (
              <p className="text-sm text-neutral-700 mb-16 text-line-2">
                {institution.description}
              </p>
            )}

            {/* Location and Distance */}
            <div className="d-flex align-items-center gap-8 mb-16">
              <i className="ph ph-map-pin text-neutral-500"></i>
              <span className="text-sm text-neutral-600">
                {[institution.district, institution.city]
                  .filter(Boolean)
                  .join(", ")}
              </span>
              {institution.distanceKm != null && (
                <span className="text-sm text-neutral-500">
                  • {institution.distanceKm} km
                </span>
              )}
            </div>

            {/* Age Range */}
            {institution.ageRange && (
              <div className="d-flex align-items-center gap-8 mb-16">
                <i className="ph ph-users text-neutral-500"></i>
                <span className="text-sm text-neutral-600">
                  {institution.ageRange}
                </span>
              </div>
            )}

            {/* Card Properties */}
            {visibleCardProperties.length > 0 && (
              <div className="mb-16">
                <div className="d-flex flex-wrap gap-8">
                  {visibleCardProperties.slice(0, 2).map((property) => (
                    <PropertyTag
                      key={property.id}
                      label={property.propertyDisplayName || ""}
                      value={property.formattedValue || ""}
                      variant="primary"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            {visibleHighlights.length > 0 && (
              <div className="mb-16">
                <div className="d-flex flex-wrap gap-6">
                  {visibleHighlights.slice(0, 3).map((highlight, index) => (
                    <PropertyTag
                      key={index}
                      label=""
                      value={highlight}
                      variant="success"
                    />
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
                    {institution.ratingAverage ?? "-"}
                  </span>
                  <span className="text-xs text-neutral-500">
                    ({institution.ratingCount ?? 0})
                  </span>
                </div>
              </div>
              {institution.formattedPrice && (
                <div className="text-end">
                  <div className="text-lg fw-semibold text-main-600">
                    {institution.formattedPrice}
                  </div>
                  <div className="text-xs text-neutral-500">aylık</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

InstitutionCard.displayName = "InstitutionCard";

export default InstitutionCard;
