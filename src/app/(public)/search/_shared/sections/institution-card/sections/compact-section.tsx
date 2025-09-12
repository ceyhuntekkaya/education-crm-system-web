import {
  HeroImage,
  InstitutionHeader,
  Badges,
  StatsRow,
  CompactLocationInfo,
  QuickHighlightsPills,
  ExpandTrigger,
} from "../components";

export const CompactSection = () => {
  return (
    <div className="d-flex flex-column h-100">
      {/* Hero Cover Image */}
      <div className="mb-20">
        <HeroImage height="180px" showButtons={true} />
      </div>

      {/* Content Card */}
      <div className="px-8 d-flex flex-column flex-grow-1">
        {/* Institution Type ve Campaign Badges */}
        <Badges />

        {/* Header - Logo and Title */}
        <InstitutionHeader logoSize={48} />

        {/* Location Info */}
        <CompactLocationInfo />

        {/* Stats Row */}
        <StatsRow />

        {/* Quick Highlights Pills */}
        <QuickHighlightsPills />
      </div>

      {/* Expand Trigger */}
      <ExpandTrigger />
    </div>
  );
};
