import { useInstitutionCardContext } from "../context";

export const QuickHighlightsPills = () => {
  const { visibleHighlights } = useInstitutionCardContext();

  if (visibleHighlights.length === 0) {
    return null;
  }

  return (
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
  );
};
