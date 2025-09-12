import { useInstitutionCardContext } from "../context";
import { formatLocation } from "../utils";

export const LocationInfo = () => {
  const { institution } = useInstitutionCardContext();

  return (
    <div className="col-12">
      <div className="d-flex align-items-center gap-12 p-12 bg-neutral-25 rounded-12">
        <div className="w-36 h-36 rounded-8 bg-main-100 d-flex align-items-center justify-content-center flex-shrink-0">
          <i className="ph ph-map-pin text-main-600"></i>
        </div>
        <div className="flex-grow-1">
          <p className="text-sm fw-medium text-neutral-800 mb-2">
            {formatLocation(institution)}
          </p>
          {institution.distanceKm != null && (
            <p className="text-xs text-neutral-500 mb-0">
              <i className="ph ph-navigation-arrow me-4"></i>
              {institution.distanceKm} km uzaklıkta
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
