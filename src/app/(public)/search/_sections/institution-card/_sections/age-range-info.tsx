import { useInstitutionCardContext } from "../_context";

export const AgeRangeInfo = () => {
  const { institution } = useInstitutionCardContext();

  if (!institution.ageRange) {
    return null;
  }

  return (
    <div className="mb-32">
      <div className="item-hover bg-info-25 border border-info-100 rounded-16 p-20 transition-3">
        <div className="d-flex align-items-center gap-16">
          <div className="w-48 h-48 rounded-12 bg-info-600 d-flex align-items-center justify-content-center">
            <i
              className="ph ph-users text-white"
              style={{ fontSize: "20px" }}
            ></i>
          </div>
          <div>
            <h6 className="fw-semibold text-info-800 mb-4">Hedef Yaş Grubu</h6>
            <p className="text-lg fw-medium text-neutral-800 mb-0">
              {institution.ageRange}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
