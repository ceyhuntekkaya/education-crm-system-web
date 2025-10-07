import { memo, forwardRef } from "react";
import { InstitutionCardProps } from "./types";
import { CompactSection, ExpandedSection } from "./sections";
import { InstitutionCardProvider } from "./context";

export const InstitutionCard = memo(
  forwardRef<HTMLDivElement, InstitutionCardProps>(
    (
      {
        institution,
        className = "",
        isExpanded = false,
        onCardClick,
        animationDelay = "0ms",
      },
      ref
    ) => {
      return (
        <InstitutionCardProvider
          institution={institution}
          onCardClick={onCardClick}
        >
          <div
            className={className}
            ref={ref}
            style={{ marginBottom: isExpanded ? "16px" : undefined }}
          >
            <div
              className={`bg-white rounded-16 p-16 h-100 cursor-pointer card-expand-transition position-relative overflow-hidden d-flex flex-column ${
                institution.isFavorite
                  ? "border-2 border-danger-300 shadow-lg shadow-danger-100"
                  : "box-shadow-md"
              }`}
              style={{ animationDelay, transitionDelay: animationDelay }}
            >
              {/* Compact Layout */}
              {!isExpanded && <CompactSection />}

              {/* Expanded Layout */}
              {isExpanded && <ExpandedSection />}
            </div>
          </div>
        </InstitutionCardProvider>
      );
    }
  )
);

InstitutionCard.displayName = "InstitutionCard";

export default InstitutionCard;
