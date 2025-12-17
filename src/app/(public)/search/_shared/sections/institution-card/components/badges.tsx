import { formatTitle } from "@/utils";
import { useInstitutionCardContext } from "../context";

interface BadgesProps {
  variant?: "compact" | "expanded";
}

export const Badges = ({ variant = "compact" }: BadgesProps) => {
  const {
    institution,
    hasActiveCampaign,
    institutionTypeStyle,
    campaignStyle,
  } = useInstitutionCardContext();

  const isCompact = variant === "compact";

  return (
    <div className={`d-flex flex-wrap ${isCompact ? "gap-6 mb-16" : "gap-8"}`}>
      {/* Institution Type Badge */}
      {(institution.institutionTypeName || institution.institutionTypeIcon) && (
        <div
          className={`d-flex align-items-center ${
            isCompact
              ? "gap-4 px-8 py-4 rounded-pill text-xs fw-medium border"
              : "gap-8 px-16 py-8 rounded-12 border text-sm fw-medium"
          }`}
          style={institutionTypeStyle}
        >
          {institution.institutionTypeIcon && (
            <i
              className={`ph ${institution.institutionTypeIcon}`}
              style={{ color: institutionTypeStyle.color }}
            ></i>
          )}
          <span
            className={isCompact ? "text-xs fw-medium" : "text-sm fw-medium"}
            style={{ color: institutionTypeStyle.color }}
          >
            {formatTitle(institution.institutionTypeName || "")}
          </span>
        </div>
      )}

      {/* Campaign Badge */}
      {hasActiveCampaign && (
        <div
          className={`d-flex align-items-center ${
            isCompact
              ? "gap-4 px-8 py-4 rounded-pill text-xs fw-medium border"
              : "gap-8 px-16 py-8 rounded-12 border text-sm fw-medium"
          }`}
          style={campaignStyle}
        >
          <i
            className="ph ph-megaphone"
            style={{ color: campaignStyle.color }}
          ></i>
          <span
            className={isCompact ? "text-xs fw-medium" : "text-sm fw-medium"}
            style={{ color: campaignStyle.color }}
          >
            {institution.activeCampaigns![0].badgeText}
          </span>
        </div>
      )}
    </div>
  );
};
