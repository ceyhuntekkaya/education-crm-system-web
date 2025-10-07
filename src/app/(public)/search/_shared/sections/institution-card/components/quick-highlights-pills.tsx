import { useInstitutionCardContext } from "../context";

export const QuickHighlightsPills = () => {
  const { visibleHighlights } = useInstitutionCardContext();

  if (visibleHighlights.length === 0) {
    return null;
  }

  const maxVisible = 2;

  return (
    <div className="mb-12">
      <div className="d-flex flex-wrap gap-4">
        {visibleHighlights.slice(0, maxVisible).map((highlight, index) => (
          <span
            key={index}
            className="px-8 py-2 bg-success-50 text-success-700 rounded-pill text-xs fw-medium d-flex align-items-center gap-4 border border-success-200"
            style={{
              fontSize: "9px",
              lineHeight: "1.2",
              minHeight: "20px",
            }}
          >
            <i
              className="ph ph-check-circle text-success-600 pt-1"
              style={{ fontSize: "7px" }}
            ></i>
            {highlight}
          </span>
        ))}
      </div>
    </div>
  );
};
