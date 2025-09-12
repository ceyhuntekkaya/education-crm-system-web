import { useInstitutionCardContext } from "../context";
import { formatLocation } from "../utils";

export const CompactLocationInfo = () => {
  const { institution } = useInstitutionCardContext();

  return (
    <div className="d-flex align-items-center gap-8 mb-12 p-8 bg-neutral-25 rounded-8">
      <i className="ph ph-map-pin text-neutral-500"></i>
      <span className="text-sm text-neutral-700 fw-medium">
        {formatLocation(institution)}
      </span>
      {institution.distanceKm != null && (
        <span className="text-xs text-neutral-500 ms-auto">
          {institution.distanceKm} km
        </span>
      )}
    </div>
  );
};
