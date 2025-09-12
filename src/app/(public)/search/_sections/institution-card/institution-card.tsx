import { memo, forwardRef } from "react";
import { InstitutionCardProps } from "./_types";
import { CompactLayout, ExpandedLayout } from "./_sections";
import { InstitutionCardProvider } from "./_context";

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
          <div className={className} ref={ref}>
            <div
              className="bg-white rounded-16 p-16 h-100 box-shadow-md cursor-pointer card-expand-transition position-relative overflow-hidden d-flex flex-column"
              style={{ animationDelay, transitionDelay: animationDelay }}
            >
              {/* Compact Layout */}
              {!isExpanded && <CompactLayout />}

              {/* Expanded Layout */}
              {isExpanded && <ExpandedLayout />}
            </div>
          </div>
        </InstitutionCardProvider>
      );
    }
  )
);

InstitutionCard.displayName = "InstitutionCard";

export default InstitutionCard;
