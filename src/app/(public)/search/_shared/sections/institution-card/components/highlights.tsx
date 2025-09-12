import { useInstitutionCardContext } from "../context";

export const Highlights = () => {
  const { visibleHighlights, showAllHighlights, toggleAllHighlights } =
    useInstitutionCardContext();

  const maxVisible = 4;
  const highlights = visibleHighlights;
  const showAll = showAllHighlights;
  const onToggle = toggleAllHighlights;

  if (highlights.length === 0) return null;

  const visibleHighlightsFiltered = showAll
    ? highlights
    : highlights.slice(0, maxVisible);
  const hasMore = highlights.length > maxVisible;

  return (
    <div className="mb-24">
      <div className="d-flex align-items-center justify-content-between mb-16">
        <div className="d-flex align-items-center gap-12">
          <div className="w-8 h-8 rounded-circle bg-success-600"></div>
          <h4 className="h6 mb-0 text-heading fw-bold">Öne Çıkan Özellikler</h4>
        </div>
        {hasMore && onToggle && (
          <button
            className="btn btn-sm btn-outline-success rounded-pill px-12 py-4"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            <span className="text-xs">
              {showAll ? "Daha az" : `+${highlights.length - maxVisible} daha`}
            </span>
          </button>
        )}
      </div>
      <div className="ps-20">
        <div className="d-flex flex-wrap gap-8">
          {visibleHighlightsFiltered.map((highlight, index) => (
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
  );
};
