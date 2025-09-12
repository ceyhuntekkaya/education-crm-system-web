import { useInstitutionCardContext } from "../_context";

export const StatsRow = () => {
  const { institution } = useInstitutionCardContext();

  return (
    <div className="row g-8 mb-16">
      <div className="col-6">
        <div className="text-center p-8 bg-warning-25 rounded-8">
          <div className="d-flex align-items-center justify-content-center gap-4 mb-2">
            <i className="ph-fill ph-star text-warning-600 text-sm"></i>
            <span className="text-sm fw-bold text-warning-800">
              {institution.ratingAverage ?? "-"}
            </span>
          </div>
          <p className="text-xs text-warning-700 mb-0">
            ({institution.ratingCount ?? 0})
          </p>
        </div>
      </div>
      <div className="col-6">
        {institution.formattedPrice && (
          <div className="text-center p-8 bg-main-25 rounded-8">
            <div className="text-sm fw-bold text-main-800 mb-2">
              {institution.formattedPrice}
            </div>
            <p className="text-xs text-main-600 mb-0">aylık</p>
          </div>
        )}
      </div>
    </div>
  );
};
